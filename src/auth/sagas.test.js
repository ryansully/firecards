import { all, call, fork, put, select, take } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { reduxSagaFirebase } from '../firebase'
import { actions, ActionTypes, selectors } from './dux'
import root, { sagas } from './sagas'

describe('authUser saga', () => {
  const user = {name: 'test'}
  const data = {}
  data.gen = cloneableGenerator(sagas.authUser)()

  it('waits for auth requests', () => {
    expect(data.gen.next().value).toEqual(take(ActionTypes.AUTH_USER_REQUEST))
  })

  const action = actions.authUserRequest(user)

  it('selects auth user from state', () => {
    expect(data.gen.next(action).value).toEqual(select(selectors.getUser))
  })

  it('dispatches a auth success action if user is not already stored', () => {
    data.clone = data.gen.clone()
    expect(data.gen.next(null).value)
      .toEqual(put(actions.authUserSuccess(user)))
  })

  it('continues watching with no action if user is already stored', () => {
    expect(data.clone.next(user).value)
      .toEqual(take(ActionTypes.AUTH_USER_REQUEST))
  })
})

describe('signOut saga', () => {
  const data = {}
  data.gen = cloneableGenerator(sagas.signOut)()

  it('waits for sign out requests', () => {
    expect(data.gen.next().value).toEqual(take(ActionTypes.SIGN_OUT_REQUEST))
  })

  it('calls reduxSagaFirebase.logout', () => {
    expect(data.gen.next().value).toEqual(call(reduxSagaFirebase.logout))
  })

  it('selects auth user from state', () => {
    expect(data.gen.next().value).toEqual(select(selectors.getUser))
  })

  const user = {name: 'test'}

  it('dispatches a sign out success action if user is stored', () => {
    data.clone = data.gen.clone()
    expect(data.gen.next(user).value).toEqual(put(actions.signOutSuccess()))
  })

  it('continues watching with no action if user is not stored', () => {
    expect(data.clone.next(null).value)
      .toEqual(take(ActionTypes.SIGN_OUT_REQUEST))
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

  it('dispatches an action to authenticate user', () => {
    // clone generator from emitted user from auth state change
    data.clone = data.gen.clone()
    expect(data.gen.next({user}).value)
      .toEqual(put(actions.authUserRequest(user)))
  })

  it('dispatches an action to sign out a user', () => {
    expect(data.clone.next({user: null}).value)
      .toEqual(put(actions.signOutRequest()))
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