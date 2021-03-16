/**
 * axios基础构建
 * @date 2019-12-24
 */

 import getUrl from './config';
 import instance from './intercept';
 import qs from 'qs';
 import { AxiosRequest, CustomResponse } from '../typings/axiosType';
 
 class Abstract {
   // 外部传入的baseUrl
   protected baseURL: string = '/api/apps/api';
   // 自定义header头
   protected headers: object = {
     ContentType: 'application/json;charset=UTF-8'
   }
   // protected headers: object = {
   //   ContentType: 'application/x-www-form-urlencoded;charset=UTF-8'
   // }
 
   private apiAxios({ baseURL = this.baseURL, headers = this.headers, method, url, data, params, responseType }: AxiosRequest): Promise<CustomResponse> {
     console.log(url)
     // url解析
     const _url = (url as string).split('.');
     url = getUrl(_url[0], _url[1]);
 
     return new Promise((resolve, reject) => {
       instance({
         baseURL,
         headers,
         method,
         url,
         params,
         data,
         responseType
       }).then((res) => {
         // 200:服务端业务处理正常结束
         if (res.status === 200) {
           if (res.data.success) {
             resolve({ status: true, message: 'success', data: res.data?.data, origin: res.data });
           } else {
             // Vue.prototype.$message({ type: 'error', message: res.data?.errorMessage || (url + '请求失败') });
             resolve({ status: false, message: res.data?.errorMessage || (url + '请求失败'), data: res.data?.data, origin: res.data });
           }
         } else {
           resolve({ status: false, message: res.data?.errorMessage || (url + '请求失败'), data: null });
         }
       }).catch((err) => {
         const message = err?.data?.errorMessage || err?.message || (url + '请求失败');
         // Vue.prototype.$message({ type: 'error', message });
         // eslint-disable-next-line
         reject({ status: false, message, data: null });
       });
     });
   }
 
   /**
    * GET类型的网络请求
    */
   protected getReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
     return this.apiAxios({ baseURL, headers, method: 'GET', url, data, params, responseType });
   }
 
   /**
    * POST类型的网络请求
    */
   protected postReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
     return this.apiAxios({ baseURL, headers, method: 'POST', url, data: qs.stringify(data), params, responseType });
   }
 
   /**
    * PUT类型的网络请求
    */
   protected putReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
     return this.apiAxios({ baseURL, headers, method: 'PUT', url, data: qs.stringify(data), params, responseType });
   }
 
   /**
    * DELETE类型的网络请求
    */
   protected deleteReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
     return this.apiAxios({ baseURL, headers, method: 'DELETE', url, data: qs.stringify(data), params, responseType });
   }
 }
 
 export default Abstract;
 