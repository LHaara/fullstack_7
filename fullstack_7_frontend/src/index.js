import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'


 const reducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  blogs: blogReducer
}) 

const store = createStore(reducer, applyMiddleware(thunk))

/* const render = () => { */
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'))

/* }

/*
render()
store.subscribe(render) */