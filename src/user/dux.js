export const ActionTypes = {
  USER_ADMIN_SET: 'user/USER_ADMIN_SET',
  USER_GET_SUCCESS: 'user/USER_GET_SUCCESS',
  USER_GUEST_SET: 'user/USER_GUEST_SET',
}

export const actions = {
  getUserSuccess: (user) => ({type: ActionTypes.USER_GET_SUCCESS, user}),
  setUserAsAdmin: (admin) => ({type: ActionTypes.USER_ADMIN_SET, admin}),
  setUserAsGuest: (guest) => ({type: ActionTypes.USER_GUEST_SET, guest}),
}

export const selectors = {
  getUser: (state) => state.user.user,
  isUserAdmin: (state) => state.user.isAdmin,
  isUserGuest: (state) => state.user.isGuest,
}

export const initialState = {
  isAdmin: false,
  isGuest: false,
  user: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USER_ADMIN_SET:
      return {
        ...state,
        isAdmin: action.admin
      }
    case ActionTypes.USER_GET_SUCCESS:
      return {
        ...state,
        user: action.user
      }
    case ActionTypes.USER_GUEST_SET:
      return {
        ...state,
        isGuest: action.guest
      }
    default:
      return state
  }
}