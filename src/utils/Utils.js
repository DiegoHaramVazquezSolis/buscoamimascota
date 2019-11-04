import { firestoreValues } from '../services/firebase';

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