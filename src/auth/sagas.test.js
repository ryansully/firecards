import { all, call, fork, put, take } from 'redux-saga/effects'
import { auth } from '../firebase'
import { actions, ActionTypes } from './dux'
import root, { authUser, signOut } from './sagas'

describe('authUser saga', () => {
  const user = {name: 'test'}
  const generator = authUser()

  it('waits for auth requests', () => {
    expect(generator.next().value).toEqual(take(ActionTypes.AUTH_USER_REQUEST))
  })

  it('dispatches a auth success action', () => {
    expect(generator.next(actions.authUserRequest(user)).value).toEqual(put(actions.authUserSuccess(user)))
  })
})

describe('signOut saga', () => {
  const generator = signOut()

  it('waits for sign out requests', () => {
    expect(generator.next().value).toEqual(take(ActionTypes.SIGN_OUT_REQUEST))
  })

  it('calls auth.signOut', () => {
    expect(generator.next().value).toEqual(call([auth, auth.signOut]))
  })

  it('dispatches a sign out success action', () => {
    expect(generator.next().value).toEqual(put(actions.signOutSuccess()))
  })
})

describe('root saga', () => {
  const generator = root()

  it('yields an array of sagas', () => {
    expect(generator.next().value).toEqual(all([
      fork(authUser),
      fork(signOut),
    ]))
  })
})