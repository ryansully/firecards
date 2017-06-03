import { combineReducers } from 'redux'
import auth from './auth/dux'
import decks from './decks/dux'

export default combineReducers({
  auth,
  decks,
})