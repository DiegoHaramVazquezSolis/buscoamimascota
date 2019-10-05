import { LoginManager, AccessToken } from 'react-native-fbsdk';

import { auth, FacebookAuthProvider } from './firebase';

export const loginWithFacebook = async () => {
    const facebookLoginResult = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (facebookLoginResult.isCancelled) {
        console.log('Facebook authentication cancelled');
    } else {
        const accessToken = (await AccessToken.getCurrentAccessToken()).accessToken;
        const credential = FacebookAuthProvider.credential(accessToken);
        const loginWithCredentialResult = await auth.signInWithCredential(credential);
        if (loginWithCredentialResult.additionalUserInfo.isNewUser) {
            console.log('New user');
        } else {
            console.log('Old user');
        }
    }
}