import { USER_LOGGED, USER_NOT_LOGGED } from '../../utils/Constants';

import { auth } from '../../services/firebase';

/**
 * Action to call when the user is logged on the app
 */
const userIsLogged = () => ({ type: USER_LOGGED });

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
            return dispatch(userIsLogged());
        }
        return dispatch(userIsNotLogged());
    });
}

