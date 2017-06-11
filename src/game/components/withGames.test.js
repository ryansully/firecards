import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import withGames from './withGames'
import { actions as gameActions, initialState } from '../dux'

const mockStore = configureStore()
let store

const state = {
  auth: {authUser: null},
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
    expect(props.authUser).toEqual(null)
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
  const authUser = {uid: 'uid'}
  store = mockStore({
    ...state,
    auth: {authUser},
  })
  const WrappedComponent = withGames(props => null)

  mount(
    <Provider store={store}>
      <WrappedComponent />
    </Provider>
  )

  const actions = store.getActions()
  expect(actions.length).toEqual(1)
  expect(actions[0]).toEqual(gameActions.loadMyGames(authUser))
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