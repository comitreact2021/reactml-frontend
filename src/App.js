import React, { useState, useEffect } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import PubsList from './components/PubsList';
import PubDetail from './components/PubDetail';
import NotFound from './components/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(checkUser, []);

  function checkUser() {
    fetch('http://localhost:8000/auth/check', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        updateUser(data.data);
      });
  }

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} updateUser={updateUser} />

      <Switch>
        <Route exact path="/">
          <PubsList type="publicaciones" />
        </Route>

        <Route path="/mispublicaciones">
          <PubsList type="mispublicaciones" />
        </Route>

        <Route path="/favoritos">
          <PubsList type="favoritos" />
        </Route>

        <Route path="/detail/:id">
          <PubDetail />
        </Route>

        <NotFound />
      </Switch>
    </BrowserRouter>
  );
}
