import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()

export default function configureStore() {
  return {
    ...createStore(
      reducer,
      composeEnhancers(
        applyMiddleware(sagaMiddleware)
      )
    ),
    runSaga: sagaMiddleware.run
  }
}