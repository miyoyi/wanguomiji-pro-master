import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  status: number;
  message: string;
  code: number;
  data: T;
  total?: number;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.timeout = 8000;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
      const userStore = useUserStore();
      if (config.url && userStore.name && config.url.split('/').includes('add')) {
        config.data.creator = userStore.name;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    // 不等于0则视为错误
    if (res.code < 0) {
      Message.error({
        content: res.message || 'Error',
        duration: 5 * 1000
      });
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    if (error.message.includes('timeout')) {
      error.message = '请求超时';
    } else if (error.message.includes('401')) {
      error.message = 'Token已失效';
      const userStore = useUserStore();
      userStore.logout();
      window.location.reload();
    } else if (error.message.includes('500')) {
      error.message = '与服务器通讯时发生错误';
    }
    return Promise.reject(error);
  }
);
