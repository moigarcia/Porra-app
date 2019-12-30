import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login'
import PrivateRoute from './guards/privateRoute';
import './App.css';
import Home from './components/home/Home';
import Bet from './components/bets/Bet';
import Dashboard from './components/admin/Dashboard';
import Classification from './components/classification/Classification';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route
        path="/twitter/success"
        render={() => (
          <Redirect
            to={{
              pathname: '/',
              state: { loadUser: true },
            }}
          />
        )}
      />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/bets" component={Bet} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/classification" component={Classification} />
      </Switch>
    </div>
  );
}

export default App;
