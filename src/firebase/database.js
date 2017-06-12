import { buffers, eventChannel } from 'redux-saga'

function channel(pathOrRef, event = 'value', returnSnapshot = false, buffer = buffers.none()) {
  const ref = (typeof pathOrRef === 'string')
    ? this.app.database().ref(pathOrRef)
    : pathOrRef

  const channel = eventChannel(emit => {
    const callback = ref.on(
      event,
      dataSnapshot => emit(returnSnapshot
        ? { snapshot: dataSnapshot }
        : { data: dataSnapshot.val() }
      )
    )
    return () => ref.off(event, callback)
  }, buffer)
  return channel
}

export default {
  channel,
}