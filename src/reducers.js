import { combineReducers } from 'redux'
import auth from './auth/dux'
import decks from './decks/dux'
import game from './game/dux'
import user from './user/dux'

export default combineReducers({
  auth,
  decks,
  game,
  user,
})