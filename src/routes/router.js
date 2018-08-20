import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

/* 主页 */
import Main from '../views/Main';

/* 鉴权 */
import Auth from '../views/Auth';

/* 仪表盘 */
import Dashboard from '../views/Dashboard';

/* 计算 */
import Instance from '../views/Compute/Instance';
import Image from '../views/Compute/Image';

/* 网络 */
import LoadBalance from '../views/Network/LoadBalance';
import Router from '../views/Network/Router';
import Vlan from '../views/Network/Vlan';

/* 存储 */
import Volume from '../views/Storage/Volume';
import Snapshot from '../views/Storage/Snapshot';

/* 学习 */
import SVG from '../views/Learning/SVG';
import Animation from '../views/Learning/Animation';
import Visibility from '../views/Learning/Visibility';
import BFC from '../views/Learning/BFC';

const getFlatMenuData = menus => {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
};

export const getRouterData = () => {
  const routerConfig = {
    '/': {
      component: Main
    },
    '/dashboard': {
      component: Dashboard
    },
    '/compute/instance': {
      component: Instance
    },
    '/compute/image': {
      component: Image
    },
    '/network/load-balance': {
      component: LoadBalance
    },
    '/network/router': {
      component: Router
    },
    '/network/vlan': {
      component: Vlan
    },
    '/storage/volume': {
      component: Volume
    },
    '/storage/snapshot': {
      component: Snapshot
    },
    '/learning/svg': {
      component: SVG
    },
    '/learning/animation': {
      component: Animation
    },
    '/learning/visibility': {
      component: Visibility
    },
    '/learning/bfc': {
      component: BFC
    },
    '/auth': {
      component: Auth
    },
    '/auth/login': {
      name: '登录',
      component: Auth.Login
    }
  };

  const menuData = getFlatMenuData(getMenuData());
  
  const routerData = {};

  Object.keys(routerConfig).forEach(path => {
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority
    };
    routerData[path] = router;
  });
  return routerData;
};
