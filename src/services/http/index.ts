import StepinHttp, { StepinHttp as _StepinHttp } from 'stepin/es/utils/http';
import { App, Plugin } from 'vue';
import interceptors from './interceptors';

const _http = StepinHttp.create({
  baseURL: '/stepin-app',
  xsrfHeaderName: 'token',
  xsrfCookieName: 'token',
});

const http: Plugin & _StepinHttp = _http as any;

http.install = function (app: App) {
  app.use(interceptors, this);
};

export default http;
