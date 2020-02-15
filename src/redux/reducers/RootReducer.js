import { combineReducers } from 'redux';
import LostedPublications from './LostedPublicationsReducer';
import User from './UserReducer';
import AdoptionPublications from './AdoptionPublicationsReducer';
import Screens from './ScreensReducer';

export default RootReducer = combineReducers({
    User,
    LostedPublications,
    AdoptionPublications,
    Screens
});