import { GET_LOSTED_PUBLICATION } from '../../utils/Constants';
import { lostedRef } from '../../services/database';

/**
 * Get the publications of losted pets in a specific city and dispatch the action to redux
 * 
 * @param {string} city City to get just the right publications for the user
 * @param {function} dispatch Redux dispatch
 */
export const getLostedPublications = (city) => (dispatch) => {
    lostedRef.where('city', '==', city).orderBy('timeStamp', 'asc').limit(25).onSnapshot((lostedPublicationsSnap) => {

        lostedPublicationsSnap.docChanges.forEach((updatePublication) => {

            if (updatePublication.type === 'added') {
                const lostedPublication = {
                    id: updatePublication.doc.id,
                    ...updatePublication.doc.data()
                };

                return dispatch(getPublicationsSuccess(lostedPublication));
            }
        });
    }, (error) => {
        console.error('[LostedPublicationsActios => Publication listener]:', error);
    });
}

/**
 * Action of redux for set a publication in the global state
 * 
 * @param {object} payload Losted publication
 */
const getPublicationsSuccess = (payload) => ({ type: GET_LOSTED_PUBLICATION, payload });