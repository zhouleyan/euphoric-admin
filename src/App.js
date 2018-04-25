import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { getRouterData } from './routes/router';

export default () => {
  const routerData = getRouterData();
  // const Login = routerData['/auth'].component;
  const Main = routerData['/'].component;
  return (
    <Switch>
      {/* <Route path="/auth" component={Login} /> */}
      <Route
        path="/"
        render={props => <Main {...props} routerData={routerData} />}
      />
    </Switch>
  );
};
