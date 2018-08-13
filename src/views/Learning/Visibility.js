import React, { PureComponent } from 'react';
import styles from './learning.less';
import Icon from '../../components/Icon';

class Visibility extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  handleClick = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div>
        <button onClick={ev => this.handleClick(ev)}>显示/隐藏</button>
        <div
          style={{
            width: this.state.collapsed ? '48px' : '200px',
            height: '500px',
            background: 'lightgray',
            transition: 'width .3s'
          }}
        >
          <ul className={styles.siderMenu}>
            {[1, 2, 3, 4, 5].map(index => (
              <li key={index}>
                <a>
                  <span className={styles.menuArrow}>
                    {/* <Icon type="down" /> */}
                    <Icon type={!this.state.collapsed ? "down" : "desktop"} />
                  </span>
                  {!this.state.collapsed && (
                    <span>
                      <Icon type="desktop" />
                      <span>菜单{index}</span>
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Visibility;
