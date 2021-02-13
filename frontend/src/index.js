import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reduxMulti from 'redux-multi'
import reducer from './reducers'
import App from './components/App'

const middleware = [thunk, logger, reduxMulti]
const store = createStore(reducer, applyMiddleware(...middleware))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
