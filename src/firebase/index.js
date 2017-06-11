import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import ReduxSagaFirebase from 'redux-saga-firebase'
import FirebaseSagaHelper from './FirebaseSagaHelper'

export const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
}

export const app = firebase.initializeApp(config)
export const auth = firebase.auth()
export const database = firebase.database()
export const ui = new firebaseui.auth.AuthUI(auth)
export const reduxSagaFirebase = new ReduxSagaFirebase(app)
export const firebaseSagaHelper = new FirebaseSagaHelper(app)
export default firebase

export const uiConfig = {
  callbacks: {
    signInSuccess: (currentUser, credential, redirectUrl) => {
      // Do not redirect.
      return false
    }
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
}

export function getAuthUserFromLocalStorage() {
  for (let key in localStorage) {
    if (key.startsWith('firebase:authUser:')) {
      return JSON.parse(localStorage[key])
    }
  }
  return null
}