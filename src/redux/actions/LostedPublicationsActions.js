import { PermissionsAndroid, Alert } from 'react-native';

import { GET_LOSTED_PUBLICATION, REMOVE_LOSTED_PUBLICATION, REMOVE_ALL_LOSTED_PUBLICATIONS, ON_BOARDING_VIEWED_AS, ASK_USER_FOR_LOCATION } from '../../utils/Constants';

import { lostedRef, userRef } from '../../services/database';
import { auth } from '../../services/firebase';

import { loadPublicationsBasedOnLocation } from '../../utils/Utils';
import { getAsyncStorageData, storeAsyncStorageData } from '../../utils/LocalStorage';
import { translate } from '../../services/i18n';

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
        if (await getAsyncStorageData(ON_BOARDING_VIEWED_AS) === 'true') {
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted) {
                loadPetsBasedOnLocation(dispatch);
            } else {
                if (!(await getAsyncStorageData(ASK_USER_FOR_LOCATION))) {
                    Alert.alert(
                        translate('LostedPublicationsActions.PermissionsDialog.title'),
                        translate('LostedPublicationsActions.PermissionsDialog.message'),
                        [
                            { text: translate('LostedPublicationsActions.PermissionsDialog.acceptButton'), onPress: () => loadPetsBasedOnLocation(dispatch) }
                        ]
                    );
                } else {
                    loadPetsByTimeStamp(dispatch);
                }
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

const loadPetsBasedOnLocation = async (dispatch) => {
    /**
     * We load the publications at the same time when we load the user data, on configureStore
     * so probably at this point we can not get the user data yet, so we make a direct query
     * to the field
     */
    let userGeoHash = (await userRef.child(auth.currentUser.uid).child('geoHash').once('value')).val();
    const locationPermissionGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (!userGeoHash || !locationPermissionGranted) {
        const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        /**
         * If the user grant the permission, or select the Do not ask again checkbox we set a flag to never show
         * again the alert, if the user only denies, we do not set the flag, so we can ask later
         */
        if (response === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            storeAsyncStorageData(ASK_USER_FOR_LOCATION, 'true');

            return loadPetsByTimeStamp(dispatch);
        } else if (response === PermissionsAndroid.RESULTS.DENIED) {

            return loadPetsByTimeStamp(dispatch);
        }
    }

    function loadPets(geoHashRange) {
        lostedRef.where("geohash", ">=",geoHashRange.lowerGeoHash).where("geohash", "<=", geoHashRange.upperGeoHash).limit(25)
        .onSnapshot((lostedPublicationsSnap) => {
            const sortedLostedPublications = lostedPublicationsSnap.docChanges().sort((a, b) => a.doc.data().timeStamp > b.doc.data().timeStamp);

            return dispatch(manageLostedPublications(sortedLostedPublications));
        }, (error) => {
            console.error('[LostedPublicationsActions => Publication listener]:', error);
        });
    }

    loadPublicationsBasedOnLocation(userGeoHash, loadPets, () => loadPetsByTimeStamp(dispatch));
}

const loadPetsByTimeStamp = (dispatch) => {
    lostedRef.orderBy('timeStamp').limit(25).onSnapshot((lostedPublicationsSnap) => {

        return dispatch(manageLostedPublications(lostedPublicationsSnap.docChanges()));
    }, (error) => {
        console.error('[LostedPublicationsActions => Publication listener]:', error);
    });
}