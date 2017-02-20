/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  Signup,
  NotFound,
} from './containers';

export default (store) => { // eslint-disable-line
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
