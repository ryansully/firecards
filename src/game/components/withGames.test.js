import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import withGames from './withGames'
import { actions as gameActions, initialState } from '../dux'

const mockStore = configureStore()
let store

const state = {
  user: {currentUser: null},
  game: initialState,
}

beforeEach(() => {
  store = mockStore(state)
})

it('renders without crashing', () => {
  shallow(<withGames />)
})

it('renders a wrapped component with props', () => {
  const PropsChecker = withGames((props) => {
    expect(props.currentUser).toEqual(null)
    expect(props.myGames).toEqual([])
    return null
  })

  mount(
    <Provider store={store}>
      <PropsChecker />
    </Provider>
  )
})

it('dispatches an action to load my games', () => {
  const currentUser = {games: {}}
  store = mockStore({
    ...state,
    user: {currentUser},
  })
  const WrappedComponent = withGames(props => null)

  mount(
    <Provider store={store}>
      <WrappedComponent />
    </Provider>
  )

  const actions = store.getActions()
  expect(actions.length).toEqual(1)
  expect(actions[0]).toEqual(gameActions.loadMyGames(currentUser))
})

it('does not dispatch action to load my games when myGames has length', () => {
  const myGames = ['game']
  store = mockStore({
    ...state,
    game: {myGames},
  })
  const PropsChecker = withGames((props) => {
    expect(props.myGames).toEqual(myGames)
    return null
  })

  mount(
    <Provider store={store}>
      <PropsChecker />
    </Provider>
  )

  expect(store.getActions().length).toEqual(0)
})