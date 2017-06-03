import { getAuthUserFromLocalStorage } from '../firebase'

export const ActionTypes = {
  AUTH_USER_REQUEST: 'auth/AUTH_USER_REQUEST',
  AUTH_USER_SUCCESS: 'auth/AUTH_USER_SUCCESS',
  SIGN_OUT_REQUEST: 'auth/SIGN_OUT_REQUEST',
  SIGN_OUT_SUCCESS: 'auth/SIGN_OUT_SUCCESS',
}

export const actions = {
  authUserRequest: (user) => ({type: ActionTypes.AUTH_USER_REQUEST, user}),
  authUserSuccess: (user) => ({type: ActionTypes.AUTH_USER_SUCCESS, user}),
  signOutRequest: () => ({type: ActionTypes.SIGN_OUT_REQUEST}),
  signOutSuccess: () => ({type: ActionTypes.SIGN_OUT_SUCCESS}),
}

export const selectors = {
  getUser: (state) => state.auth.user
}

export const initialState = {
  user: getAuthUserFromLocalStorage()
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.user
      }
    case ActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}