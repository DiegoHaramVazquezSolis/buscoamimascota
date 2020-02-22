import OneSignal from 'react-native-onesignal';

import { USER_LOGGED, USER_NOT_LOGGED, USER_SIGN_OUT } from '../../utils/Constants';

import { auth, ANONYMOUS_PROVIDER } from '../../services/firebase';
import { userRef } from '../../services/database';

/**
 * Action to call when the user is logged on the app
 */
export const userIsLogged = (payload) => ({ type: USER_LOGGED, payload });

/**
 * Action to call when the user is NOT logged on the app
 */
const userIsNotLogged = () => ({ type: USER_NOT_LOGGED });

/**
 * Action to call when the user sign out of the app
 */
const userSignOut = () => ({ type: USER_SIGN_OUT });

/**
 * Check and put a listener to listen the changes in the authentication
 * status of the user
 */
export const checkIfUserIsLogged = () => (dispatch) => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            let providerData = ANONYMOUS_PROVIDER;
            if (!user.isAnonymous && user.providerData.length > 0) {
                providerData = user.providerData[0].providerId;
            }

            /**
             * Inmediatly notify that the user is logged and send the data that we have
             */
            dispatch(userIsLogged({
                uid: user.uid,
                email: user.email,
                authProvider: providerData,
                isAnonymous: user.isAnonymous
            }));

            /**
             * Get the user profile and add that info the the local data
             */
            return userRef.child(user.uid).on('value', (userData) => {
                dispatch(userIsLogged({
                    ...userData.val()
                }));
            });
        }

        return dispatch(userIsNotLogged());
    });
}

export const signOut = () => (dispatch) => {
    dispatch(userSignOut());
}