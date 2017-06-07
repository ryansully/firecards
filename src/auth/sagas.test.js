import { all, call, fork, put, select, take } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { reduxSagaFirebase } from '../firebase'
import { actions, ActionTypes, selectors } from './dux'
import root, { sagas } from './sagas'

describe('authUser saga', () => {
  const user = {name: 'test'}
  const generator = sagas.authUser()

  it('waits for auth requests', () => {
    expect(generator.next().value).toEqual(take(ActionTypes.AUTH_USER_REQUEST))
  })

  const action = actions.authUserRequest(user)

  it('dispatches a auth success action', () => {
    expect(generator.next(action).value)
      .toEqual(put(actions.authUserSuccess(user)))
  })
})

describe('signOut saga', () => {
  const generator = sagas.signOut()

  it('waits for sign out requests', () => {
    expect(generator.next().value).toEqual(take(ActionTypes.SIGN_OUT_REQUEST))
  })

  it('calls reduxSagaFirebase.logout', () => {
    expect(generator.next().value).toEqual(call(reduxSagaFirebase.logout))
  })

  it('dispatches a sign out success action', () => {
    expect(generator.next().value).toEqual(put(actions.signOutSuccess()))
  })
})

describe('watchAuthStateChange saga', function () {
  const data = {}
  data.gen = cloneableGenerator(sagas.watchAuthStateChange)()

  it('calls reduxSagaFirebase.authChannel', () => {
    expect(data.gen.next().value).toEqual(call(reduxSagaFirebase.authChannel))
  })

  const channel = reduxSagaFirebase.authChannel()

  it('waits for channel event', () => {
    expect(data.gen.next(channel).value).toEqual(take(channel))
  })

  const user = {name: 'test'}

  it('selects auth user from state', () => {
    // clone generator to test null user from auth state change
    data.nullUser = data.gen.clone()
    expect(data.gen.next({user}).value).toEqual(select(selectors.getUser))
    expect(data.nullUser.next({user: null}).value)
      .toEqual(select(selectors.getUser))
  })

  it('dispatches an action to authenticate user if not already stored', () => {
    // clone generator from emitted user from auth state change
    data.storedUser = data.gen.clone()
    expect(data.gen.next(null).value)
      .toEqual(put(actions.authUserRequest(user)))

    // continue watching without dispatching action
    // if auth state change emits user and user is already stored
    expect(data.storedUser.next(user).value).toEqual(take(channel))
  })

  it('dispatches an action to sign out a user if already stored', () => {
    // clone generator from null user from auth state change
    data.unstoredUser = data.nullUser.clone()
    expect(data.nullUser.next(user).value)
      .toEqual(put(actions.signOutRequest()))

    // continue watching without dispatching action
    // if auth state change emits null and no user is already stored
    expect(data.unstoredUser.next(null).value).toEqual(take(channel))
  })
})

describe('root saga', () => {
  const generator = root()

  it('yields an array of sagas', () => {
    expect(generator.next().value).toEqual(all([
      fork(sagas.authUser),
      fork(sagas.signOut),
      fork(sagas.watchAuthStateChange),
    ]))
  })
})