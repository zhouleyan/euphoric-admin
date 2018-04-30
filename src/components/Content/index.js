import React from 'react';

import styles from './content.less';

const Content = ({ collapsed, children }) => (
  <div className={collapsed ? styles.contentCollapsed : styles.content}>
    {children}
  </div>
);

export default Content;
