import React, { PureComponent } from 'react';

import MenuItem from './MenuItem';
import Icon from '../Icon';

// import { compareArrays } from './utils';

import styles from './sider.less';

class SubMenu extends PureComponent {
  constructor(props) {
    super(props);
    const { selectedKeys, openKeys, path } = props;
    this.state = {
      isHover: false,
      expanded: openKeys.includes(path),
      selected: selectedKeys.includes(path)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedKeys, openKeys, path } = nextProps;
    return {
      expanded: openKeys.includes(path),
      selected: selectedKeys.includes(path)
    };
  }

  handleSubMenuClick = (ev, path, openKeys) => {
    ev.stopPropagation();
    ev.preventDefault();
    const { children } = this.props;
    if (children && children.some(child => child.name)) {
      this.onExpand(ev, path, openKeys);
    } else {
      this.props.onMenuItemClick(path);
    }
  };

  onExpand = (ev, path, openKeys) => {
    let newKeys = [...openKeys];
    let flag = 0;
    for (let i = 0; i < newKeys.length; i++) {
      if (newKeys[i] === path) {
        newKeys.splice(i);
        this.props.onOpenChange(newKeys);
        return;
      }
      if (i > 0 && newKeys[i].indexOf(newKeys[0]) === 0) {
        flag++;
      }
    }
    // 开启
    if (0 <= newKeys.length - flag <= 1) {
      // 直接添加
      newKeys.push(path);
    } else if (newKeys.length - flag > 1) {
      // 去除上一个，添加
      newKeys = newKeys.slice(flag + 1, newKeys.length);
    }
    this.props.onOpenChange(newKeys);
  };

  handleMouseEvent = (ev, isEnter) => {
    if (this.props.collapsed) {
      this.setState({
        isHover: isEnter
      });
    }
  };

  getMenuItemWrapperStyle = () => {
    const { collapsed } = this.props;
    const { isHover, expanded } = this.state;
    if (!collapsed && expanded) {
      // 正常展开
      return styles.menuItemWrapper;
    } else if (collapsed && isHover) {
      // 折叠展开
      return styles.menuItemWrapperCollapsed;
    } else {
      // 隐藏
      return styles.menuItemWrapperHidden;
    }
  };

  render() {
    const {
      collapsed,
      title,
      path,
      children,
      openKeys,
      selectedKeys,
      onMenuItemClick
    } = this.props;
    const { expanded, selected, isHover } = this.state;

    return (
      <li className={styles.subMenu}>
        {/* 一级菜单 */}
        <div
          className={
            (expanded && !collapsed) || selected || isHover
              ? styles.subMenuTitleExpanded
              : styles.subMenuTitle
          }
          onClick={ev => this.handleSubMenuClick(ev, path, openKeys)}
          onMouseEnter={ev => this.handleMouseEvent(ev, true)}
          onMouseLeave={ev => this.handleMouseEvent(ev, false)}
        >
          {!collapsed &&
            children &&
            children[0] &&
            children[0].path && (
              <span className={styles.subMenuArrow}>
                <Icon type={expanded ? 'up' : 'down'} />
              </span>
            )}
          {title}
        </div>
        {/* 二级菜单 */}
        {children &&
          children[0] &&
          children[0].path && (
            <ul
              style={{
                height: !collapsed && expanded && children.length * 50 + 'px'
              }}
              className={this.getMenuItemWrapperStyle()}
              onMouseEnter={ev => this.handleMouseEvent(ev, true)}
              onMouseLeave={ev => this.handleMouseEvent(ev, false)}
            >
              {children.map(child => (
                <MenuItem
                  key={child.path}
                  selectedKeys={selectedKeys}
                  menuItem={child}
                  onMenuItemClick={onMenuItemClick}
                />
              ))}
            </ul>
          )}
      </li>
    );
  }
}

export default SubMenu;
