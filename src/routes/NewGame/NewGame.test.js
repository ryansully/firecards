import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'
import { Form, Message } from 'semantic-ui-react'
import { NewGame } from './NewGame'

it('renders without crashing', () => {
  shallow(<NewGame />)
})

it('handles game name change event', () => {
  const wrapper = shallow(<NewGame />)
  wrapper.find('#gameName').simulate('change', {target: {value: 'test'}})
  expect(wrapper.state('gameName')).toEqual('test')
})

it('handles submit button click', () => {
  const createGameRequest = jest.fn()
  const preventDefault = jest.fn()
  const wrapper = shallow(<NewGame deckList={{}} deckOrder={[]}
    createGameRequest={createGameRequest} />)

  wrapper.instance().handleSubmit({preventDefault})
  expect(preventDefault).toBeCalled()
  expect(createGameRequest).toBeCalled()
  expect(wrapper.state('gameCreated')).toEqual(true)
})

it('redirects after game is created', () => {
  const createGameRequest = jest.fn()
  const wrapper = shallow(<NewGame deckList={{}} deckOrder={[]} currentGame={{}}
    createGameRequest={createGameRequest} />)

  wrapper.instance().setState({gameCreated: true})
  expect(wrapper.find(Redirect).length).toEqual(1)
})

it('does not rerender if there is no deck list or order', () => {
  const deckList = {}
  const wrapper = shallow(<NewGame deckList={deckList} />)
  expect(wrapper.instance().shouldComponentUpdate({deckList})).toEqual(false)
})

it('does not rerender if game name changes', () => {
  const nextProps = {
    deckList: {},
    deckOrder: {}
  }
  const gameName = 'test'
  const wrapper = shallow(<NewGame />)
  expect(wrapper.instance().shouldComponentUpdate(nextProps, {gameName}))
    .toEqual(false)
})

it('displays an error message from the database', () => {
  const gameCreateError = {code: 'ERROR'}
  const wrapper = shallow(<NewGame gameCreateError={gameCreateError} />)
  expect(wrapper.find(Form).prop('error')).toEqual(true)
  expect(wrapper.find(Message).length).toEqual(1)
})