import React, { PureComponent } from 'react';
import styles from './learning.less';

class BFCMenuItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    };
  }

  handleMouseEvent = (ev, isEnter) => {
    this.setState({
      isHover: isEnter
    });
  };

  render() {
    return (
      <div className={styles.menuItemWrapper} key={this.props.index}>
        <div
          className={styles.menuItem}
          onMouseEnter={ev => this.handleMouseEvent(ev, true)}
          onMouseLeave={ev => this.handleMouseEvent(ev, false)}
        >
          菜单{this.props.index}
        </div>
        {this.state.isHover && (
          <div className={styles.submenu}>
            <span>子菜单</span>
          </div>
        )}
      </div>
    );
  }
}

export default BFCMenuItem;
