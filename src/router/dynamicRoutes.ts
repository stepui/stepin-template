// 引入 src/pages 文件夹下所有组件作为动态组件
import Pages from '@/pages';
import { RouteRecordRaw } from 'vue-router';
import { RouteOption, LazyRouteComponent, RouteRecordLink } from './interface';
import router from './index';
import { initUndefined } from '@/utils/helpers';

// 注册 IframeBox、BlankView 组件
Pages['iframe'] = () => import('stepin/es/iframe-box');
Pages['blankView'] = () => import('@/components/layout/BlankView.vue');

/**
 * 解析路由组件
 * @param component
 * @returns
 */
const parseComponent = (component: null | undefined | string | Record<string, string>) => {
  if (component === null || component === undefined) {
    return component;
  }
  if (typeof component === 'string') {
    return Pages[component];
  } else {
    return Object.entries(component).reduce((p, [key, val]) => {
      p[key] = Pages[val];
      return p;
    }, {} as Record<string, LazyRouteComponent>);
  }
};

/**
 * 解析路由
 * @param routes
 * @returns
 */
function parseRoutes(routes: RouteOption[]): RouteRecordRaw[] {
  return routes.map<RouteRecordRaw>((route) => {
    // 初始化meta
    route.meta = route.meta ?? {};
    initUndefined(route.meta, {
      cacheable: true,
      renderMenu: true,
      link: (route as RouteRecordLink).link,
    });
    // 解析组件 及 子路由
    const _route = {
      ...route,
      children: route.children && parseRoutes(route.children),
      component: route.component && parseComponent(route.component),
      components: route.components && parseComponent(route.components),
    } as any;
    // 删除 undefined 属性
    Object.keys(_route).forEach((key) => {
      if (_route[key] === undefined) {
        delete _route[key];
      }
    });

    return _route as RouteRecordRaw;
  });
}

/**
 * 提取路由name
 * @param recordList
 * @returns
 */
const extractRouteNames = (recordList: RouteRecordRaw[]): string[] => {
  const result: string[] = [];
  recordList.forEach((record) => {
    if (typeof record.name === 'string') {
      result.push(record.name);
    }
    if (record.children) {
      result.push(...extractRouteNames(record.children));
    }
  });
  return result;
};

/**
 * 合并路由
 * @param target
 * @param source
 */
function mergeRoutes(target: readonly RouteRecordRaw[], source: RouteRecordRaw[]): RouteRecordRaw[] {
  interface RouteRecordMap extends Omit<RouteRecordRaw, 'children'> {
    children?: Map<string, RouteRecordMap>;
  }

  type Filter = (record: RouteRecordRaw) => Boolean;
  /**
   * 转换成 map
   * @param routes
   * @param filter 过滤器
   * @param parentPath
   * @returns
   */
  const toRoutesMap = (routes: readonly RouteRecordRaw[], filter?: Filter, parentPath?: string): any => {
    parentPath = parentPath ?? '';

    const _map = new Map<string, RouteRecordMap>();
    routes.forEach((route) => {
      if (!filter || filter(route)) {
        const fullPath = /^\//.test(route.path) ? route.path : `${parentPath}/${route.path}`;
        _map.set(fullPath, {
          ...route,
          children: route.children && toRoutesMap(route.children, filter, fullPath),
        });
      }
    });
    return _map;
  };

  // 合并
  const mergeMap = (
    target?: Map<string, RouteRecordMap>,
    source?: Map<string, RouteRecordMap>
  ): Map<string, RouteRecordMap> | undefined => {
    if (!target || !source) {
      return target ?? source;
    }

    const resultMap = new Map<string, RouteRecordMap>();
    target.forEach((v, k) => {
      resultMap.set(k, v);
    });
    source.forEach((v, k) => {
      const t = resultMap.get(k);
      if (t !== undefined) {
        v.children = mergeMap(t.children, v.children);
      }
      resultMap.set(k, v);
    });
    return resultMap;
  };

  // map 转换成 routes
  const toRoutes = (routesMap: Map<string, RouteRecordMap>): RouteRecordRaw[] => {
    const _routes: RouteRecordRaw[] = [];
    routesMap.forEach((record, path) => {
      const _route = { ...record } as RouteRecordRaw;
      if (record.children) {
        _route.children = toRoutes(record.children);
      } else {
        delete _route.children;
      }
      _routes.push(_route);
    });
    return _routes;
  };

  const names = extractRouteNames(source);
  const targetMap = toRoutesMap(target, (record) => !names.includes(record.name as string));
  const sourceMap = toRoutesMap(source);
  const routesMap = mergeMap(targetMap, sourceMap)!;

  return toRoutes(routesMap);
}

/**
 * 添加路由
 * @param routes
 */
export function addRoutes(routes: RouteOption[]) {
  const routesRaw: RouteRecordRaw[] = parseRoutes(routes);
  routesRaw.forEach((routeRaw) => router.addRoute(routeRaw));
  router.options.routes = mergeRoutes(router.options.routes, routesRaw);
  router.options.routes[0].children?.slice(0, 1);
}
