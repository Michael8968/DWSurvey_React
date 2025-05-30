import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import { getToken, setToken } from './auth';

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { headers, status, data } = response;

    // 处理刷新 token
    if (headers['refresh-token']) {
      setToken(headers['refresh-token']);
    }

    if (status === 200) {
      if ('resultCode' in data) {
        switch (data.resultCode) {
          case 401:
            message.error('未登录或登录已过期');
            window.location.href = '/login';
            break;
          case 403:
            message.error('没有操作权限');
            window.location.href = '/';
            break;
          case 400:
            message.warning(data.resultMsg || '执行失败');
            break;
          case 200:
            return response;
          default:
            message.error(`${data.resultMsg || ''}，状态码：${data.resultCode}`);
        }
      }
      return response;
    }
    return Promise.reject(response);
  },
  (error) => {
    let errorMessage = '系统错误';
    
    if (error.message) {
      if (error.message.includes('Network Error')) {
        errorMessage = '后端接口连接异常';
      } else if (error.message.includes('timeout')) {
        errorMessage = '系统接口请求超时';
      } else if (error.message.includes('Request failed with status code')) {
        const code = error.message.substr(error.message.length - 3);
        if (code === '401') {
          message.error('未登录或登录已过期');
          window.location.href = '/login';
          return Promise.reject(error);
        } else if (code === '403') {
          message.error('没有操作权限');
          window.location.href = '/';
          return Promise.reject(error);
        } else {
          errorMessage = `系统接口${code}异常`;
        }
      }
    }
    
    message.error(errorMessage);
    return Promise.reject(error);
  }
);

export default service; 