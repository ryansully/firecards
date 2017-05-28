import React from 'react'
import { shallow, mount } from 'enzyme'
import FirebaseUIAuth from './FirebaseUIAuth'

const ui = () => ({
  start: jest.fn(),
  reset: jest.fn()
})

it('renders without crashing', () => {
  shallow(<FirebaseUIAuth />)
})

it('starts a UI object after mounting', () => {
  const uiInstance = ui()
  const wrapper = mount(<FirebaseUIAuth ui={uiInstance} />)
  expect(wrapper.instance().ui).toEqual(uiInstance)
  expect(uiInstance.start).toBeCalled()
})

it('resets the UI object after unmounting', () => {
  const uiInstance = ui()
  const wrapper = mount(<FirebaseUIAuth ui={uiInstance} />)
  wrapper.unmount()
  expect(uiInstance.reset).toBeCalled()
})