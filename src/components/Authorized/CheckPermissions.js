import React from 'react';
import PromiseRender from './PromiseRender';
import { CURRENT } from './index';
import { getAuthority } from '../../utils/authority';

const isPromise = obj =>
  !!obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function';

/**
 * 通用鉴权方案
 * Common check permissions method
 * @param { 权限判定条件 Permission judgment. type string | array | Promise | Function } authority
 * @param { 当前权限 Current permission description. type string } currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过组件 No pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
  // 没有判定权限，默认查看所有
  // Retirement authority, return target;
  if (!authority) {
    return target;
  }

  // array 处理
  if (Array.isArray(authority)) {
    if (authority.indexOf(currentAuthority) >= 0) {
      return target;
    }
    return Exception;
  }

  // string 处理
  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }

  // Promise 处理
  if (isPromise(authority)) {
    return <PromiseRender ok={target} error={Exception} promise={authority} />;
  }

  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority);
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

// 菜单鉴权
const checkMenuPermissions = (authority, currentAuthority) => {
  // 没有判定权限，默认查看所有
  // Retirement authority, return true;
  if (!authority) {
    return true;
  }

  // array 处理
  if (Array.isArray(authority)) {
    if (authority.indexOf(currentAuthority) >= 0) {
      return true;
    }
    return false;
  }

  // string 处理
  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return true;
    }
    return false;
  }

  // Promise 处理
  // if (isPromise(authority)) {
  //   return <PromiseRender ok={target} error={Exception} promise={authority} />;
  // }

  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority);
      if (bool) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

const checkMenu = authority => {
  return checkMenuPermissions(
    authority,
    CURRENT === 'NULL' ? getAuthority() : CURRENT
  );
};

export { checkPermissions, checkMenu };

const check = (authority, target, Exception) => {
  return checkPermissions(
    authority,
    CURRENT === 'NULL' ? getAuthority() : CURRENT,
    target,
    Exception
  );
};

export default check;
