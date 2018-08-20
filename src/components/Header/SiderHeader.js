import React from 'react';
import styles from './header.less';

const SiderHeader = ({ collapsed, onMenuItemClick }) => (
  <div className={collapsed ? styles.siderHeaderCollapsed : styles.siderHeader}>
    {/* eslint-disable */}
    <a
      className={styles.siderHeaderLogo}
      onClick={ev => onMenuItemClick('/')}
    />
  </div>
);

export default SiderHeader;
