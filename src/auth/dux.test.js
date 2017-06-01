import reducer, { actions, ActionTypes, initialState } from './dux'

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('creates actions to authenticate a user', () => {
  expect(actions.authUserRequest({
    name: 'test'
  })).toEqual({
    type: ActionTypes.AUTH_USER_REQUEST,
    user: { name: 'test' }
  })
  expect(actions.authUserSuccess({
    name: 'test'
  })).toEqual({
    type: ActionTypes.AUTH_USER_SUCCESS,
    user: { name: 'test' }
  })
})

it('creates actions to sign out a user', () => {
  expect(actions.signOutRequest()).toEqual({
    type: ActionTypes.SIGN_OUT_REQUEST
  })
  expect(actions.signOutSuccess()).toEqual({
    type: ActionTypes.SIGN_OUT_SUCCESS
  })
})

it('handles AUTH_USER action', () => {
  expect(reducer({}, {
    type: ActionTypes.AUTH_USER_SUCCESS,
    user: { name: 'test' }
  })).toEqual({
    user: { name: 'test' }
  })
})

it('handles SIGN_OUT action', () => {
  expect(reducer({}, {
    type: ActionTypes.SIGN_OUT_SUCCESS
  })).toEqual({
    user: null
  })
})