import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/dynamic-links';
import '@react-native-firebase/auth';
export const firestoreDatabase = firebase.firestore();
export const firebaseDynamicLinksGenerator = firebase.dynamicLinks();
export const auth = firebase.auth();

// Auth providers
export const FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;