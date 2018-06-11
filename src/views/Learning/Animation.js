import React, { PureComponent } from 'react';
import styles from './learning.less';

class Animation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHiden: false
    };
  }
  handleClick = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState({
      isHiden: !this.state.isHiden
    });
  };

  render() {
    return (
      <div>
        <button onClick={ev => this.handleClick(ev)}>显示/隐藏</button>
        <div
          style={{
            width: '300px',
            // height: this.state.isHiden ? '200px' : '0',
            height: this.state.isHiden ? 0 : '400px',
            overflow: 'hidden',
            background: 'blue',
            transition: 'all 0.3s'
          }}
        >
          <div className={styles.haha}>haha1</div>
          <div className={styles.haha}>haha2</div>
          <div className={styles.haha}>haha3</div>
        </div>
        <div style={{
          width: '300px',
          height: '40px',
          background: 'yellow'
        }}></div>
      </div>
    );
  }
}

export default Animation;
