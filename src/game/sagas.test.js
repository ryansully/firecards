import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { reduxSagaFirebase } from '../firebase'
import root, { sagas, channels } from './sagas'
import { actions, ActionTypes, selectors } from './dux'
import { selectors as authSelectors } from '../auth/dux'

describe('closeCurrentGame saga', () => {
  const data = {}
  data.gen = cloneableGenerator(sagas.closeCurrentGame)()
  data.noChannel = data.gen.clone()

  it('exits if the current game channel is null', () => {
    expect(data.noChannel.next()).toEqual({
      value: undefined,
      done: true
    })
  })

  it('dispatches an action that removes the current game from state', () => {
    channels.currentGame = {
      close: jest.fn()
    }
    expect(data.gen.next().value).toEqual(put(actions.closeCurrentGame()))
  })
})

describe('createGame saga', () => {
  const action = {decks: ['test']}
  const generator = sagas.createGame(action)

  it('calls closeCurrentGame saga', () => {
    expect(generator.next(action).value).toEqual(call(sagas.closeCurrentGame))
  })

  it('selects auth user from state', () => {
    expect(generator.next(action).value)
      .toEqual(select(authSelectors.getUser))
  })

  const authUser = {
    uid: 'uid'
  }

  const newGame = {
    host: authUser.uid,
    decks: action.decks,
  }

  it('calls reduxSagaFirebase.create to push new game', () => {
    expect(generator.next(authUser).value)
      .toEqual(call(reduxSagaFirebase.create, 'games', newGame))
  })

  const key = 'game_key'

  it('dispatches action to store a newly created game', () => {
    expect(generator.next(key).value)
      .toEqual(put(actions.createGameSuccess({...newGame, key})))
  })

  const error = Error('test')

  it('dispatches action when game creation error is thrown', () => {
    expect(generator.throw(error).value)
      .toEqual(put(actions.createGameError(error)))
  })

})

describe('watchCurrentGame saga', () => {
  const action = {gameKey: 'game_key'}
  const data = {}
  const currentGame = {key: 'current_game_key'}
  data.gen = cloneableGenerator(sagas.watchCurrentGame)(action)

  it('selects current game from state', () => {
    expect(data.gen.next().value).toEqual(select(selectors.getCurrentGame))
  })

  it('calls reduxSagaFirebase.channel', () => {
    data.clone = data.gen.clone()
    expect(data.gen.next().value)
      .toEqual(call(reduxSagaFirebase.channel, 'games/' + action.gameKey))
    expect(data.clone.next(currentGame).value)
      .toEqual(call(reduxSagaFirebase.channel, 'games/' + currentGame.key))
  })

  const channel = reduxSagaFirebase.channel('games/test')

  it('waits for channel event', () => {
    expect(data.gen.next(channel).value).toEqual(take(channel))
  })

  it('dispatches action to sync current game with database', () => {
    expect(data.gen.next().value).toEqual(put(actions.syncCurrentGame({
      key: action.gameKey
    })))
  })
})

describe('root saga', () => {
  const generator = root()

  it('yields an array of sagas', () => {
    expect(generator.next().value).toEqual(all([
      takeEvery(ActionTypes.GAME_CREATE_REQUEST, sagas.createGame),
      takeEvery(ActionTypes.GAME_CREATE_SUCCESS, sagas.watchCurrentGame),
      takeEvery(ActionTypes.CURRENT_GAME_LOAD, sagas.watchCurrentGame),
  ]))
  })
})