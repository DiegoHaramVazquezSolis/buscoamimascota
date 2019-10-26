import { USER_LOGGED, USER_NOT_LOGGED } from '../../utils/Constants';

const initialState = {
    isLogged: null,
    uid: '',
    email: ''
};

function User(state = initialState, action) {
    switch (action.type) {
        case USER_LOGGED:
            return { ...state, ...action.payload, isLogged: true };
        case USER_NOT_LOGGED:
            return { ...state, isLogged: false };
        default:
            return state;
    }
};

export default User;