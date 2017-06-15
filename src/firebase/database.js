import { buffers, eventChannel } from 'redux-saga'

function channel(pathOrRef, event = 'value', buffer = buffers.none()) {
  const ref = (typeof pathOrRef === 'string')
    ? this.app.database().ref(pathOrRef)
    : pathOrRef

  const channel = eventChannel(emit => {
    const callback = ref.on(
      event,
      dataSnapshot => emit({
        snapshot: dataSnapshot,
        value: dataSnapshot.val()
      })
    )
    return () => ref.off(event, callback)
  }, buffer)
  return channel
}

export default {
  channel,
}