import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import SiderHeader from './SiderHeader';
import HeaderItem from './HeaderItem';

import styles from './header.less';

class Header extends PureComponent {
  // headerItemClicked = (ev, action) => {
  //   console.log(action);
  //   ev.stopPropagation();
  //   ev.preventDefault();
  //   this.props.onHeaderItemClick(action);
  // };

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
          {/* <span
            className={styles.headerItem}
            onClick={ev => this.headerItemClicked(ev, 'onCollapse')}
          >
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
          </span> */}
          <HeaderItem
            float="right"
            onHeaderItemClick={() => onHeaderItemClick('onLogout')}
          >
            个人中心
          </HeaderItem>
          {/* <span
            className={styles.headerItem}
            onClick={ev => this.headerItemClicked(ev, 'onLogout')}
            style={{ float: 'right' }}
          >
            个人中心
          </span> */}
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
