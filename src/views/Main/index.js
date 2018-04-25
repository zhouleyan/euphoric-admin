import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import Sider from '../../components/Sider';
import Header from '../../components/Header';
import Content from '../../components/Content';

import { getMenuData } from '../../routes/menu';
import { getRoutes, typeOf } from '../../utils';

import styles from './main.less';

/**
 * 根据菜单自动获取重定向地址。
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`
      });
      item.children.forEach(child => {
        getRedirect(child);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

@connect(({ router: { location } }) => ({ location }), { push })
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      auto: true
    };
  }

  getBashRedirect = () => {
    const urlParams = new URL(window.location.href);
    let redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      const redirectMenu = getMenuData()[1];
      if (
        redirectMenu &&
        redirectMenu.children[0] &&
        redirectMenu.children[0].path
      ) {
        redirect = redirectMenu.children[0].path;
      }
    }
    return redirect;
  };

  /**
   * 切换界面折叠状态
   * @callback updateCollapsedState
   * @param {boolean} collapsed - 界面折叠状态
   * @param {boolean} auto - 界面折叠是否为自动状态
   */
  onSwitch = (collapsed, auto) => {
    this.setState({ collapsed, auto });
  };

  /**
   * 转化路径
   */
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };

  /**
   * 处理HeaderItem事件
   * @param {string} action - 事件名称
   */
  handleHeaderItemClicked = (action, param) => {
    switch (action) {
      case 'onCollapse':
        this.onSwitch(!this.state.collapsed, false);
        break;
      default:
        break;
    }
  };

  /**
   * 处理导航菜单点击
   * @param {string} path - 菜单路径
   */
  handleMenuItemClicked = menuItem => {
    const path =
      typeOf(menuItem) === 'string'
        ? this.conversionPath(menuItem)
        : this.conversionPath(menuItem.path);
    if (/^https?:\/\//.test(path)) {
      window.location.href = path;
    } else {
      this.props.push({
        pathname: path,
        search: ''
      });
    }
  };

  render() {
    const bashRedirect = this.getBashRedirect();
    const { match, routerData, location } = this.props;
    return (
      <div className={styles.container}>
        <Header
          collapsed={this.state.collapsed}
          onHeaderItemClick={this.handleHeaderItemClicked}
          onMenuItemClick={this.handleMenuItemClicked}
        />
        <Sider
          collapsed={this.state.collapsed}
          menuData={getMenuData()}
          location={location}
          onMenuItemClick={this.handleMenuItemClicked}
        />
        <Content collapsed={this.state.collapsed}>
          <Switch>
            {redirectData.map(item => (
              <Redirect key={item.from} exact from={item.from} to={item.to} />
            ))}
            {getRoutes(match.path, routerData).map(item => (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))}
            {bashRedirect && <Redirect exact from="/" to={bashRedirect} />}
            <Route render={() => <div>404</div>} />
          </Switch>
        </Content>
      </div>
    );
  }
}

Main.propTypes = {
  match: PropTypes.object,
  routerData: PropTypes.object
};

export default Main;
