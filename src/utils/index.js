// export const retina = () => {
//   if (navigator.userAgent.toUpperCase().indexOf('IPHONE OS') !== -1) {
//     return;
//   }
//   const classNames = [];
//   const pixelRatio = window.devicePixelRatio || 1;
//   classNames.push('pixel-ratio-' + Math.floor(pixelRatio));
//   if (pixelRatio >= 2) {
//     classNames.push('retina');
//   }

//   const html = document.getElementsByTagName('html')[0];

//   classNames.forEach(className => {
//     html.className += (html.className ? " " : "") + className;
//   });
// };

/* eslint no-useless-escape:0 */
// const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export const isUrl = path => {
  /* eslint no-useless-escape:0 */
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
  return reg.test(path);
};

export const getRelation = (str1, str2) => {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
};

export const getRenderArr = routes => {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
};

/**
 * Get router routing configuration
 * { path: { name, ...param } } => Array<{ name, path, ...param }>
 * @param {string} path
 * @param {routerData} routerData
 */
export const getRoutes = (path, routerData) => {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stiching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(
      route => route !== item && getRelation(route, item) === 1
    );
    return {
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact
    };
  });
  return renderRoutes;
};

/* 判断数据类型 */
export const typeOf = obj => {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
};

