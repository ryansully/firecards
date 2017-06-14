import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects'
import { reduxSagaFirebase } from '../firebase'
import { actions, ActionTypes } from './dux'
import root, { sagas } from './sagas'

describe('signOut saga', () => {
  const generator = sagas.signOut()

  it('calls reduxSagaFirebase.auth.signOut', () => {
    expect(generator.next().value).toEqual(call(reduxSagaFirebase.auth.signOut))
  })
})

describe('watchAuthStateChange saga', () => {
  const generator = sagas.watchAuthStateChange()

  it('calls reduxSagaFirebase.auth.channel', () => {
    expect(generator.next().value).toEqual(call(reduxSagaFirebase.auth.channel))
  })

  const channel = reduxSagaFirebase.auth.channel()

  it('waits for channel event', () => {
    expect(generator.next(channel).value).toEqual(take(channel))
  })

  const user = {name: 'test'}

  it('dispatches action to sync auth user', () => {
    expect(generator.next({user}).value)
      .toEqual(put(actions.syncAuthUser(user)))
  })
})

describe('root saga', () => {
  const generator = root()

  it('yields an array of sagas', () => {
    expect(generator.next().value).toEqual(all([
      fork(sagas.watchAuthStateChange),
      takeEvery(ActionTypes.SIGN_OUT, sagas.signOut),
    ]))
  })
})