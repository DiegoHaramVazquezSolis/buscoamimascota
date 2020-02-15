import Geolocation from '@react-native-community/geolocation';

import { GET_ADOPTION_PUBLICATION, REMOVE_ADOPTION_PUBLICATION, REMOVE_ALL_ADOPTION_PUBLICATIONS, ON_BOARDING_VIEWED_AS } from '../../utils/Constants';

import { adoptionRef } from '../../services/database';

import { getGeohashRange } from '../../utils/Utils';
import { getAsyncStorageData } from '../../utils/LocalStorage';

/**
 * Action of redux for set a publication of on adoption pets in the global state
 * @param {object} payload Losted publication
 */
const getPublicationSuccess = (payload) => ({ type: GET_ADOPTION_PUBLICATION, payload });

/**
 * Action of redux for remove a publication of on adoption pets in the global state
 * @param {object} payload Losted publication
 */
const removePublicationSuccess = (payload) => ({ type: REMOVE_ADOPTION_PUBLICATION, payload });

/**
 * Action of redux for remove all the publications of on adoption pets in the global state
 */
export const removeAllPublicationsSuccess = () => ({ type: REMOVE_ALL_ADOPTION_PUBLICATIONS });

/**
 * Get the publications of on adoption pets in a specific city and dispatch the action to redux
 * @param {function} dispatch Redux dispatch
 */
export const getAdoptionPublications = () => async (dispatch) => {
    try {
        if (await getAsyncStorageData(ON_BOARDING_VIEWED_AS) === 'true') {
            Geolocation.getCurrentPosition((locationInfo) => {
                const geoHashRange = getGeohashRange(locationInfo.coords.latitude, locationInfo.coords.longitude);

                /**
                 * If the location of the user is available we use it to filter only the 25 closest publications
                 * Closest: In a range of 5km or less
                 */
                adoptionRef.where("geohash", ">=",geoHashRange.lowerGeoHash).where("geohash", "<=", geoHashRange.upperGeoHash).limit(25)
                .onSnapshot((adoptionPublicationsSnap) => {
                    const sortedAdoptionPublications = adoptionPublicationsSnap.docChanges().sort((a, b) => a.doc.data().timeStamp > b.doc.data().timeStamp);

                    return dispatch(manageAdoptionPublications(sortedAdoptionPublications));
                }, (error) => {
                    console.error('[AdoptionPublicationsActions => Publication listener]:', error);
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
                adoptionRef.orderBy('timeStamp').limit(25)
                .onSnapshot((adoptionPublicationsSnap) => {

                    return dispatch(manageAdoptionPublications(adoptionPublicationsSnap.docChanges()));
                }, (error) => {
                    console.error('[AdoptionPublicationsActions => Publication listener]:', error);
                });
            });
        } else {
            /**
             * If the location of the user isn't available we just take the 25 most recent publications
             */
            adoptionRef.orderBy('timeStamp').limit(25)
            .onSnapshot((adoptionPublicationsSnap) => {

                return dispatch(manageAdoptionPublications(adoptionPublicationsSnap.docChanges()));
            }, (error) => {
                console.error('[AdoptionPublicationsActions => Publication listener]:', error);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * Manage the docChanges of the firestore query
 * @param {object} docChanges Doc changes of the query on firestore
 * @param {function} dispatch Redux dispatch
 */
const manageAdoptionPublications = (docChanges) => (dispatch) => {
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