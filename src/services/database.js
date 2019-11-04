import { firestoreDatabase, realTimeDatabase } from './firebase';
import { uploadPetImage } from './storage';
import { createFirestoreTimeStamp, getCurrentUTCDate } from '../utils/Utils';

export const lostedRef = firestoreDatabase.collection('Lost');
export const adoptionRef = firestoreDatabase.collection('Adoption');
export const userRef = realTimeDatabase.ref('/User');
export const reportRef = realTimeDatabase.ref('/Report');

export const updateUserInfo = async (uid, userInfo) => {
    try {
    return await userRef.child(uid).update(userInfo);
    } catch (error) {
        console.error(error);
    }
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
        lostedRef.doc(publication.id).update({ image: uploadedImageUrl });

        return {
            author,
            image: uploadedImageUrl,
            ...petData
        };
    } catch (error) {
        console.error(error);
    }
}