import React from 'react';
import Exception from '../Exception';
import CheckPermissions from './CheckPermissions';

/**
 * 默认不能访问任何页面
 */
const Exception403 = () => (
  <Exception type="403" style={{ minHeight: 500, height: '80%' }} />
);

/**
 * Determine whether the incoming component has been instantiated
 * AuthorizedRoute is already instantiated
 * Authorized render is already instantiated, children is no instantiated
 * Secured is not instantiated
 */
const checkIsInstantiation = target => {
  if (!React.isValidElement(target)) {
    return target;
  }
  return () => target;
};

/**
 * 用于判断是否拥有权限访问view
 * authority 支持传入 string, function: () => boolean | Promise
 * e.g. ()=>boolean 返回true能访问,返回false不能访问
 * e.g. Promise  then 能访问   catch不能访问
 * e.g. authority support incoming string, funtion: () => boolean | Promise
 * e.g. 'user' only user user can access
 * e.g. 'user, admin' user and admin can access
 * e.g. () => boolean true to be able to visit, return false can not be accessed
 * e.g. Promise then can not access the visit to catch
 * @param { string | function | Promise } authority
 * @param { ReactNode } error 非必需参数
 */
const authorize = (authority, error) => {
  /**
   * conversion into a class
   * 防止传入的字符串找不到staticContext造成报错
   */
  let classError = false;
  if (error) {
    classError = () => error;
  }
  if (!authority) {
    throw new Error('authority is required');
  }
  return target => {
    const component = CheckPermissions(
      authority,
      target,
      classError || Exception403
    );
    return checkIsInstantiation(component);
  };
};

export default authorize;
