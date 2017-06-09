import { all, call, put, select, take, takeEvery } from 'redux-saga/effects'
import firebase, { reduxSagaFirebase } from '../firebase'
import { actions, ActionTypes, selectors } from './dux'
import { selectors as authSelectors } from '../auth/dux'

export const channels = {
  currentGame: null
}

export function* closeCurrentGame() {
  if (!channels.currentGame) { return }
  channels.currentGame.close()
  yield put(actions.closeCurrentGame())
}

export function* createGame(action) {
  let { newGame } = action
  if (!newGame) { return }

  // stop listening to current game changes
  yield call(sagas.closeCurrentGame)

  const authUser = yield select(authSelectors.getUser)
  newGame = {
    ...newGame,
    // default to auth user's name if no game name was provided
    name: newGame.name || `${authUser.displayName}'s Game`,
    host: authUser.uid,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  }
  try {
    const key = yield call(reduxSagaFirebase.create, 'games', newGame)
    yield put(actions.createGameSuccess({...newGame, key}))
  } catch (error) {
    yield put(actions.createGameError(error))
  }
}

export function* watchCurrentGame(action) {
  let currentGame = yield select(selectors.getCurrentGame)

  if (!currentGame) {
    // use game from game key in action
    currentGame = {key: action.gameKey}
  }

  const path = 'games/' + currentGame.key
  channels.currentGame = yield call(reduxSagaFirebase.channel, path)

  while (true) {
    const game = yield take(channels.currentGame)
    yield put(actions.syncCurrentGame({...game, key: currentGame.key}))
  }
}

export const sagas = {
  closeCurrentGame,
  createGame,
  watchCurrentGame,
}

export default function* root() {
  yield all([
    takeEvery(ActionTypes.GAME_CREATE_REQUEST, sagas.createGame),
    takeEvery(ActionTypes.GAME_CREATE_SUCCESS, sagas.watchCurrentGame),
    takeEvery(ActionTypes.CURRENT_GAME_LOAD, sagas.watchCurrentGame),
  ])
}