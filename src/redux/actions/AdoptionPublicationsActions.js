import { PermissionsAndroid } from 'react-native';

import { GET_ADOPTION_PUBLICATION, REMOVE_ADOPTION_PUBLICATION, REMOVE_ALL_ADOPTION_PUBLICATIONS, ON_BOARDING_VIEWED_AS } from '../../utils/Constants';

import { adoptionRef, userRef } from '../../services/database';
import { auth } from '../../services/firebase';

import { loadPublicationsBasedOnLocation } from '../../utils/Utils';
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
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted && auth.currentUser) {
                loadPetsBasedOnLocation(dispatch);
            } else {
                loadPetsByTimeStamp(dispatch);
            }
        } else {
            loadPetsByTimeStamp(dispatch);
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

const loadPetsBasedOnLocation = async (dispatch) => {

    /**
     * We load the publications at the same time when we load the user data, on configureStore
     * so probably at this point we can not get the user data yet, so we make a direct query
     * to the field
     */
    let userGeoHash = (await userRef.child(auth.currentUser.uid).child('geohash').once('value')).val();

    function loadPets(geoHashRange) {
        adoptionRef.where("geohash", ">=",geoHashRange.lowerGeoHash).where("geohash", "<=", geoHashRange.upperGeoHash).limit(25)
        .onSnapshot((adoptionPublicationsSnap) => {
            const sortedAdoptionPublications = adoptionPublicationsSnap.docChanges().sort((a, b) => a.doc.data().timeStamp > b.doc.data().timeStamp);

            return dispatch(manageAdoptionPublications(sortedAdoptionPublications));
        }, (error) => {
            console.error('[AdoptionPublicationsActions => Publication listener]:', error);
        });
    }

    loadPublicationsBasedOnLocation(userGeoHash, loadPets, () => loadPetsByTimeStamp(dispatch));
}

const loadPetsByTimeStamp = (dispatch) => {
    adoptionRef.orderBy('timeStamp').limit(25).onSnapshot((adoptionPublicationsSnap) => {

        return dispatch(manageAdoptionPublications(adoptionPublicationsSnap.docChanges()));
    }, (error) => {
        console.error('[AdoptionPublicationsActions => Publication listener]:', error);
    });
}