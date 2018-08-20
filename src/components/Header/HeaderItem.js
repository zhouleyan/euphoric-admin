import React from 'react';

import styles from './header.less';

const HeaderItem = ({ float, children, onHeaderItemClick }) => (
  <span
    className={styles.headerItem}
    style={{ float }}
    onClick={ev => {
      ev.stopPropagation();
      ev.preventDefault();
      onHeaderItemClick();
    }}
  >
    {children}
  </span>
);

export default HeaderItem;
