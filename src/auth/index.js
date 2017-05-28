import firebase from '../firebase'

const auth = firebase.auth()
export default auth

export function getUserFromLocalStorage() {
  for (let key in localStorage) {
    if (key.startsWith('firebase:authUser:')) {
      return JSON.parse(localStorage[key])
    }
  }
  return null
}