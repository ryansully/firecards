export const ActionTypes = {
  USER_GET_SUCCESS: 'user/USER_GET_SUCCESS',
}

export const actions = {
  getUserSuccess: (currentUser) => ({type: ActionTypes.USER_GET_SUCCESS, currentUser}),
}

export const selectors = {
  getCurrentUser: (state) => state.user.currentUser,
  isUserAdmin: (state) => state.user.currentUser.isAdmin,
  isUserGuest: (state) => state.user.currentUser.isGuest,
}

export const initialState = {
  currentUser: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USER_GET_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser
      }
    default:
      return state
  }
}