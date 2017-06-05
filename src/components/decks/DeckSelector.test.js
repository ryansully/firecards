import React from 'react'
import { shallow } from 'enzyme'
import DeckSelector from './DeckSelector'

const deckList = {
  deck1: {
    name: 'deck1'
  },
  deck2: {
    name: 'deck2',
    icon: 'square'
  }
}

const deckOrder = [
  'deck1',
  'deck2'
]

const selectedDecks = ['Base']

const areDecksSelected = () => false

const submitButton = (props) => <button {...props} />

const props = {
  deckList,
  deckOrder,
  selectedDecks,
  areDecksSelected,
  submitButton,
}

it('renders without crashing', () => {
  shallow(<DeckSelector />)
})

it('renders nothing without props', () => {
  const wrapper = shallow(<DeckSelector />)
  expect(wrapper.find('.DeckSelector').length).toEqual(0)
})

it('renders a form when passed deckList and deckOrder', () => {
  const wrapper = shallow(<DeckSelector {...props} />)
  expect(wrapper.find('.DeckSelector').length).toEqual(1)
})