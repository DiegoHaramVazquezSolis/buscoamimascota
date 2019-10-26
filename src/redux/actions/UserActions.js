import OneSignal from 'react-native-onesignal';

import { USER_LOGGED, USER_NOT_LOGGED } from '../../utils/Constants';

import { auth } from '../../services/firebase';
import { updateUserInfo } from '../../services/database';

/**
 * Action to call when the user is logged on the app
 */
const userIsLogged = (payload) => ({ type: USER_LOGGED, payload });

/**
 * Action to call when the user is NOT logged on the app
 */
const userIsNotLogged = () => ({ type: USER_NOT_LOGGED });

/**
 * Check and put a listener to listen the changes in the authentication
 * status of the user
 */
export const checkIfUserIsLogged = () => (dispatch) => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            OneSignal.addEventListener('ids', (device) => {
                updateUserInfo(user.uid, { notificationId: device.userId });
            });
            
            return dispatch(userIsLogged({ uid: user.uid, email: user.email }));
        }
        return dispatch(userIsNotLogged());
    });
}
