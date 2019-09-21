import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import RootReducer from './reducers/RootReducer';
import { getLostedPublications } from './actions/LostedPublicationsActions';

/**
 * Create the store and load important data at the begining of the app
 */
export function configureStore() {
    const store = createStore(RootReducer, applyMiddleware(thunkMiddleware));
    store.dispatch(getLostedPublications());

    return store;
}