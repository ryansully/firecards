import { getAuthUserFromLocalStorage } from '../firebase'

export const ActionTypes = {
  AUTH_USER_SYNC: 'auth/AUTH_USER_SYNC',
  SIGN_OUT: 'auth/SIGN_OUT',
}

export const actions = {
  signOut: () => ({type: ActionTypes.SIGN_OUT}),
  syncAuthUser: (user) => ({type: ActionTypes.AUTH_USER_SYNC, user}),
}

export const selectors = {
  getUser: (state) => state.auth.user
}

export const initialState = {
  user: getAuthUserFromLocalStorage()
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTH_USER_SYNC:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}