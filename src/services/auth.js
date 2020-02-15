import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Alert } from 'react-native';

import { WEB_CLIENT_GOOGLE_AUTH, WEAK_PASSWORD } from '../utils/Constants';

import store from '../redux/configureStore';

import { auth, FacebookAuthProvider, GoogleAuthProvider } from './firebase';
import { translate } from './i18n';
import { createUserProfile, userRef } from './database';
import { signOut } from '../redux/actions/UserActions';

/**
 * Create an account or log a user if already have account with facebook
 */
export const loginWithFacebook = async () => {
    try {
        const facebookLoginResult = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (facebookLoginResult.isCancelled) {
            console.log('Facebook authentication cancelled');
        } else {
            const accessToken = (await AccessToken.getCurrentAccessToken()).accessToken;
            const credential = FacebookAuthProvider.credential(accessToken);
            const loginWithCredentialResult = await auth.signInWithCredential(credential);
            if (loginWithCredentialResult.additionalUserInfo.isNewUser) {
                createUserProfile(loginWithCredentialResult.user.uid, loginWithCredentialResult.user.email, loginWithCredentialResult.user.photoURL);
            } else {
                console.log('Old user', loginWithCredentialResult.user.uid);
            }

            return loginWithCredentialResult;
        }
    } catch (error) {
        console.error('[Login with facebook error]', error);
    }
}

/**
 * Create an account or log a user if already have account with google
 * (always use after of setupGoogleSignin())
 */
export const loginWithGoogle = async () => {
    try {
        const googleLoginResult = await GoogleSignin.signIn();
        const credential = GoogleAuthProvider.credential(googleLoginResult.idToken, googleLoginResult.accessToken);
        const loginWithCredentialResult = await auth.signInWithCredential(credential);
        if (loginWithCredentialResult.additionalUserInfo.isNewUser) {
            createUserProfile(loginWithCredentialResult.user.uid, loginWithCredentialResult.user.email, loginWithCredentialResult.user.photoURL);
        } else {
            console.log('Old user', loginWithCredentialResult.user.uid);
        }

        return loginWithCredentialResult;
    } catch (error) {
        console.error('[Login with google error]', error);
    }
}

/**
 * Initialize the google sign in
 */
export const setupGoogleSignin = () => {
    try {
      GoogleSignin.configure({
        webClientId: WEB_CLIENT_GOOGLE_AUTH,
        offlineAccess: false
      });
    }
    catch (err) {
      console.error('[Google signin error]', err.code, err.message);
    }
}

/**
 * Create an account with email and password
 * @param {string} email User selected email
 * @param {string} password User selected password
 */
export const signInWithEmail = async (email, password) => {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        createUserProfile(result.user.uid, result.user.email, result.user.photoURL);

        return result;
    } catch (error) {
        let message = translate('auth.signInWithEmail.defaultErrorMessage');;
        switch (error.code) {
            case 'auth/invalid-email':
                message = translate('auth.signInWithEmail.invalidEmail');
                break;
            case 'auth/email-already-in-use':
                message = translate('auth.signInWithEmail.emailUsed');
                break;
            case 'auth/weak-password':
                message = translate('auth.signInWithEmail.weakPassword');
                break;
            default:
                break;
        }
        Alert.alert(
            translate('auth.signInWithEmail.errorMessage.title'),
            message,
            [
                { text: translate('auth.signInWithEmail.errorMessage.acceptButton') }
            ]
        );
        return Promise.reject(error);
    }
}

/**
 * Log a user with email and password
 * @param {string} email User email
 * @param {string} password User password
 */
export const logInWithEmail = async (email, password, showError = true) => {
    try {
        return await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        if (showError) {
            Alert.alert(
                translate('auth.logInWithEmail.errorMessage.title'),
                translate('auth.logInWithEmail.errorMessage.description'),
                [
                    { text: translate('auth.logInWithEmail.errorMessage.acceptButton') }
                ]
            );
        }

        return error;
    }
}

/**
 * Update the users password, before that make a login to avoid auth/requires-recent-login
 * requisite, thats why we need the email and current password of the user
 * @param {string} email email of the user
 * @param {string} currentPassword Current valid password of the user
 * @param {string} newPassword New password that the user wants to set
 */
export const updateUserPassword = async (email, currentPassword, newPassword) => {
    const user = await logInWithEmail(email, currentPassword, false);
    if (user.user) {
        try {
            await auth.currentUser.updatePassword(newPassword);
        } catch (error) {
            if (error.code === WEAK_PASSWORD) {
                Alert.alert(
                    translate('auth.updateUserPassword.errorMessage.weakPassword.title'),
                    translate('auth.updateUserPassword.errorMessage.weakPassword.description'),
                    [
                        { text: translate('auth.updateUserPassword.errorMessage.weakPassword.acceptButton') }
                    ]
                );
            }
        }
    } else {
        Alert.alert(
            translate('auth.updateUserPassword.errorMessage.wrongPassword.title'),
            translate('auth.updateUserPassword.errorMessage.wrongPassword.description'),
            [
                { text: translate('auth.updateUserPassword.errorMessage.wrongPassword.acceptButton') }
            ]
        );
    }
}

/**
 * Close the session of the user and clean the redux state, also remove the listener of the user profile
 * on the database
 */
export const closeSession = async () => {
    try {
        userRef.child(auth.currentUser.uid).off('value');
        signOut()(store.dispatch);
        return await auth.signOut();
    } catch (error) {
        console.error('[Close ession error]', error);
    }
}