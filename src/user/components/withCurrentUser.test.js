import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import withCurrentUser from './withCurrentUser'
import { initialState } from '../dux'

const mockStore = configureStore()
let store

beforeEach(() => {
  store = mockStore({user: initialState})
})

it('renders without crashing', () => {
  shallow(<withCurrentUser />)
})

it('renders a wrapped component with props', () => {
  const PropsChecker = withCurrentUser((props) => {
    expect(props.currentUser).toEqual(null)
    return null
  })

  mount(
    <Provider store={store}>
      <PropsChecker />
    </Provider>
  )
})