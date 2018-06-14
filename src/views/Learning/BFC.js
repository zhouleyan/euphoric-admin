import React, { PureComponent } from 'react';
import BFCMenuItem from './BFCMenuItem';
import styles from './learning.less';

class BFC extends PureComponent {
  render() {
    return (
      <div className={styles.layout}>
        <div className={`${styles.content} clearfix`}>
          <div className={styles.sider}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(index => (
              <BFCMenuItem key={index} index={index} />
            ))}
          </div>
          <button className={styles.innerBtn}>按钮</button>
        </div>
      </div>
    );
  }
}

export default BFC;
