export const ActionTypes = {
  CURRENT_USER_SYNC: 'user/CURRENT_USER_SYNC',
}

export const actions = {
  syncCurrentUser: (currentUser) => ({type: ActionTypes.CURRENT_USER_SYNC, currentUser}),
}

export const selectors = {
  getCurrentUser: (state) => state.user.currentUser,
  getUserGames: (state) => state.user.currentUser.games,
  isUserAdmin: (state) => state.user.currentUser.isAdmin,
  isUserGuest: (state) => state.user.currentUser.isGuest,
}

export const initialState = {
  currentUser: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CURRENT_USER_SYNC:
      return {
        ...state,
        currentUser: action.currentUser
      }
    default:
      return state
  }
}