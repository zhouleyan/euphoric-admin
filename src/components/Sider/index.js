import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';

import SubMenu from './SubMenu';
import Icon from '../Icon';

import { urlToList } from './utils';

import styles from './sider.less';

/**
 * 渲染Icon
 */
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export const getMenuMatchKeys = (flatMenuKeys, path) =>
  flatMenuKeys.filter(item => pathToRegexp(item).test(path));

/**
 * Recursively flatten the data
 * @param {Array} menuData - 菜单原始数据
 * @returns {Array} 扁平化菜单key
 */
const getFlatMenuKeys = menuData => {
 let keys = [];
 menuData.forEach(item => {
   if (item.children) {
     keys = keys.concat(getFlatMenuKeys(item.children));
   }
   keys.push(item.path);
 });
 return keys;
};

/**
   * Convert pathname to openKeys
   * /list/search/articles => ['list', '/list/search']
   * @param {Object} location - 当前路由位置
   * @param {string} location.pathname - 当前路由路径
   * @returns {Array} 路径片段
   */
const getDefaultCollapsedSubMenus = props => {
    const { location: { pathname } } = props;
    return urlToList(pathname)
      .map(item => getMenuMatchKeys(getFlatMenuKeys(props.menuData), item)[0])
      .filter(item => item);
  };

class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.menus = props.menuData;
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      openKeys: getDefaultCollapsedSubMenus(nextProps)
    };
  }

  

  

  /**
   * Get selected child nodes
   * /user/chen => ['user', '/user/:id']
   */
  getSelectedMenuKeys = () => {
    const {
      location: { pathname }
    } = this.props;
    return urlToList(pathname).map(path =>
      getMenuMatchKeys(this.flatMenuKeys, path).pop()
    );
  };

  /**
   * checkMenuPermission
   */
  checkMenuPermission = (authority, MenuDom) => {
    // todo: menu permissions...
    return MenuDom;
  };

  isMainMenu = key =>
    this.menus.some(item => key && (item.key === key || item.path === key));

  handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne =
      openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys]
    });
  };

  /**
   * 获取导航菜单子节点
   */
  getNavMenuItems = menus => {
    if (!menus) {
      return [];
    }
    return menus
      .filter(menu => menu.name && !menu.hideInMenu)
      .map(menu => {
        const MenuDom = this.getSubMenuOrItem(menu);
        return this.checkMenuPermission(menu.aythority, MenuDom);
      })
      .filter(menu => menu);
  };

  /**
   * Get SubMenu or Item
   */
  getSubMenuOrItem = menu => {
    const { collapsed, onMenuItemClick } = this.props;
    const { openKeys } = this.state;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    const menuText = !collapsed ? menu.name : null;
    return (
      <SubMenu
        title={
          menu.icon ? (
            <span>
              {getIcon(menu.icon)}
              <span>{menuText}</span>
            </span>
          ) : (
            menuText
          )
        }
        key={menu.path}
        path={menu.path}
        children={menu.children}
        collapsed={collapsed}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={this.handleOpenChange}
        onMenuItemClick={onMenuItemClick}
      />
    );
  };

  render() {
    const { menuData, collapsed } = this.props;
    return (
      <div className={collapsed ? styles.siderCollapsed : styles.sider}>
        <ul className={styles.siderMenu}>{this.getNavMenuItems(menuData)}</ul>
      </div>
    );
  }
}

SiderMenu.propTypes = {
  collapsed: PropTypes.bool,
  menuData: PropTypes.array
};

export default SiderMenu;
