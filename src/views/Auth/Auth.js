import React from 'react';
import DocumentTitle from 'react-document-title';
import pathToRegexp from 'path-to-regexp';

import { Route, Switch, Redirect } from 'react-router-dom';
import { getRoutes } from '../../utils';

class Auth extends React.PureComponent {
  getPageTitle = () => {
    const {
      routerData,
      location: { pathname }
    } = this.props;
    let title = 'EuphoricAdmin';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - EuphoricAdmin`;
    }
    return title;
  };
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          ))}
          <Redirect exact from="/auth" to="/auth/login" />
        </Switch>
      </DocumentTitle>
    );
  }
}

export default Auth;
