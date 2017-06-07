import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import rootSaga from './sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const enhancers = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)

export default function configureStore() {
  const store = createStore(
    reducer,
    enhancers
  )
  sagaMiddleware.run(rootSaga)
  return store
}