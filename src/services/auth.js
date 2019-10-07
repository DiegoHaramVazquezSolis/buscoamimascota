import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Alert } from 'react-native';

import { auth, FacebookAuthProvider, GoogleAuthProvider } from './firebase';
import { WEB_CLIENT_GOOGLE_AUTH } from '../utils/Constants';

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
 * (always use afther of setupGoogleSignin())
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
        let message = 'Hubo un error, revisa los campos o intentalo mas tarde';
        switch (error.code) {
            case 'auth/invalid-email':
                message = 'La direccion de correo electronico no es valida';
                break;
            case 'auth/email-already-in-use':
                message = 'Ya existe una cuenta con este correo';
                break;
            case 'auth/weak-password':
                    message = 'La contraseña debe tener al menos 6 caracteres';
                break;
            default:
                break;
        }
        Alert.alert(
            'Error',
            message,
            [
                { text: 'Entendido' }
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
            'Error',
            'Correo o contraseña incorrectos',
            [
                { text: 'Entendido' }
            ]
        );
        return Promise.reject(error);
    }
}