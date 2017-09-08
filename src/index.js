import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose

const store = createStore(
  reducer,
  // composeEnhancers(
    applyMiddleware(thunk)
  // )
)

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider></BrowserRouter>,
  document.getElementById('root'));

registerServiceWorker();
