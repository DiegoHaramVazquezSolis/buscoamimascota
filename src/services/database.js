import { firestoreDatabase, realTimeDatabase } from './firebase';

export const lostedRef = firestoreDatabase.collection('Lost');
export const userRef = realTimeDatabase.ref('/User');
export const reportRef = realTimeDatabase.ref('/Report');

export const updateUserInfo = (uid, userInfo) => {
    return userRef.child(uid).update(userInfo);
}

export const subscribeUserToPublication = (uid, publicationId) => {
    lostedRef.doc(publicationId).collection('Subscribers').doc(uid).set({});
}

export const reportPublication = (uid, publicationId, report) => {
    reportRef.child(publicationId).push({ reportAuthor: uid, report });
}