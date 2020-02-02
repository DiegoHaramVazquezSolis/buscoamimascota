import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Alert } from 'react-native';

import { auth, FacebookAuthProvider, GoogleAuthProvider } from './firebase';
import { WEB_CLIENT_GOOGLE_AUTH } from '../utils/Constants';
import { translate } from './i18n';

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
                console.log('New user', loginWithCredentialResult.user.uid);
            } else {
                console.log('Old user', loginWithCredentialResult.user.uid);
            }
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
            console.log('New user', loginWithCredentialResult.user.uid);
        } else {
            console.log('Old user', loginWithCredentialResult.user.uid);
        }
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
        return await auth.createUserWithEmailAndPassword(email, password);
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
export const logInWithEmail = async (email, password) => {
    try {
        return await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        Alert.alert(
            translate('auth.logInWithEmail.errorMessage.title'),
            translate('auth.logInWithEmail.errorMessage.description'),
            [
                { text: translate('auth.logInWithEmail.errorMessage.acceptButton') }
            ]
        );
        return Promise.reject(error);
    }
}