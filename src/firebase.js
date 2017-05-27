import firebase from 'firebase'
import * as firebaseui from 'firebaseui'

export const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
}

export const app = firebase.initializeApp(config)
export const ui = new firebaseui.auth.AuthUI(firebase.auth())
export default firebase

export const uiConfig = {
  callbacks: {
    signInSuccess: (currentUser, credential, redirectUrl) => {
      // Do not redirect.
      return false;
    }
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
}