import React, { PureComponent } from 'react';

import styles from './sider.less';

class MenuItem extends PureComponent {
  handleMenuItemClick = (ev, path) => {
    ev.stopPropagation();
    ev.preventDefault();
    this.props.onMenuItemClick(path);
  };

  render() {
    const { menuItem, selectedKeys } = this.props;
    const selected = menuItem.path === selectedKeys[1];
    return (
      <li className={selected ? styles.menuItemSelected : styles.menuItem}>
        <a onClick={ev => this.handleMenuItemClick(ev, menuItem)}>
          <span>{menuItem.name}</span>
        </a>
      </li>
    );
  }
}

export default MenuItem;
