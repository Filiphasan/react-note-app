import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/LoginPage/Login';
import Signup from './components/SignupPage/Signup'
import Notes from './components/NotePage/Notes'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  const getBasename = () => {
    return `/${process.env.PUBLIC_URL.split("/").pop()}`;
  };
  const [userId, setUserId] = useState(0)
  return (
    <div className="app">
      <BrowserRouter basename={getBasename()}>
        <Switch>
          <Route exact path="/">
            <Login setUserId={setUserId} />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <PrivateRoute exact path="/notes"
            component={Notes} userId={userId}>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div >
  )
}

export default App

