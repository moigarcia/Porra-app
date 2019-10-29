import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login'
import PrivateRoute from './guards/privateRoute';
import './App.css';
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
