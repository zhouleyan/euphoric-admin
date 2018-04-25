import React from 'react';

import styles from './header.less';

export default ({ float, children, onHeaderItemClick }) => (
  <span
    className={styles.headerItem}
    style={{float}}
    onClick={ev => {
      ev.stopPropagation();
      ev.preventDefault();
      onHeaderItemClick();
    }}
  >
    {children}
  </span>
);
