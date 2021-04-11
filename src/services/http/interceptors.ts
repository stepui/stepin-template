import { Interceptor, StepinHttp } from 'stepin/es/utils/http';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { App, Plugin } from 'vue';
import { message as _message } from 'ant-design-vue';

// 请求拦截器
const requestCommon: Interceptor<AxiosRequestConfig> = {
  onFulfilled: (config: AxiosRequestConfig, app: App) => {
    return config;
  },
  onRejected: (error: Error, app: App) => {
    return error;
  },
};

// 响应拦截器
const responseCommon: Interceptor<AxiosResponse> = {
  onFulfilled: (response: AxiosResponse, app: App) => {
    const { code, message } = response.data;
    // 统一显示错误消息
    if (code !== 0) {
      _message.error(message);
    }
    return response;
  },
  onRejected: (error: Error, app: App) => {
    return error;
  },
};

const interceptors: Plugin = {
  install(app: App, http: StepinHttp) {
    http.useRequestInterceptors(app, requestCommon);
    http.useResponseInterceptors(app, responseCommon);
    return http;
  },
};

export default interceptors;
