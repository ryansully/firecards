import React from 'react'
import { shallow } from 'enzyme'
import { PlayGame } from './PlayGame'
import { PageContainer } from '../../components'

const currentGame = {
  name: 'test name',
  key: 'game_key',
}

it('renders without crashing', () => {
  shallow(<PlayGame />)
})

it('uses game name for page title', () => {
  const wrapper = shallow(<PlayGame currentGame={currentGame} />)
  const pageContainer = wrapper.find(PageContainer)
  expect(pageContainer.prop('pageTitle')).toEqual(currentGame.name)
})

it('updates last played timestamp for user game record', () => {
  const updateLastPlayed = jest.fn()
  const authUser = {uid: 'uid'}
  const wrapper = shallow(<PlayGame />)

  // simulate withCurrentGame HOC connection
  wrapper.setProps({currentGame, updateLastPlayed})
  expect(updateLastPlayed).not.toBeCalled()

  // simulate auth connection
  wrapper.setProps({authUser})
  expect(updateLastPlayed).toBeCalled()
})