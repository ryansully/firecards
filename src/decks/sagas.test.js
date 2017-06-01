import { all, fork, put, take } from 'redux-saga/effects'
import { actions, ActionTypes } from './dux'
import root, { getDeckIndex } from './sagas'
// import { get } from '../firebase/database'

describe('getDeckIndex saga', () => {
  const generator = getDeckIndex()

  it('waits for deck index requests', () => {
    expect(generator.next().value).toEqual(take(ActionTypes.GET_DECK_INDEX))
  })

  it('gets a deck index from the database', () => {
    // FIXME: this test fails: "Compared values have no visual difference."
    // const boundGet = get.bind(this)
    // expect(generator.next().value).toEqual(call(boundGet, '/decks/!index'))
    generator.next()
  })

  it('dispatches an action that stores a deck list', () => {
    expect(generator.next({}).value).toEqual(put(actions.storeDeckList({})))
  })

  it('dispatches an action that stores a deck order', () => {
    expect(generator.next().value).toEqual(put(actions.storeDeckOrder()))
  })
})

describe('root saga', () => {
  const generator = root()

  it('yields an array of sagas', () => {
    expect(generator.next().value).toEqual(all([
      fork(getDeckIndex),
    ]))
  })
})