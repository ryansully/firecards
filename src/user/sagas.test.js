import { all, call, put, take, takeEvery } from 'redux-saga/effects'
import { reduxSagaFirebase } from '../firebase'
import { actions } from './dux'
import { ActionTypes as authActionTypes } from '../auth/dux'
import root, { channels, sagas } from './sagas'

describe('closeCurrentUser saga', () => {
  const data = {}
  data.gen = sagas.closeCurrentUser()
  data.noChannel = sagas.closeCurrentUser()

  it('does nothing if there is no current user channel', () => {
    expect(data.noChannel.next()).toEqual({
      value: undefined,
      done: true,
    })
  })

  const close = jest.fn()

  it('dispatches an action to sync the current user with null', () => {
    channels.currentUser = {close}
    expect(data.gen.next().value)
      .toEqual(put(actions.syncCurrentUser(null)))
  })

  it('closes the current user channel', () => {
    expect(close).toBeCalled()
  })
})

describe('watchCurrentUser saga', () => {
  const user = {uid: 'test'}
  const action = {user}
  const data = {}
  data.gen = sagas.watchCurrentUser(action)
  data.noAuthUser = sagas.watchCurrentUser({user: null})

  it('closes the current user channel if there is no auth user', () => {
    expect(data.noAuthUser.next().value).toEqual(call(sagas.closeCurrentUser))
  })

  it('calls reduxSagaFirebase.channel', () => {
    expect(data.gen.next({uid: 'test'}).value)
      .toEqual(call(reduxSagaFirebase.channel, 'users/test'))
  })

  const channel = reduxSagaFirebase.channel('users/test')

  it('waits for channel event', () => {
    expect(data.gen.next(channel).value).toEqual(take(channel))
  })

  it('dispatches an action to sync the current user', () => {
    expect(data.gen.next(user).value)
      .toEqual(put(actions.syncCurrentUser(user)))
  })
})

describe('root saga', () => {
  const generator = root()

  it('yields an array of sagas', () => {
    expect(generator.next().value).toEqual(all([
      takeEvery(authActionTypes.AUTH_USER_SYNC, sagas.watchCurrentUser),
    ]))
  })
})