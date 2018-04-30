import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Authorized from './utils/Authorized';

import { getRouterData } from './routes/router';

const { AuthorizedRoute } = Authorized;

const App = () => {
  const routerData = getRouterData();
  const Auth = routerData['/auth'].component;
  const Main = routerData['/'].component;
  return (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} routerData={routerData} />} />
      <AuthorizedRoute
        path="/"
        render={props => <Main {...props} routerData={routerData} />}
        authority={['admin', 'user']}
        redirectPath="/auth"
      />
    </Switch>
  );
};

export default App;
