import Geolocation from '@react-native-community/geolocation';
import geohash, { decode } from 'ngeohash';

import { firestoreValues, auth } from '../services/firebase';
import { DEGREES_LATITUDE_PER_MILE, DEGREES_LONGITUDE_PER_MILE } from './Constants';

import { userRef } from '../services/database';

/**
 * Return the geo hash of the given location
 * @param {string | number} latitude Latitude of the location
 * @param {string | number} longitude Longitude of the location
 */
export function encodeLocation({ latitude, longitude }) {
    return geohash.encode(latitude, longitude, 10);
}

/**
 * @description Return an object with the lower and upper valid geo hashes based on a location and a given distance in miles
 * @param {string | number} latitude Longitude at the center of the range
 * @param {string | number} longitude Longitude at the center of the range
 * @param {string | number} distance Distance of the range (in miles) Default: 3.10686 or ~5 kilometers
 * @returns {Object} { lowerGeoHash: string, upperGeoHash: string }
 */
export function getGeohashRange(latitude = 20.6725076, longitude = -103.3866236, distance = 3.10686) {
    const lowerLat = latitude - DEGREES_LATITUDE_PER_MILE * distance;
    const lowerLon = longitude - DEGREES_LONGITUDE_PER_MILE * distance;
    const upperLat = latitude + DEGREES_LATITUDE_PER_MILE * distance;
    const upperLon = longitude + DEGREES_LONGITUDE_PER_MILE * distance;

    return {
        lowerGeoHash: geohash.encode(lowerLat, lowerLon, 10),
        upperGeoHash: geohash.encode(upperLat, upperLon, 10)
    };
  };

/**
 * @description Truncate a string if the length of the string is greater or equal than maxLength
 * @param {string} text Text to evaluate
 * @param {number} maxLength Max length allowed on the text
 * @param {number} limit Length of the string if the text length is greater than maxLength
 */
export function returnTextBasedOnMaxLength (text, maxLength) {
    if (maxLength === 0 || text.length < maxLength) {

        return text;
    }

    return `${text.substring(0, maxLength)}...`;
}

/**
 * @description Truncate a string to the given limit size if the length of the string is
 * greater or equal than maxLength
 * @param {string} text Text to evaluate
 * @param {number} maxLength Max length allowed on the text
 * @param {number} limit Length of the string if the text length is greater than maxLength
 * @example returnTextBasedOnMaxLengthWithLimit('Hello', 5, 2) return 'He'
 */
export function returnTextBasedOnMaxLengthWithLimit (text, maxLength, limit) {
    const textHaveEndLine = /(\r\n|\n|\r)/gm.exec(text);
    if (textHaveEndLine) {
        if (textHaveEndLine.index <= limit) {
        return text.substring(0, textHaveEndLine.index);
        }
    }

    if (maxLength === 0 || text.length < maxLength) {

        return text.replace(/(\r\n|\n|\r)/gm," ");
    }

    return `${text.replace(/(\r\n|\n|\r)/gm,"").substring(0, limit)}...`;
}

/**
 * Build a GeoPoint to store it on the firestore database (only apply to firestore
 * don't use on real time database)
 * @param {number} latitude Latitude of the location
 * @param {number} longitude Longitude of the location
 */
export function createFirestoreGeoPoint({ latitude, longitude }) {
    return new firestoreValues.GeoPoint(latitude, longitude);
}

/**
 * Create a TimeStamp value to store it on the firestore database (only apply to firestore
 * don't use on real time database)
 * @param {number} timeStampMilliseconds TimeStamp to save (in milliseconds)
 */
export function createFirestoreTimeStamp(timeStampMilliseconds) {
    return new firestoreValues.Timestamp(timeStampMilliseconds / 1000, 0);
}

/**
 * Get the current UTC timeStamp
 * @returns {Date}
 */
export function getCurrentUTCDate() {
    const localDate = new Date();

    return new Date(
        localDate.getUTCFullYear(),
        localDate.getUTCMonth(),
        localDate.getUTCDate(),
        localDate.getUTCHours(),
        localDate.getUTCMinutes(),
        localDate.getUTCSeconds(),
        localDate.getUTCMilliseconds()
    );
}

/**
 * Convert an UTC Date to the user's local date
 * @param {Date} UTCDate Date UTC
 */
export function convertUTCDateToLocalDate(UTCDate) {
    return new Date(UTCDate.getTime() - UTCDate.getTimezoneOffset() * 60 * 1000);
}

export function loadPublicationsBasedOnLocation(userGeoHash, onGetGeoHashSuccess, onFail) {

    /**
     * If we know the location of the user we use it to show the nearest publications
     */
    if (userGeoHash) {
        const decodedUserGeoHash = decode(userGeoHash);
        onGetGeoHashSuccess(getGeohashRange(decodedUserGeoHash.latitude, decodedUserGeoHash.longitude, 10));

    } else {
        Geolocation.getCurrentPosition((locationInfo) => {
            const geoHash = geohash.encode(locationInfo.coords.latitude, locationInfo.coords.longitude, 10);

            /**
             * Save the user location, so we do not need to check the location every time the user open
             * the app
             */
            userRef.child(auth.currentUser.uid).update({ geoHash });

            onGetGeoHashSuccess(getGeohashRange(locationInfo.coords.latitude, locationInfo.coords.longitude, 10));
        }, (error) => {
            console.log(error);
            if (error.code === 2) {
                console.log('Here put a cool Dialog or Snackbar telling to the user that enable their location');
            } else if (error.code === 3) {
                console.log('Here put a cool Dialog or Snackbar telling to the user that we can`t determine their location');
            }

            onFail();
        });
    }
}