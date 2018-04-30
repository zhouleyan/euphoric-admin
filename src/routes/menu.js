import { isUrl } from '../utils';

const menuData = [
  {
    name: '仪表盘',
    icon: 'line-chart',
    path: 'dashboard'
  },
  {
    name: '计算',
    icon: 'desktop',
    path: 'compute',
    children: [
      {
        name: '云主机实例',
        path: 'instance'
      },
      {
        name: '镜像',
        path: 'image'
      }
    ]
  },
  {
    name: '网络',
    icon: 'wifi',
    path: 'network',
    children: [
      {
        name: '路由器',
        path: 'router'
      },
      {
        name: '负载均衡',
        path: 'load-balance',
        authority: 'admin'
      },
      {
        name: '私有网络',
        path: 'vlan'
      }
    ]
  },
  {
    name: '存储',
    icon: 'hdd',
    path: 'storage',
    children: [
      {
        name: '云硬盘',
        path: 'volume',
      },
      {
        name: '快照',
        path: 'snapshot'
      },
      {
        name: '测试',
        path: 'http://www.sina.com',
        authority: 'rfr'
      }
    ]
  },
  {
    name: '外部链接',
    icon: 'global',
    path: 'global',
    authority: 'rfr',
    children: [
      {
        name: '百度',
        path: 'https://www.baidu.com'
      }
    ]
  }
];

const formatter = (data, parentPath = '/', parentAuthority) =>
  data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      );
    }
    return result;
  });

  export const getMenuData = () => formatter(menuData);
