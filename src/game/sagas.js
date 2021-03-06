import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'
import firebase, { reduxSagaFirebase } from '../firebase'
import { actions, ActionTypes, selectors } from './dux'
import { selectors as authSelectors } from '../auth/dux'
import { selectors as userSelectors } from '../user/dux'

export const channels = {
  currentGame: null,
  myGames: null,
}

export function* closeCurrentGame() {
  if (channels.currentGame) {
    channels.currentGame.close()
    yield put(actions.syncCurrentGame(null))
  }
}

export function* closeMyGames() {
  if (channels.myGames) {
    channels.myGames.close()
    yield put(actions.syncMyGames(null))
  }
}

export function* createGame(action) {
  let { newGame } = action
  if (!newGame) { return }

  // stop listening to current game changes
  yield call(sagas.closeCurrentGame)

  const authUser = yield select(authSelectors.getAuthUser)
  newGame = {
    ...newGame,
    // default to auth user's name if no game name was provided
    name: newGame.name || `${authUser.displayName}'s Game`,
    host: authUser.uid,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  }
  try {
    const gameKey = yield call(reduxSagaFirebase.database.create, 'games',
      newGame)
    yield put(actions.createGameSuccess({...newGame, gameKey}))
  } catch (error) {
    yield put(actions.createGameError(error))
  }
}

export function* getGame(gameKey) {
  const path = 'games/' + gameKey
  return yield call(reduxSagaFirebase.database.read, path)
}

export function* loadCurrentGame(action) {
  try {
    let currentGame = yield select(selectors.getCurrentGame)

    if (currentGame) {
      // stop listening to current game changes
      yield call(sagas.closeCurrentGame)
    }

    currentGame = yield call(sagas.getGame, action.gameKey)
    currentGame.gameKey = action.gameKey

    // sync current game to state
    yield put(actions.syncCurrentGame(currentGame))
    yield call(sagas.watchCurrentGame, {currentGame})
  } catch (error) {
    yield put(actions.loadCurrentGameError(error))
  }
}

export function* loadMyGames() {
  let [...myGames] = yield select(selectors.getMyGames)

  // exit if already loaded
  if (myGames.length) { return }

  const userGames = yield select(userSelectors.getUserGames)

  // sync My Games to state
  yield call(sagas.mapUserGamesToMyGames, userGames)
  yield call(sagas.watchMyGames)
}

export function* mapUserGamesToMyGames(userGames) {
  const authUser = yield select(authSelectors.getAuthUser)
  const myGames = []

  for (const gameKey in userGames) {
    const game = yield call(sagas.getGame, gameKey)
    if (game) {
      myGames.push({
        gameKey,
        name: game.name,
        lastPlayedAt: userGames[gameKey].lastPlayedAt,
      })
    } else if (authUser) {
      // game was deleted, so remove from user's games
      const deletePath = `users/${authUser.uid}/games/${gameKey}`
      yield call(reduxSagaFirebase.database.delete, deletePath)
    }
  }
  yield put(actions.syncMyGames(myGames))
}

export function* updateLastPlayed(action) {
  const path = `users/${action.authUid}/games/${action.gameKey}`
  return yield call(reduxSagaFirebase.database.update, path, {
    lastPlayedAt: firebase.database.ServerValue.TIMESTAMP,
  })
}

export function* watchCurrentGame(action) {
  const { currentGame } = action
  const { gameKey } = currentGame
  const path = 'games/' + gameKey
  channels.currentGame = yield call(reduxSagaFirebase.database.channel, path)

  while (true) {
    const { value } = yield take(channels.currentGame)
    yield put(actions.syncCurrentGame({...value, gameKey}))
  }
}

export function* watchMyGames() {
  const authUser = yield select(authSelectors.getAuthUser)
  if (authUser) {
    const path = `users/${authUser.uid}/games`
    channels.myGames = yield call(reduxSagaFirebase.database.channel, path)

    while (true) {
      const { value } = yield take(channels.myGames)
      yield call(sagas.mapUserGamesToMyGames, value)
    }
  } else {
    yield call(sagas.closeMyGames)
  }
}

export const sagas = {
  closeCurrentGame,
  closeMyGames,
  createGame,
  getGame,
  loadCurrentGame,
  loadMyGames,
  mapUserGamesToMyGames,
  updateLastPlayed,
  watchCurrentGame,
  watchMyGames,
}

export default function* root() {
  yield all([
    takeEvery(ActionTypes.CURRENT_GAME_LOAD, sagas.loadCurrentGame),
    takeEvery(ActionTypes.GAME_CREATE_REQUEST, sagas.createGame),
    takeEvery(ActionTypes.GAME_CREATE_SUCCESS, sagas.watchCurrentGame),
    takeEvery(ActionTypes.LAST_PLAYED_UPDATE, sagas.updateLastPlayed),
    takeEvery(ActionTypes.MY_GAMES_LOAD, sagas.loadMyGames),
  ])
}