import { buffers } from 'redux-saga'
import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import firebase, { reduxSagaFirebase, firebaseSagaHelper } from '../firebase'
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

describe('closeMyGames saga', () => {
  const data = {}
  data.gen = sagas.closeMyGames()
  data.noChannel = sagas.closeMyGames()

  it('does nothing if there is no myGames channel', () => {
    expect(data.noChannel.next()).toEqual({
      value: undefined,
      done: true,
    })
  })

  const close = jest.fn()

  it('dispatches an action to sync myGames with null', () => {
    channels.myGames = {close}
    expect(data.gen.next().value)
      .toEqual(put(actions.syncMyGames(null)))
  })

  it('closes the current game channel', () => {
    expect(close).toBeCalled()
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

  const gameKey = 'game_key'

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

describe('updateLastPlayed saga', () => {
  const action = {
    authUid: 'uid',
    gameKey: 'game_key',
  }
  const generator = sagas.updateLastPlayed(action)

  const path = `users/${action.authUid}/games/${action.gameKey}`

  it('calls reduxSagaFirebase.update to update last played timestamp', () => {
    expect(generator.next().value).toEqual(call(reduxSagaFirebase.update, path,
      {lastPlayedAt: firebase.database.ServerValue.TIMESTAMP}
    ))
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

describe('watchMyGames saga', () => {
  const authUser = {uid: 'uid'}
  const action = {authUser}
  const data = {}
  data.gen = sagas.watchMyGames(action)
  data.noAuthUser = sagas.watchMyGames({authUser: null})

  const path = `users/${authUser.uid}/games`

  it('calls sagas.closeMyGames if there is no auth user', () => {
    expect(data.noAuthUser.next().value).toEqual(call(sagas.closeMyGames))
  })

  it('calls custom channel', () => {
    const nextValue = data.gen.next().value
    expect(nextValue.CALL.fn).toEqual(firebaseSagaHelper.channel)
    expect(nextValue.CALL.args[0]).toEqual(path)
    expect(nextValue.CALL.args[1]).toEqual('child_added')
  })

  const channel = firebaseSagaHelper.channel(path, 'child_added', true,
    buffers.expanding())

  it('waits for channel event', () => {
    expect(data.gen.next(channel).value).toEqual(take(channel))
  })

  const gameKey = 'game_key'
  const snapshot = {key: gameKey}

  it('calls getGame saga to get game by gameKey', () => {
    expect(data.gen.next({snapshot}).value)
      .toEqual(call(sagas.getGame, gameKey))
  })

  const game = {name: 'test'}

  it('selects my games from state', () => {
    expect(data.gen.next(game).value).toEqual(select(selectors.getMyGames))
  })

  const myGames = []

  it('dispatches an action to sync myGames', () => {

    expect(data.gen.next(myGames).value).toEqual(put(actions.syncMyGames([
      {gameKey, name: game.name},
      ...myGames,
    ])))
  })
})

describe('root saga', () => {
  const generator = root()

  it('yields an array of sagas', () => {
    expect(generator.next().value).toEqual(all([
      takeEvery(ActionTypes.CURRENT_GAME_LOAD, sagas.loadCurrentGame),
      takeEvery(ActionTypes.GAME_CREATE_REQUEST, sagas.createGame),
      takeEvery(ActionTypes.GAME_CREATE_SUCCESS, sagas.watchCurrentGame),
      takeEvery(ActionTypes.LAST_PLAYED_UPDATE, sagas.updateLastPlayed),
      takeEvery(ActionTypes.MY_GAMES_LOAD, sagas.watchMyGames),
  ]))
  })
})