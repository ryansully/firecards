import { call } from 'redux-saga/effects'
import { get } from './database'

it('gets data from a path', () => {
  const ref = {
    once: jest.fn()
  }
  const context = {
    ref: jest.fn(() => ref)
  }
  const val = 'test'
  const snapshot = {
    val: jest.fn(() => val)
  }
  const generator = get.call(context, '/test')
  expect(generator.next().value).toEqual(call([ref, ref.once], 'value'))
  expect(generator.next(snapshot).value).toEqual(val)
})