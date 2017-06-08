import { all, call, fork, put, select, take, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { reduxSagaFirebase } from '../firebase'
import root, { sagas } from './sagas'
import { actions } from './dux'
import { ActionTypes as authActionTypes, selectors as authSelectors } from '../auth/dux'

describe('watchUser saga', () => {
  const data = {}
  data.gen = cloneableGenerator(sagas.watchUser)()

  it('selects auth user from state', () => {
    expect(data.gen.next().value).toEqual(select(authSelectors.getUser))
  })

  it('exits if there is no auth user', () => {
    data.noAuthUser = data.gen.clone()
    expect(data.noAuthUser.next()).toEqual({
      value: undefined,
      done: true
    })
  })

  it('calls reduxSagaFirebase.channel', () => {
    expect(data.gen.next({uid: 'test'}).value)
      .toEqual(call(reduxSagaFirebase.channel, 'users/test'))
  })

  const channel = reduxSagaFirebase.channel('users/test')

  it('waits for channel event', () => {
    expect(data.gen.next(channel).value).toEqual(take(channel))
  })

  const user = {name: 'test'}

  it('dispatches an action that stores the user', () => {
    expect(data.gen.next(user).value).toEqual(put(actions.getUserSuccess(user)))
  })
})

describe('root saga', () => {
  const generator = root()

  it('yields an array of sagas', () => {
    expect(generator.next().value).toEqual(all([
      fork(sagas.watchUser),
      takeEvery(authActionTypes.AUTH_USER_SUCCESS, sagas.watchUser),
    ]))
  })
})