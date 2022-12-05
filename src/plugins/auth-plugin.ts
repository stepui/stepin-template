import { defineStore } from 'pinia';
import { Plugin } from 'vue';
import './auth.css';
export type AuthKey = string | number | object;

export interface AuthState {
  authorities: AuthKey[];
}

export type AuthActions = {
  setAuthorities: (authorities: AuthKey[]) => void;
  hasAuthority: (authority: AuthKey) => boolean;
};

export const useAuthStore = defineStore<string, AuthState, {}, AuthActions>('auth', {
  state() {
    return {
      authorities: [],
    };
  },
  actions: {
    setAuthorities(authorities) {
      this.authorities = authorities;
    },
    hasAuthority(authority) {
      return this.authorities.indexOf(authority) !== -1;
    },
  },
});

export function withAuth<T extends Function>(key: AuthKey, func: T): T {
  return function t() {
    const authStore = useAuthStore();
    if (!authStore.hasAuthority(key)) {
      console.warn('you have no permission to accessor the resource');
    }
    return func.apply(undefined, arguments);
  } as unknown as T;
}

/**
 * 插件配置
 */
export interface AuthPluginConfig {
  className?: string;
  action?: 'hide' | 'disable' | 'alert';
  formatter?: (access: string) => string;
  [key: string | number]: any;
}

function msgFormatter(access: string) {
  return `对不起，您没有${access}权限`;
}

interface Operator {
  reject: (el: HTMLElement, access: string, config: AuthPluginConfig) => void;
  access: (el: HTMLElement, access: string, config: AuthPluginConfig) => void;
}

const operators = {
  hide: {
    reject: (el: HTMLElement, access: string, config: AuthPluginConfig) => el.classList.add(config.className!),
    access: (el: HTMLElement, access: string, config: AuthPluginConfig) => el.classList.remove(config.className!),
  },
  disable: {
    reject: (el: HTMLElement, access: string, config: AuthPluginConfig) => {
      el.setAttribute('disabled', '');
      el.setAttribute('title', config.formatter!(access));
    },
    access: (el: HTMLElement, access: string, config: AuthPluginConfig) => el.removeAttribute('disabled'),
  },
  alert: {
    reject: (el: HTMLElement, access: string, config: AuthPluginConfig) => {
      const msg = config.formatter!(access);
      el.setAttribute('title', msg);
      alert(msg);
    },
    access: (el: HTMLElement, access: string, config: AuthPluginConfig) => null,
  },
};

const AuthPlugin: Plugin = {
  install(app, { className = 'auth-hidden', action = 'disable', formatter = msgFormatter }: AuthPluginConfig = {}) {
    app.directive('auth', (el: HTMLElement, { value: access, arg }) => {
      const authConfig = { className, formatter, action: arg ?? action } as AuthPluginConfig;
      const operator: Operator = operators[authConfig.action!];

      const authorStore = useAuthStore();
      if (!authorStore.hasAuthority(access)) {
        el.classList.remove(className);
        el.removeAttribute('disabled');
        operator.reject(el, access, authConfig);
      } else {
        operator.access(el, access, authConfig);
      }
    });
  },
};

export default AuthPlugin;
