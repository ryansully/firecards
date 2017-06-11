import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import withCurrentGame from './withCurrentGame'
import { actions as gameActions, initialState } from '../../game/dux'

const match = {
  params: {
    game_key: 'game_key'
  }
}
const mockStore = configureStore()
let store

beforeEach(() => {
  store = mockStore({game: initialState})
})

it('renders without crashing', () => {
  shallow(<withCurrentGame />)
})

it('renders a wrapped component with props', () => {
  const PropsChecker = withCurrentGame((props) => {
    expect(props.currentGame).toEqual(null)
    return null
  })

  mount(
    <Provider store={store}>
      <PropsChecker match={match} />
    </Provider>
  )
})

it('does not dispatch game load action if there is no route param', () => {
  const WrappedComponent = withCurrentGame(props => null)

  mount(
    <Provider store={store}>
      <WrappedComponent />
    </Provider>
  )

  const actions = store.getActions()
  expect(actions.length).toEqual(0)
})

it('does not dispatch if current game has matching key from params', () => {
  const currentGame = {gameKey: 'game_key'}
  store = mockStore({game: {
    ...initialState,
    currentGame
  }})
  const WrappedComponent = withCurrentGame(props => null)

  mount(
    <Provider store={store}>
      <WrappedComponent match={match} />
    </Provider>
  )

  const actions = store.getActions()
  expect(actions.length).toEqual(0)
})

it('dispatches a game load action from route param', () => {
  const WrappedComponent = withCurrentGame(props => null)

  mount(
    <Provider store={store}>
      <WrappedComponent match={match} />
    </Provider>
  )

  const actions = store.getActions()
  expect(actions.length).toEqual(1)
  expect(actions[0]).toEqual(gameActions.loadCurrentGame('game_key'))
})