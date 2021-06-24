import React, { useState } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import PubsList from './components/PubsList';
import PubDetail from './components/PubDetail';
import NotFound from './components/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} updateUser={updateUser} />

      <Switch>
        <Route exact path="/" children={<PubsList />} />
        <Route path="/detail" children={<PubDetail />} />
        <NotFound />
      </Switch>
    </BrowserRouter>
  );
}
