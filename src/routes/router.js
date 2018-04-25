import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

/* 主页 */
import Main from '../views/Main';

/* 鉴权 */
import Login from '../views/Login';

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
    '/auth': {
      component: Login
    },
    '/auth/login': {
      component: Login
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
    '/compute/image/image-detail': {
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
