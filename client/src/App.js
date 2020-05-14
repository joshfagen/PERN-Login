import React, { Fragment, useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect,
 } from "react-router-dom";

 // components 

 import Dashboard from './components/Dashboard';
 import Login from './components/Login';
 import Register from './components/Register';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route 
              exact 
              path="/login" 
              render={props => 
                !isAuthenticated ? (
                <Login {...props} setAuth={setAuth}/>
                ) : (
                <Redirect to="/dashboard" />
                )
              } 
            />
            <Route 
              exact 
              path="/register" 
              render={props => 
                !isAuthenticated ? (
                <Register {...props} setAuth={setAuth}/>
              ) : (
                <Redirect to="/login" />
              )
            }
            />
            <Route 
              exact 
              path="/dashboard" 
              render={props => 
                isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth}/>
              ) : (
                <Redirect to="/login" />
              )
            }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
