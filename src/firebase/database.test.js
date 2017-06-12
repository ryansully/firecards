import dbModule from './database'

describe('channel(pathOrRef, event, buffer, snapshot)', () => {
  let ref, database, context

  beforeEach(() => {
    ref = {
      on: jest.fn(),
      off: jest.fn(),
    }
    database = {
      ref: jest.fn(() => ref)
    }
    context = {
      app: {
        database: jest.fn(() => database)
      }
    }
  })

  it('works', () => {
    const path = 'path'
    const event = 'event'
    dbModule.channel.call(context, path, event)

    expect(context.app.database.mock.calls.length).toBe(1)
    expect(context.app.database.mock.calls[0]).toEqual([])

    expect(database.ref.mock.calls.length).toBe(1)
    expect(database.ref.mock.calls[0]).toEqual([path])

    expect(ref.on.mock.calls.length).toBe(1)
    expect(ref.on.mock.calls[0][0]).toBe(event)
  })

  it('accepts ref instead of path', () => {
    const event = 'event'
    dbModule.channel.call(context, ref, event)

    expect(context.app.database.mock.calls.length).toBe(0)
    expect(database.ref.mock.calls.length).toBe(0)

    expect(ref.on.mock.calls.length).toBe(1)
    expect(ref.on.mock.calls[0][0]).toBe(event)
  })

  it('uses "value" for default event type', () => {
    const path = 'path'
    dbModule.channel.call(context, path)

    expect(ref.on.mock.calls.length).toBe(1)
    expect(ref.on.mock.calls[0][0]).toBe('value')
  })

  it('emits snapshot data', () => {
    const dataMock = 'snapshot data'
    const val = jest.fn(() => dataMock)
    const snapshot = { val }
    const subs = []
    ref.on = jest.fn((eventType, callback) => {
      subs.push({eventType, callback})
    })
    const emit = (snapshot) => {
      subs.forEach(({ callback }) => {
        callback(snapshot)
      })
    }
    const path = 'path'
    const event = 'event'
    const channel = dbModule.channel.call(context, path, event)

    const spy = ({ data }) => {
      expect(data).toEqual(dataMock)
    }
    channel.take(spy)
    emit(snapshot)
  })

  it('emits snapshot', () => {
    const dataMock = 'snapshot data'
    const val = jest.fn(() => dataMock)
    const dataSnapshot = { val }
    const subs = []
    ref.on = jest.fn((eventType, callback) => {
      subs.push({ eventType, callback })
    })
    const emit = (snapshot) => {
      subs.forEach(({ callback }) => {
        callback(snapshot)
      })
    }
    const path = 'path'
    const event = 'event'
    const channel = dbModule.channel.call(context, path, event, true)

    const spy = ({ snapshot }) => {
      expect(snapshot).toEqual(dataSnapshot)
    }
    channel.take(spy)
    emit(dataSnapshot)
  })

  it('unsubscribes when the channel is closed', () => {
    const path = 'path'
    const event = 'event'
    const channel = dbModule.channel.call(context, path, event)
    channel.close()

    expect(ref.off.mock.calls.length).toBe(1)
    expect(ref.off.mock.calls[0][0]).toBe(event)
  })
})