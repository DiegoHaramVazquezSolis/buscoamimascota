import { USER_CITY_AS, USER_COUNTRY_AS, GET_LOSTED_PUBLICATION, REMOVE_LOSTED_PUBLICATION } from '../../utils/Constants';
import { Clipboard } from 'react-native';
import { lostedRef } from '../../services/database';
import { getData } from '../../utils/LocalStorage';

/**
 * Get the publications of losted pets in a specific city and dispatch the action to redux
 * 
 * @param {function} dispatch Redux dispatch
 */
export const getLostedPublications = () => async (dispatch) => {
    const city = 'Guadalajara'; // await getData(USER_CITY_AS);
    const country = 'MX'; // await getData(USER_COUNTRY_AS);
    if (city && country) {

        /**
         * If the user have a selected country and city we use that information to filter the publications
         */
        lostedRef.where('country', '==', country).where('city', '==', city).orderBy('timeStamp', 'asc').limit(25)
            .onSnapshot((lostedPublicationsSnap) => {

                return dispatch(manageLostedPublications(lostedPublicationsSnap.docChanges));
        }, (error) => {
            Clipboard.setString(JSON.stringify(error));
            console.error('[LostedPublicationsActios => Publication listener]:', error);
        });
    } else {
        
        /**
         * If the user don't have a selected country and city we just filter the last publications
         */
        lostedRef.orderBy('timeStamp', 'asc').limit(25)
            .onSnapshot((lostedPublicationsSnap) => {

                return dispatch(manageLostedPublications(lostedPublicationsSnap.docChanges));
        }, (error) => {
            console.error('[LostedPublicationsActios => Publication listener]:', error);
        });
    }
}

/**
 * Action of redux for set a publication in the global state
 * 
 * @param {object} payload Losted publication
 */
const getPublicationsSuccess = (payload) => ({ type: GET_LOSTED_PUBLICATION, payload });

/**
 * Action of redux for set a publication in the global state
 * 
 * @param {object} payload Losted publication
 */
const removePublicationsSuccess = (payload) => ({ type: REMOVE_LOSTED_PUBLICATION, payload });

/**
 * Manage the docChanges of the firestore query
 * 
 * @param {object} docChanges Doc changes of the query on firestore
 * @param {function} dispatch Redux dispatch
 */
const manageLostedPublications = (docChanges) => (dispatch) => {
    docChanges.forEach((updatedPublication) => {
        if (updatedPublication.type === 'added') {
            const lostedPublication = {
                id: updatedPublication.doc.id,
                ...updatedPublication.doc.data()
            };

            return dispatch(getPublicationsSuccess(lostedPublication));
        } else if (updatedPublication.type === 'removed') {

            return dispatch(removePublicationsSuccess(updatedPublication.doc.id));
        }
    });
}