import { SET_CURRENT_SCREEN, SET_PREVIOUS_SCREEN } from '../../utils/Constants';

const initialState = {
    current: '',
    previous: ''
};

function Screens(state = initialState, action) {
      switch (action.type) {
        case SET_CURRENT_SCREEN:
            return { ...state, current: action.payload };
        case SET_PREVIOUS_SCREEN:
            return { ...state, previous: action.payload };
        default:
            return state;
      }
};

export default Screens;