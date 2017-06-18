import React from 'react'
import { shallow } from 'enzyme'
import { ListItem } from 'semantic-ui-react'
import GameList from './GameList'

it('renders without crashing', () => {
  shallow(<GameList />)
})

it('shows list of games', () => {
  const games = [
    {gameKey: 'game_key', name: 'game name'}
  ]
  const wrapper = shallow(<GameList games={games} />)
  expect(wrapper.find(ListItem).length).toEqual(1)
})