import { defineStore } from 'pinia';
import { Plugin } from 'vue';
import './auth.css';
import { alert } from 'stepin';
export type AuthKey = string | number;

export interface AuthState {
  authorities: AuthKey[];
}

export type AuthActions = {
  setAuthorities: (authorities: AuthKey[]) => void;
  hasAuthority: (authority: AuthKey) => boolean;
  useAuth: <T extends Function>(key: AuthKey, func: T) => T;
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
    /**
     * 给函数添加 权限校验
     * @param key
     * @param func
     * @returns
     */
    useAuth<T extends Function>(key: AuthKey, func: T): T {
      const _this = this;
      return function t() {
        if (!_this.hasAuthority(key)) {
          alert.error(msgFormatter(key));
        } else {
          return func.apply(undefined, arguments);
        }
      } as unknown as T;
    },
  },
});

/**
 * 给函数添加 权限校验
 * @param key
 * @param func
 * @returns
 */
export function useAuth<T extends Function>(key: AuthKey, func: T): T {
  return function t() {
    const authStore = useAuthStore();
    if (!authStore.hasAuthority(key)) {
      alert.error(msgFormatter(key));
    } else {
      return func.apply(undefined, arguments);
    }
  } as unknown as T;
}

/**
 * 插件配置
 */
export interface AuthPluginConfig {
  disableClass?: string;
  action?: 'hide' | 'disable';
  formatter?: (access: string) => string;
  [key: string | number]: any;
}

function msgFormatter(access: AuthKey) {
  return `对不起，您没有 \`${access}\` 权限`;
}

interface Operator {
  reject: (el: HTMLElement, access: string, config: AuthPluginConfig) => void;
  access: (el: HTMLElement, access: string, config: AuthPluginConfig) => void;
}

const operators = {
  hide: {
    reject: (el: HTMLElement, access: string, config: AuthPluginConfig) => {
      el.setAttribute('_display', el.style.display);
      el.style.display = 'none';
    },
    access: (el: HTMLElement, access: string, config: AuthPluginConfig) => {
      if (el.hasAttribute('_display')) {
        el.style.display = el.getAttribute('_display');
      }
      el.removeAttribute('_display');
    },
  },
  disable: {
    reject: (el: HTMLElement, access: string, config: AuthPluginConfig) => {
      el.classList.add(config.disableClass!);
      el.setAttribute('disabled', '');
      el.setAttribute('title', config.formatter!(access));
    },
    access: (el: HTMLElement, access: string, config: AuthPluginConfig) => {
      el.classList.remove(config.disableClass!);
    },
  },
};

const AuthPlugin: Plugin = {
  install(app, { disableClass = 'auth-disable', action = 'disable', formatter = msgFormatter }: AuthPluginConfig = {}) {
    app.directive('auth', (el: HTMLElement, { value, arg: access, modifiers }, vnode) => {
      const { disable, hide } = modifiers;
      const _action = hide ? 'hide' : disable ? 'disable' : undefined;
      const authConfig = { disableClass, formatter, action: _action ?? action } as AuthPluginConfig;
      const operator: Operator = operators[authConfig.action!];

      const authorStore = useAuthStore();
      if (!authorStore.hasAuthority(access!)) {
        operator.reject(el, access!, authConfig);
      } else {
        operator.access(el, access!, authConfig);
      }
    });
  },
};

export default AuthPlugin;
