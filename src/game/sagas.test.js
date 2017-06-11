import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import firebase, { reduxSagaFirebase } from '../firebase'
import root, { sagas, channels } from './sagas'
import { actions, ActionTypes, selectors } from './dux'
import { selectors as authSelectors } from '../auth/dux'

describe('closeCurrentGame saga', () => {
  const data = {}
  data.gen = sagas.closeCurrentGame()
  data.noChannel = sagas.closeCurrentGame()

  it('does nothing if there is no current game channel', () => {
    expect(data.noChannel.next()).toEqual({
      value: undefined,
      done: true,
    })
  })

  const close = jest.fn()

  it('dispatches an action to sync the current game with null', () => {
    channels.currentGame = {close}
    expect(data.gen.next().value)
      .toEqual(put(actions.syncCurrentGame(null)))
  })

  it('closes the current game channel', () => {
    expect(close).toBeCalled()
  })
})

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
    expect(data.gen.next(gameKey).value)
      .toEqual(put(actions.createGameSuccess({...newGame, gameKey})))
  })

  const error = Error('test')

  it('dispatches action when game creation error is thrown', () => {
    expect(data.gen.throw(error).value)
      .toEqual(put(actions.createGameError(error)))
  })
})

describe('getGame saga', () => {
  const gameKey = 'game_key'
  const path = 'games/' + gameKey
  const generator = sagas.getGame(gameKey)

  it('calls reduxSagaFirebase.get to get game by gameKey', () => {
    expect(generator.next().value).toEqual(call(reduxSagaFirebase.get, path))
  })
})

describe('loadCurrentGame saga', () => {
  const gameKey = 'game_key'
  const action = {gameKey}
  const data = {}
  data.gen = cloneableGenerator(sagas.loadCurrentGame)(action)

  it('selects current game from state', () => {
    expect(data.gen.next().value).toEqual(select(selectors.getCurrentGame))
  })

  const currentGame = {gameKey}

  it('closes the current game first if there is one', () => {
    data.currentGame = data.gen.clone()
    expect(data.currentGame.next(currentGame).value)
      .toEqual(call(sagas.closeCurrentGame))
  })

  it('calls getGame saga to get game by gameKey', () => {
    expect(data.gen.next().value).toEqual(call(sagas.getGame, action.gameKey))
  })

  it('dispatches action to sync current game with database', () => {
    expect(data.gen.next(currentGame).value)
      .toEqual(put(actions.syncCurrentGame(currentGame)))
  })

  it('calls watchCurrentGame saga to watch for changes to current game', () => {
    expect(data.gen.next().value)
      .toEqual(call(sagas.watchCurrentGame, {currentGame}))
  })

  const error = Error('test')

  it('dispatches action when game creation error is thrown', () => {
    expect(data.gen.throw(error).value)
      .toEqual(put(actions.loadCurrentGameError(error)))
  })
})

describe('watchCurrentGame saga', () => {
  const gameKey = 'game_key'
  const currentGame = {gameKey}
  const action = {currentGame}
  const generator = sagas.watchCurrentGame(action)

  it('calls reduxSagaFirebase.channel', () => {
    expect(generator.next(currentGame).value)
      .toEqual(call(reduxSagaFirebase.channel, 'games/' + gameKey))
  })

  const channel = reduxSagaFirebase.channel('games/test')

  it('waits for channel event', () => {
    expect(generator.next(channel).value).toEqual(take(channel))
  })

  it('dispatches action to sync current game with database', () => {
    expect(generator.next().value).toEqual(put(actions.syncCurrentGame({
      gameKey
    })))
  })
})
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