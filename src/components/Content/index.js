import React from 'react';

import styles from './content.less';

export default ({ collapsed, children }) => (
  <div className={collapsed ? styles.contentCollapsed : styles.content}>
    {children}
  </div>
);
