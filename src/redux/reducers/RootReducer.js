import { combineReducers } from 'redux';
import LostedPublications from './LostedPublicationsReducer';
import User from './UserReducer';
import AdoptionPublications from './AdoptionPublicationsReducer';

export default RootReducer = combineReducers({
    User,
    LostedPublications,
    AdoptionPublications
});