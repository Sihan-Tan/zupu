/**
 * 集成Abstract
 * @date 2020-5-29
 */
 import Abstract from '../abstract';
 import {
   LoginType
 } from '../types';
 
 class Login extends Abstract {
     /**
      * 登录
      * @param {string} account 用户
      * @param {string} password 密码
      * @param {string} captchaCode 图形码
      * @param {string} captchaCodeToken 图形码token
      */
     userLogin(data: LoginType) {
         return this.postReq({ url: 'Login.UserLogin', data });
     }
 }
 
 // 单列模式返回对象
 let instance;
 export default (() => {
     if (instance) return instance;
     instance = new Login();
     return instance;
 })();