import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {ToastProvider} from 'react-toast-notifications'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <Router history={history}>
        <App />
      </Router>
    </ToastProvider>
  </Provider>,
  document.getElementById('app')
)
