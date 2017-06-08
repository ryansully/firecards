import reducer, { actions, ActionTypes, initialState, selectors } from './dux'

it('creates action to get a user', () => {
  expect(actions.getUserSuccess({
    name: 'test'
  })).toEqual({
    type: ActionTypes.USER_GET_SUCCESS,
    user: { name: 'test' }
  })
})

it('creates action to set user as admin', () => {
  expect(actions.setUserAsAdmin(true)).toEqual({
    type: ActionTypes.USER_ADMIN_SET,
    admin: true
  })
})

it('creates action to set user as guest', () => {
  expect(actions.setUserAsGuest(true)).toEqual({
    type: ActionTypes.USER_GUEST_SET,
    guest: true
  })
})

it('selects user from state', () => {
  expect(selectors.getUser({ user: initialState })).toEqual(null)
})

it('selects user admin status from state', () => {
  expect(selectors.isUserAdmin({ user: initialState })).toEqual(false)
})

it('selects user guest status from state', () => {
  expect(selectors.isUserGuest({ user: initialState })).toEqual(false)
})

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('handles USER_ADMIN_SET action', () => {
  expect(reducer({}, {
    type: ActionTypes.USER_ADMIN_SET,
    admin: true
  })).toEqual({
    isAdmin: true
  })
})

it('handles USER_GET_SUCCESS action', () => {
  expect(reducer({}, {
    type: ActionTypes.USER_GET_SUCCESS,
    user: { name: 'test' }
  })).toEqual({
    user: { name: 'test' }
  })
})

it('handles USER_GUEST_SET action', () => {
  expect(reducer({}, {
    type: ActionTypes.USER_GUEST_SET,
    guest: true
  })).toEqual({
    isGuest: true
  })
})