import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/database';
import '@react-native-firebase/dynamic-links';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';

export const firestoreDatabase = firebase.firestore();
export const realTimeDatabase = firebase.database();
export const firebaseDynamicLinksGenerator = firebase.dynamicLinks();
export const auth = firebase.auth();
export const storage = firebase.storage();

// Auth providers
export const FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
export const EmailAuthProvider = firebase.auth.EmailAuthProvider;

// Auth providers id's
export const PASSWORD_PROVIDER = firebase.auth.EmailAuthProvider.PROVIDER_ID;
export const GOOGLE_PROVIDER = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
export const FACEBOOK_PROVIDER = firebase.auth.FacebookAuthProvider.PROVIDER_ID;
export const ANONYMOUS_PROVIDER = 'anonymous';

// Firestore values
export const firestoreValues = firebase.firestore;