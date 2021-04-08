import {
  Interceptor,
  AxiosResponse,
  AxiosRequestConfig,
  StepinHttp,
} from 'stepin/es/utils/http';

import { App, Plugin } from 'vue';

const requestCommon: Interceptor<AxiosRequestConfig> = {
  onFulfilled: (config: AxiosRequestConfig, app: App) => {
    app.config.globalProperties.$message.success('hello');
    console.log(app);
    return config;
  },
  onRejected: (error: Error, app: App) => {
    return error;
  },
};

const responseCommon: Interceptor<AxiosResponse> = {
  onFulfilled: (response: AxiosResponse, app: App) => {
    console.log(response);
    return response;
  },
  onRejected: (error, app: App) => {
    console.log(error);
    return error;
  },
};

const interceptors: Plugin = {
  install(app: App, http: StepinHttp) {
    http.useRequestInterceptors(app, requestCommon);
    http.useResponseInterceptors(app, responseCommon);
    app.config.globalProperties.$http = http;
    return http;
  },
};

export default interceptors;
