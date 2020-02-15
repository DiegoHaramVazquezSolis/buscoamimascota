import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import RootReducer from './reducers/RootReducer';
import { getLostedPublications } from './actions/LostedPublicationsActions';
import { getAdoptionPublications } from './actions/AdoptionPublicationsActions';
import { checkIfUserIsLogged } from './actions/UserActions';

const store = createStore(RootReducer, applyMiddleware(thunkMiddleware));

/**
 * Create the store and load important data at the begining of the app
 */
export function configureStore() {
    store.dispatch(getLostedPublications());
    store.dispatch(getAdoptionPublications());
    store.dispatch(checkIfUserIsLogged());

    return store;
}

export default store;