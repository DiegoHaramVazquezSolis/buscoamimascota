import firebase from 'react-native-firebase';

export const firestoreDatabase = firebase.firestore();
export const firebaseDynamicLinks = firebase.links;
export const firebaseLinks = firebase.links();
export const auth = firebase.auth();

// Auth providers
export const FacebookAuthProvider = firebase.auth.FacebookAuthProvider;