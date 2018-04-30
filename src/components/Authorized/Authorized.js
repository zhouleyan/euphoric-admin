import React from 'react';
import CheckPermissions from './CheckPermissions';

class Authorized extends React.PureComponent {
  render() {
    const { children, authority, noMatch } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
