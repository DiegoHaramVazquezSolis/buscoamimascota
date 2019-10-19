import { firestoreDatabase, realTimeDatabase } from './firebase';

export const lostedRef = firestoreDatabase.collection('Lost');
export const usersRef = realTimeDatabase.ref('/Users');

export const updateUserInfo = (uid, userInfo) => {
    

    return usersRef.child(uid).update(userInfo);
}