import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import axios from '../utils/axios'
import counter from './counter'
import user from './user'

const rootReducer = combineReducers({
  counter,
  user
})

const fetch = (apiClient) => {
  return ({dispatch, getState}) => {
    return (next) => {
      return (action) => {
        if (typeof action === 'function') {
          return action(dispatch, getState)
        }
  
        const { promise, types, ...rest } = action
        if (!promise) {
          return next(action)
        }
  
        const [REQUEST, SUCCESS, FAILURE] = types
        next({...rest, type: REQUEST})
        const actionPromise = promise(apiClient)
        actionPromise.then(response => {
          next({...rest, payload: response.payload, type: SUCCESS})
        }).catch(error => {
          next({...rest, error, type: FAILURE})
        })
        return actionPromise
      }
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, fetch(axios))
  )
)

// 创建store
export default store
