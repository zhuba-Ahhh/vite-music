import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

export type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse };

const instance: AxiosInstance = axios.create({
  timeout: 1000 * 60,
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
  baseURL: 'https://netease.zhuba.xyz/'
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // 在这里处理返回的数据
    const { data } = response;

    // 如果 code 不为 200，则提示错误信息
    if (data && data.code !== 200) {
      ElMessage.error(data.msg || '请求失败');
    }

    // 返回原始响应
    return response;
  },
  function (error: AxiosError) {
    // 在这里处理响应错误
    return Promise.reject(error);
  }
);

const api = {
  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return instance.get<T>(url, config);
  },

  async post<T>(url: string, data: T, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    return instance.post<T>(url, data, config);
  }
};

export default api;
