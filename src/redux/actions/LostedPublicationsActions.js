import { USER_CITY_AS, USER_COUNTRY_AS, GET_LOSTED_PUBLICATION, REMOVE_LOSTED_PUBLICATION, REMOVE_ALL_LOSTED_PUBLICATIONS, USER_REGION_AS } from '../../utils/Constants';
import { lostedRef } from '../../services/database';
import { getAsyncStorageData } from '../../utils/LocalStorage';
import { Clipboard } from 'react-native';

/**
 * Action of redux for set a publication of losted pets in the global state
 * 
 * @param {object} payload Losted publication
 */
const getPublicationSuccess = (payload) => ({ type: GET_LOSTED_PUBLICATION, payload });

/**
 * Action of redux for remove a publication of losted pets in the global state
 * 
 * @param {object} payload Losted publication
 */
const removePublicationSuccess = (payload) => ({ type: REMOVE_LOSTED_PUBLICATION, payload });

/**
 * Action of redux for remove all the publications of losted pets in the global state
 */
export const removeAllPublicationsSuccess = () => ({ type: REMOVE_ALL_LOSTED_PUBLICATIONS });

/**
 * Get the publications of losted pets in a specific city and dispatch the action to redux
 * 
 * @param {function} dispatch Redux dispatch
 */
export const getLostedPublications = () => async (dispatch) => {
    try {
        const country = await getAsyncStorageData(USER_COUNTRY_AS);
        const region = await getAsyncStorageData(USER_REGION_AS);

        if (country && region) {
            const city = await getAsyncStorageData(USER_CITY_AS);

            if (city) {
                
                /**
                 * If the user have a selected country, region and city we use that information to filter the publications
                 */
                lostedRef.where('country', '==', country).where('region', '==', region).where('city', '==', city).orderBy('timeStamp', 'asc').limit(25)
                .onSnapshot((lostedPublicationsSnap) => {

                    return dispatch(manageLostedPublications(lostedPublicationsSnap.docChanges));
                }, (error) => {
                    console.error('[LostedPublicationsActios => Publication listener]:', error);
                });
            } else {

                /**
                 * If the user have a selected country and region we use that information to filter the publications
                 */
                lostedRef.where('country', '==', country).where('region', '==', region).orderBy('timeStamp', 'asc').limit(25)
                .onSnapshot((lostedPublicationsSnap) => {

                    return dispatch(manageLostedPublications(lostedPublicationsSnap.docChanges));
                }, (error) => {
                    Clipboard.setString(JSON.stringify(error));
                    console.error('[LostedPublicationsActios => Publication listener]:', error);
                });
            }
        } else {
            
            /**
             * If the user don't have a selected country and city we just filter the last publications
             */
            lostedRef.orderBy('timeStamp', 'asc').limit(10)
                .onSnapshot((lostedPublicationsSnap) => {

                    return dispatch(manageLostedPublications(lostedPublicationsSnap.docChanges));
            }, (error) => {
                console.error('[LostedPublicationsActios => Publication listener]:', error);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

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

            return dispatch(getPublicationSuccess(lostedPublication));
        } else if (updatedPublication.type === 'removed') {

            return dispatch(removePublicationSuccess(updatedPublication.doc.id));
        }
    });
}