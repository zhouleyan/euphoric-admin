import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import SiderHeader from './SiderHeader';
import HeaderItem from './HeaderItem';

import styles from './header.less';

class Header extends PureComponent {
  render() {
    const { collapsed, onMenuItemClick, onHeaderItemClick } = this.props;
    return (
      <div className={styles.header}>
        <SiderHeader collapsed={collapsed} onMenuItemClick={onMenuItemClick} />
        <div
          className={collapsed ? styles.mainHeaderCollapsed : styles.mainHeader}
        >
          <HeaderItem
            float="left"
            onHeaderItemClick={() => onHeaderItemClick('onCollapse')}
          >
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
          </HeaderItem>
          <HeaderItem
            float="right"
            onHeaderItemClick={() => onHeaderItemClick('onLogout')}
          >
            个人中心
          </HeaderItem>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  collapsed: PropTypes.bool,
  onSwitch: PropTypes.func
};

export default Header;
