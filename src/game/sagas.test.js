import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import firebase, { reduxSagaFirebase } from '../firebase'
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
  const decks = ['test']
  let newGame = {name: 'test', decks}
  let newGameNoName = {name: '', decks}
  const action = {newGame}
  const data = {}
  data.gen = cloneableGenerator(sagas.createGame)(action)
  data.noName = sagas.createGame({newGame: newGameNoName})

  it('exits if there is no game in action', () => {
    data.noGame = sagas.createGame({newGame: null})
    expect(data.noGame.next()).toEqual({
      value: undefined,
      done: true
    })
  })

  it('calls closeCurrentGame saga', () => {
    expect(data.gen.next().value).toEqual(call(sagas.closeCurrentGame))
    expect(data.noName.next().value).toEqual(call(sagas.closeCurrentGame))
  })

  it('selects auth user from state', () => {
    expect(data.gen.next().value)
      .toEqual(select(authSelectors.getAuthUser))
    expect(data.noName.next().value)
      .toEqual(select(authSelectors.getAuthUser))
  })

  const authUser = {
    uid: 'uid',
    displayName: 'Testy McTestface'
  }

  newGame = {
    ...newGame,
    host: authUser.uid,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  }

  newGameNoName = {
    ...newGame,
    name: `${authUser.displayName}'s Game`
  }

  it('calls reduxSagaFirebase.create to push new game', () => {
    expect(data.gen.next(authUser).value)
      .toEqual(call(reduxSagaFirebase.create, 'games', newGame))
    expect(data.noName.next(authUser).value)
      .toEqual(call(reduxSagaFirebase.create, 'games', newGameNoName))
  })

  const key = 'game_key'

  it('dispatches action to store a newly created game', () => {
    expect(data.gen.next(key).value)
      .toEqual(put(actions.createGameSuccess({...newGame, key})))
  })

  const error = Error('test')

  it('dispatches action when game creation error is thrown', () => {
    expect(data.gen.throw(error).value)
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
    data.noCurrentGame = data.gen.clone()
    expect(data.gen.next(currentGame).value)
      .toEqual(call(reduxSagaFirebase.channel, 'games/' + currentGame.key))
    expect(data.noCurrentGame.next().value)
      .toEqual(call(reduxSagaFirebase.channel, 'games/' + action.gameKey))
  })

  const channel = reduxSagaFirebase.channel('games/test')

  it('waits for channel event', () => {
    expect(data.gen.next(channel).value).toEqual(take(channel))
    expect(data.noCurrentGame.next(channel).value).toEqual(take(channel))
  })

  it('dispatches action to sync current game with database', () => {
    expect(data.gen.next().value).toEqual(put(actions.syncCurrentGame({
      key: currentGame.key
    })))
    expect(data.noCurrentGame.next().value)
      .toEqual(put(actions.syncCurrentGame({key: action.gameKey})))
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