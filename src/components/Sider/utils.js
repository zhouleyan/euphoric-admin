/**
 * eg. /user/213/id => ['/user', 'user/213/', '/user/213/id']
 */
export const urlToList = url => {
  const urllist = url.split('/').filter(i => i);
  return urllist.map(
    (urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`
  );
};

export const compareArrays = (arr1, arr2) => {
  if (!arr1 || !arr2 || !(arr1 instanceof Array) || !(arr2 instanceof Array)) {
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
      if (!compareArrays(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};
