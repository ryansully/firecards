import reducer, { actions, ActionTypes, selectors, initialState } from './dux'

const newGame = {name: 'test'}
const currentGame = {key: 'game_key'}
const gameCreateError = Error('test')

it('creates action to close the current game', () => {
  expect(actions.closeCurrentGame()).toEqual({
    type: ActionTypes.CURRENT_GAME_CLOSE
  })
})

it('creates action to request a created game', () => {
  expect(actions.createGameRequest(newGame)).toEqual({
    type: ActionTypes.GAME_CREATE_REQUEST,
    newGame
  })
})

it('creates action to store a newly created game', () => {
  expect(actions.createGameSuccess(currentGame)).toEqual({
    type: ActionTypes.GAME_CREATE_SUCCESS,
    currentGame
  })
})

it('creates action to handle game creation error', () => {
  expect(actions.createGameError(gameCreateError)).toEqual({
    type: ActionTypes.GAME_CREATE_ERROR,
    gameCreateError
  })
})

it('creates action to load a game', () => {
  expect(actions.loadCurrentGame(currentGame.key)).toEqual({
    type: ActionTypes.CURRENT_GAME_LOAD,
    gameKey: currentGame.key
  })
})

it('creates action to sync the current game', () => {
  expect(actions.syncCurrentGame(currentGame)).toEqual({
    type: ActionTypes.CURRENT_GAME_SYNC,
    currentGame
  })
})

it('selects current game from state', () => {
  expect(selectors.getCurrentGame({game: initialState})).toEqual(null)
})

it('selects game create error from state', () => {
  expect(selectors.getGameCreateError({game: initialState})).toEqual(null)
})

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('handles CURRENT_GAME_CLOSE action', () => {
  expect(reducer({}, {
    type: ActionTypes.CURRENT_GAME_CLOSE
  })).toEqual({
    currentGame: null
  })
})

it('handles CURRENT_GAME_SYNC action', () => {
  expect(reducer({}, {
    type: ActionTypes.CURRENT_GAME_SYNC,
    currentGame
  })).toEqual({currentGame})
})

it('handles GAME_CREATE_SUCCESS action', () => {
  expect(reducer({}, {
    type: ActionTypes.GAME_CREATE_SUCCESS,
    currentGame
  })).toEqual({currentGame})
})

it('handles GAME_CREATE_ERROR action', () => {
  expect(reducer({}, {
    type: ActionTypes.GAME_CREATE_ERROR,
    gameCreateError
  })).toEqual({gameCreateError})
})