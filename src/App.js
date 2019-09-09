import React from 'react';
import './App.css';
import {Router,Route,Switch} from 'react-router-dom'
import Register from './register/register'
import Login from './login/login'
import {createBrowserHistory} from 'history'
var hist = createBrowserHistory()
function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path='/' component={Register}></Route>
        <Route exact path='/login' component={Login} ></Route>
      </Switch>
    </Router>
  );
}

export default App;
