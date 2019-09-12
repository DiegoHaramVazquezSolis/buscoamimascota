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
    if (maxLength === 0 || text.length < maxLength) {

        return text;
    }

    return `${text.substring(0, limit)}...`;
}