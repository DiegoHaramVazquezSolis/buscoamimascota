import { firestoreDatabase, realTimeDatabase } from './firebase';
import { uploadPetImage } from './storage';
import { createFirestoreTimeStamp, getCurrentUTCDate } from '../utils/Utils';

export const lostedRef = firestoreDatabase.collection('Lost');
export const adoptionRef = firestoreDatabase.collection('Adoption');
export const userRef = realTimeDatabase.ref('/User');
export const reportRef = realTimeDatabase.ref('/Report');

/**
 * Create the basic profile for a new user
 * @param {string} uid User identifier
 * @param {string | null} email email direction of the new user
 * @param {string | null} photoURL Url from the profile image of the user
 */
export const createUserProfile = (uid, email, photoURL) => {
    try {
        userRef.child(uid).update({
            email,
            photoURL,
            lostedPetsNotifications: true,
            adoptionPetsNotifications: true
        });
    } catch (error) {
        console.error('[Create User Profile]', error);
    }
}

/**
 * Remove the user profile from database
 * @param {string} uid User identifier
 */
export const removeUserProfile = (uid) => {
    userRef.child(uid).remove();
}

/**
 * Add or update the userInfo object to the user profile
 * @param {string} uid User identifier
 * @param {Object} userInfo Data to update
 */
export const updateUserInfo = async (uid, userInfo) => {
    try {
        return await userRef.child(uid).update(userInfo);
    } catch (error) {
        console.error('[Update User Info]', error);
    }
}

/**
 * Update the publication author in all the publications of the user with the oldUis
 * LIMITED TO BE USED ONLY WHEN WE ARE MERGING AN ANONYMOUS ACCOUNT WITH A PROVIDER ACCOUNT
 * @param {string} oldUid User identifier of the author of the publications to merge
 * @param {string} newUid User identifier of the author of the publications where are going to be merged
 */
export const mergeUserPublications = async (oldUid, newUid) => {
    const lostedPublications = await lostedRef.where('author', '==', oldUid).get({ source: 'server' });
    const adoptionPublications = await adoptionRef.where('author', '==', oldUid).get({ source: 'server' });

    lostedPublications.docs.forEach((lostedPublication) => {
        lostedRef.doc(lostedPublication.id).update({ author: newUid });
    });

    adoptionPublications.docs.forEach((adoptionPublication) => {
        adoptionRef.doc(adoptionPublication.id).update({ author: newUid });
    });
}

export const subscribeUserToPublication = async (uid, publicationId) => {
    try {
        await lostedRef.doc(publicationId).collection('Subscribers').doc(uid).set({});
    } catch (error) {
        console.error(error);
    }
}

export const reportPublication = (uid, publicationId, report) => {
    reportRef.child(publicationId).push({ reportAuthor: uid, report });
}

export const createPetPublication = async (losted, author, petData, image) => {
    try {
        let publication = {};
        const timeStamp = createFirestoreTimeStamp(getCurrentUTCDate());

        if (losted) {
            publication = await lostedRef.add({ author, ...petData, timeStamp });
        } else {
            publication = await adoptionRef.add({ author, ...petData, timeStamp });
        }

        const uploadedImageUrl = await uploadPetImage(losted, publication.id, image);

        if (losted) {
            lostedRef.doc(publication.id).update({ image: uploadedImageUrl });
        } else {
            adoptionRef.doc(publication.id).update({ image: uploadedImageUrl });
        }

        return {
            author,
            image: uploadedImageUrl,
            ...petData
        };
    } catch (error) {
        console.error(error);
    }
}