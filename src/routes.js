import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import List from './pages/List';
import Detail from './pages/Detail';
import User from './pages/User';

const routes = (
    <Route path="/" component={ App }>
      <IndexRoute component={ List } />
      <Route path="user/:username" component={ User } />
      <Route path="detail/:repo" component={ Detail } />
    </Route>
);

export default routes;
