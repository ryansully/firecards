import reducer, { actions, ActionTypes, initialState, selectors } from './dux'

const currentUser = {
  isAdmin: true,
  isGuest: true,
}

it('creates action to get a user', () => {
  expect(actions.getUserSuccess({
    name: 'test'
  })).toEqual({
    type: ActionTypes.USER_GET_SUCCESS,
    user: { name: 'test' }
  })
})

it('selects user from state', () => {
  expect(selectors.getCurrentUser({ user: {currentUser} })).toEqual(currentUser)
})

it('selects user admin status from state', () => {
  expect(selectors.isUserAdmin({user: {currentUser}})).toEqual(true)
})

it('selects user guest status from state', () => {
  expect(selectors.isUserGuest({user: {currentUser}})).toEqual(true)
})

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('handles USER_GET_SUCCESS action', () => {
  expect(reducer({}, {
    type: ActionTypes.USER_GET_SUCCESS,
    currentUser: { name: 'test' }
  })).toEqual({
    currentUser: { name: 'test' }
  })
})