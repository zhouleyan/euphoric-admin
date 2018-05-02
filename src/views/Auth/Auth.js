import React from 'react';
import DocumentTitle from 'react-document-title';

import { Route, Switch, Redirect } from 'react-router-dom';
import { getRoutes } from '../../utils';

class Auth extends React.PureComponent {
  getPageTitle = () => {
    const {
      routerData,
      location: { pathname }
    } = this.props;
    let title = 'EuphoricAdmin';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - EuphoricAdmin`;
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
