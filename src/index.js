import React from 'react'
import ReactDOM from 'react-dom'
import store from './store/index'
import { Provider } from './react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthorizedRoute from '../src/components/common/AuthorizedRoute'

// import App from './App'
import Hooks from './Hooks'
import Login from './Login'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <container>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login/mobile" component={Login}></Route>
          <AuthorizedRoute exact path="/" component={Login}/>
          <AuthorizedRoute exact path="/hook" component={Hooks}></AuthorizedRoute>
        </Switch>
      </Router>
    </Provider>
  </container>,
  rootElement
);
