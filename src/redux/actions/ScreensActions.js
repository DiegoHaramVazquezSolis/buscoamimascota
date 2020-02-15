import { SET_CURRENT_SCREEN, SET_PREVIOUS_SCREEN } from '../../utils/Constants';

const setCurrentScreenDispatch = (payload) => ({ type: SET_CURRENT_SCREEN, payload });

const setPreviousScreenDispatch = (payload) => ({ type: SET_PREVIOUS_SCREEN, payload });

export const setCurrentScreen = (screen) => (dispatch) => {
    dispatch(setCurrentScreenDispatch(screen));
}

export const setPreviousScreen = (screen) => (dispatch) => {
    dispatch(setPreviousScreenDispatch(screen));
}