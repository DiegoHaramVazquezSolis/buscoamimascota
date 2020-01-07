import Geolocation from '@react-native-community/geolocation';

import { GET_LOSTED_PUBLICATION, REMOVE_LOSTED_PUBLICATION, REMOVE_ALL_LOSTED_PUBLICATIONS } from '../../utils/Constants';

import { lostedRef } from '../../services/database';

import { getGeohashRange } from '../../utils/Utils';

/**
 * Action of redux for set a publication of losted pets in the global state
 * @param {object} payload Losted publication
 */
const getPublicationSuccess = (payload) => ({ type: GET_LOSTED_PUBLICATION, payload });

/**
 * Action of redux for remove a publication of losted pets in the global state
 * @param {object} payload Losted publication
 */
const removePublicationSuccess = (payload) => ({ type: REMOVE_LOSTED_PUBLICATION, payload });

/**
 * Action of redux for remove all the publications of losted pets in the global state
 */
export const removeAllPublicationsSuccess = () => ({ type: REMOVE_ALL_LOSTED_PUBLICATIONS });

/**
 * Get the publications of losted pets in a specific city and dispatch the action to redux
 * @param {function} dispatch Redux dispatch
 */
export const getLostedPublications = () => async (dispatch) => {
    try {
        Geolocation.getCurrentPosition((locationInfo) => {
            const geoHashRange = getGeohashRange(locationInfo.coords.latitude, locationInfo.coords.longitude);

            /**
             * If the location of the user is available we use it to filter only the 25 closest publications
             * Closest: In a range of 5km or less
             */
            lostedRef.where("geohash", ">=",geoHashRange.lowerGeoHash).where("geohash", "<=", geoHashRange.upperGeoHash).limit(25)
            .onSnapshot((lostedPublicationsSnap) => {
                const sortedLostedPublications = lostedPublicationsSnap.docChanges().sort((a, b) => a.doc.data().timeStamp > b.doc.data().timeStamp);

                return dispatch(manageLostedPublications(sortedLostedPublications));
            }, (error) => {
                console.error('[LostedPublicationsActions => Publication listener]:', error);
            });
        }, (error) => {
            if (error.code === 1) {
                console.log('Here put a cool Dialog or Snackbar telling to the user that we don`t have permission to use their location');
            } else if (error.code === 2) {
                console.log('Here put a cool Dialog or Snackbar telling to the user that enable their location');
            } else if (error.code === 3) {
                console.log('Here put a cool Dialog or Snackbar telling to the user that we can`t determine their location');
            }

            /**
             * If the location of the user isn't available we just take the 25 most recent publications
             */
            lostedRef.orderBy('timeStamp').limit(25)
            .onSnapshot((lostedPublicationsSnap) => {

                return dispatch(manageLostedPublications(lostedPublicationsSnap.docChanges()));
            }, (error) => {
                console.error('[LostedPublicationsActions => Publication listener]:', error);
            });
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Manage the docChanges of the firestore query
 * @param {Array} docChanges Doc changes of the query on firestore
 * @param {function} dispatch Redux dispatch
 */
const manageLostedPublications = (docChanges) => (dispatch) => {
    docChanges.forEach((updatedPublication) => {
        if (updatedPublication.type === 'added' || updatedPublication.type === 'modified') {
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