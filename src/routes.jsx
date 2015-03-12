import React from 'react';
import Router from 'react-router';
const { Route, DefaultRoute } = Router;

// You must import all of the components that represent route handlers
import Home from './components/Home';
import App from './components/App';

export default (
  <Route path="/" handler={App}>
    <DefaultRoute name="home" handler={Home}/>
  </Route>
);