import { all, call, fork, put, select, take, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { reduxSagaFirebase } from '../firebase'
import { actions, ActionTypes, selectors } from './dux'
import root, { sagas } from './sagas'

describe('authUser saga', () => {
  const user = {name: 'test'}
  const action = actions.authUserRequest(user)
  const data = {}
  data.gen = cloneableGenerator(sagas.authUser)(action)

  it('selects auth user from state', () => {
    expect(data.gen.next().value).toEqual(select(selectors.getUser))
  })

  it('dispatches a auth success action if user is not already stored', () => {
    data.clone = data.gen.clone()
    expect(data.gen.next(null).value)
      .toEqual(put(actions.authUserSuccess(user)))
  })

  it('exits if user is already stored', () => {
    expect(data.clone.next(user)).toEqual({
      value: undefined,
      done: true
    })
  })
})

describe('signOut saga', () => {
  const data = {}
  data.gen = cloneableGenerator(sagas.signOut)()

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

  it('exits if user is not stored', () => {
    expect(data.clone.next(null)).toEqual({
      value: undefined,
      done: true
    })
  })
})

describe('watchAuthStateChange saga', () => {
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

  it('calls authUser saga', () => {
    data.clone = data.gen.clone()
    expect(data.gen.next({user}).value).toEqual(call(sagas.authUser, {user}))
  })

  it('calls signOut saga', () => {
    expect(data.clone.next({user: null}).value).toEqual(call(sagas.signOut))
  })
})

describe('root saga', () => {
  const generator = root()

  it('yields an array of sagas', () => {
    expect(generator.next().value).toEqual(all([
      takeEvery(ActionTypes.AUTH_USER_REQUEST, sagas.authUser),
      takeEvery(ActionTypes.SIGN_OUT_REQUEST, sagas.signOut),
      fork(sagas.watchAuthStateChange),
    ]))
  })
})