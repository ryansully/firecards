import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import withDecks from './withDecks'
import { actions as decksActions } from '../../decks/dux'

const mockStore = configureStore()
let store

beforeEach(() => {
  store = mockStore({decks: {deckList: null}})
})

it('renders without crashing', () => {
  shallow(<withDecks />)
})

it('renders a wrapped component with props', () => {
  const PropsChecker = withDecks((props) => {
    expect(props.deckList).toEqual(null)
    return null
  })

  mount(
    <Provider store={store}>
      <PropsChecker />
    </Provider>
  )
})

it('dispatches a deck index request action when deckList is falsy', () => {
  const PropsChecker = withDecks(props => null)

  mount(
    <Provider store={store}>
      <PropsChecker />
    </Provider>
  )

  const actions = store.getActions()
  expect(actions.length).toEqual(1)
  expect(actions[0]).toEqual(decksActions.fetchDeckIndex())
})

it('does not dispatch a deck index request action when deckList exists', () => {
  store = mockStore({decks: {deckList: {}}})
  const PropsChecker = withDecks((props) => {
    expect(props.deckList).toEqual({})
    return null
  })

  mount(
    <Provider store={store}>
      <PropsChecker />
    </Provider>
  )

  expect(store.getActions().length).toEqual(0)
})