import reducer, { actions, ActionTypes, selectors, initialState } from './dux'

it('creates action to sync auth user', () => {
  expect(actions.syncAuthUser({
    name: 'test'
  })).toEqual({
    type: ActionTypes.AUTH_USER_SYNC,
    authUser: { name: 'test' }
  })
})

it('creates action to sign out auth user', () => {
  expect(actions.signOut()).toEqual({
    type: ActionTypes.SIGN_OUT
  })
})

it('selects auth user from state', () => {
  expect(selectors.getAuthUser({auth: initialState})).toEqual(null)
})

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('handles AUTH_USER_SYNC action', () => {
  expect(reducer({}, {
    type: ActionTypes.AUTH_USER_SYNC,
    authUser: { name: 'test' }
  })).toEqual({
    authUser: { name: 'test' }
  })
})