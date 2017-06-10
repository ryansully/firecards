import { getAuthUserFromLocalStorage } from '../firebase'

export const ActionTypes = {
  AUTH_USER_SYNC: 'auth/AUTH_USER_SYNC',
  SIGN_OUT: 'auth/SIGN_OUT',
}

export const actions = {
  signOut: () => ({type: ActionTypes.SIGN_OUT}),
  syncAuthUser: (authUser) => ({type: ActionTypes.AUTH_USER_SYNC, authUser}),
}

export const selectors = {
  getAuthUser: (state) => state.auth.authUser
}

export const initialState = {
  authUser: getAuthUserFromLocalStorage()
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTH_USER_SYNC:
      return {
        ...state,
        authUser: action.authUser
      }
    default:
      return state
  }
}