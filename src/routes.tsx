import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import Features from './components/features/Features';
import Account from './components/account/Account';
import Profile from './components/profile/Profile';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/features">
        <Features />
      </Route>
      <Route
        path={[
          '/accounts/create',
          '/accounts/import-private-key',
          '/accounts/import-public-address',
          '/account/:accountId',
        ]}
      >
        <Account />
      </Route>
      <Route path={['/my-accounts', '/profile', '/settings']}>
        <Profile />
      </Route>
    </Switch>
  );
};

export default Routes;