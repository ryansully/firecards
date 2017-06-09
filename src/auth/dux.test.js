import reducer, { actions, ActionTypes, selectors, initialState } from './dux'

it('creates action to sync auth user', () => {
  expect(actions.syncAuthUser({
    name: 'test'
  })).toEqual({
    type: ActionTypes.AUTH_USER_SYNC,
    user: { name: 'test' }
  })
})

it('creates action to sign out a user', () => {
  expect(actions.signOut()).toEqual({
    type: ActionTypes.SIGN_OUT
  })
})

it('selects user from state', () => {
  expect(selectors.getUser({auth: initialState})).toEqual(null)
})

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('handles AUTH_USER_SYNC action', () => {
  expect(reducer({}, {
    type: ActionTypes.AUTH_USER_SYNC,
    user: { name: 'test' }
  })).toEqual({
    user: { name: 'test' }
  })
})