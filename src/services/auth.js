import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';

import { auth, FacebookAuthProvider, GoogleAuthProvider } from './firebase';
import { WEB_CLIENT_GOOGLE_AUTH } from '../utils/Constants';

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