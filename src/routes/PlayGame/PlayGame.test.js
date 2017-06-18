import React from 'react'
import { shallow } from 'enzyme'
import { PlayGame } from './PlayGame'
import { PageContainer } from '../../components'

const currentGame = {
  name: 'test name',
  gameKey: 'game_key',
}
const authUser = {uid: 'uid'}
let updateLastPlayed

beforeEach(() => {
  updateLastPlayed = jest.fn()
})

it('renders without crashing', () => {
  shallow(<PlayGame />)
})

it('uses game name for page title', () => {
  const wrapper = shallow(<PlayGame currentGame={currentGame} />)
  const pageContainer = wrapper.find(PageContainer)
  expect(pageContainer.prop('pageTitle')).toEqual(currentGame.name)
})

it('updates last played timestamp for user game record', () => {
  const wrapper = shallow(<PlayGame />)

  // simulate withCurrentGame HOC connection
  wrapper.setProps({currentGame, updateLastPlayed})
  expect(updateLastPlayed.mock.calls.length).toEqual(0)

  // simulate auth connection
  wrapper.setProps({authUser})
  expect(updateLastPlayed.mock.calls.length).toEqual(1)
  expect(updateLastPlayed.mock.calls[0])
    .toEqual([authUser.uid, currentGame.gameKey])
})

it('only updates timestamp once', () => {
  const wrapper = shallow(<PlayGame />)

  // simulate withCurrentGame HOC connection
  wrapper.setProps({currentGame, updateLastPlayed})
  expect(wrapper.state('lastPlayedUpdated')).toEqual(false)

  // simulate auth connection
  wrapper.setProps({authUser})
  expect(wrapper.state('lastPlayedUpdated')).toEqual(true)

  // simulate prop change
  wrapper.setProps({currentGame: {gameKey: 'new_game_key'}})
  expect(updateLastPlayed.mock.calls.length).toEqual(1)
})