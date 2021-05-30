import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = process.env.FIREBASE_CONFIG;

let firebase;

if (!Firebase.apps.length) {
  firebase = Firebase.initializeApp(config);
} else {
  firebase = Firebase.app();
}

const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };