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

it('dispatches a game load action when currentGame is falsy', () => {
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

it('does not dispatch a game load action when currentGame exists', () => {
  store = mockStore({game: {currentGame: {}}})
  const PropsChecker = withCurrentGame((props) => {
    expect(props.currentGame).toEqual({})
    return null
  })

  mount(
    <Provider store={store}>
      <PropsChecker />
    </Provider>
  )

  expect(store.getActions().length).toEqual(0)
})