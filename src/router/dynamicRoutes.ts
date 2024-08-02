// 引入 src/pages 文件夹下所有组件作为动态组件
import Pages from '@/pages';
import { RouteRecordRaw } from 'vue-router';
import { RouteOption, LazyRouteComponent, RouteRecordLink } from './interface';
import router from './index';
import localRoutes from './routes';
import { initUndefined } from '@/utils/helpers';

// 注册 IframeBox、BlankView 组件
Pages['iframe'] = () => import('stepin/es/iframe-box');
Pages['blankView'] = () => import('@/components/layout/BlankView.vue');
Pages['link'] = () => import('@/components/layout/LinkView.vue');

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
 * 提取嵌套路由所有name
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
   * 转换成 map, 不满足过滤条件的 route 值设置为 undefined
   * @param routes
   * @param filter 过滤器
   * @param parentPath
   * @returns
   */
  const toRoutesMap = (
    routes: readonly RouteRecordRaw[],
    filter?: Filter,
    parentPath?: string
  ): Map<string, RouteRecordMap> => {
    parentPath = parentPath ?? '';

    const _map = new Map<string, RouteRecordMap>();
    routes.forEach((route) => {
      const fullPath = /^\//.test(route.path) ? route.path : `${parentPath}/${route.path}`;
      if (!filter || filter(route)) {
        _map.set(fullPath, {
          ...route,
          children: route.children && toRoutesMap(route.children, filter, fullPath),
        });
      } else {
        _map.set(fullPath, undefined as never);
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
    // 保证新路由数据顺序
    for (const key of source.keys()) {
      resultMap.set(key, void 0);
    }
    for (const key of target.keys()) {
      resultMap.set(key, void 0);
    }

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
      if (record) {
        const _route = { ...record } as RouteRecordRaw;
        if (record.children) {
          _route.children = toRoutes(record.children);
        } else {
          delete _route.children;
        }
        _routes.push(_route);
      }
    });
    return _routes;
  };

  const names = extractRouteNames(source);
  const targetMap = toRoutesMap(target, (record) => !names.includes(record.name as string));
  const sourceMap = toRoutesMap(source);

  const routesMap = mergeMap(targetMap, sourceMap);
  return toRoutes(routesMap);
}

/**
 * 查找符合条件的路由
 * @param routes 路由集合
 * @param filter 过滤器
 * @returns
 */
function findRoute(
  routes: readonly RouteRecordRaw[],
  filter: (route: RouteRecordRaw) => boolean
): RouteRecordRaw | undefined {
  if (routes.length === 0) {
    return undefined;
  }
  return (
    routes.find(filter) ??
    findRoute(
      routes.flatMap((route) => route.children ?? []),
      filter
    )
  );
}

/**
 * 添加路由
 * @param routes
 */
export function addRoutes(routes: RouteOption[]) {
  const routesRaw: RouteRecordRaw[] = parseRoutes(routes);
  routesRaw.forEach((routeRaw) => router.addRoute(routeRaw));
  router.options.routes = mergeRoutes(router.options.routes, routesRaw);
}

/**
 * 替换路由
 * @param routes 要替换的路由
 * @param ignoreLocalRoutes 是否忽略本地路由配置(src/router/routes.ts)
 * true: 只替换为新路由
 * false: 替换新路由，并保留本地路由(src/router/routes.ts)
 */
export function replaceRoutes(routes: RouteOption[], ignoreLocalRoutes: boolean) {
  const routesRaw: RouteRecordRaw[] = parseRoutes(routes);
  const flatLocalRoutes = flatRoutes(localRoutes);
  for (let i = 0; i < router.options.routes.length; i++) {
    const route = router.options.routes[i];
    if (ignoreLocalRoutes || flatLocalRoutes.findIndex((r) => r.name === route.name) < 0) {
      console.log('移出路由', ignoreLocalRoutes, route);
      router.removeRoute(route.name);
    }
  }
  routesRaw.forEach((routeRaw) => router.addRoute(routeRaw));
  router.options.routes = ignoreLocalRoutes ? routesRaw : mergeRoutes(localRoutes, routesRaw);
}

/**
 * 过滤路由配置
 * @param routes 路由配置数组
 * @param filter 过滤条件
 * @returns
 */
function filterRoutes(routes: Readonly<RouteRecordRaw[]>, filter: (route: RouteRecordRaw) => boolean) {
  return routes.filter((route) => {
    if (route.children && route.children.length > 0) {
      route.children = filterRoutes(route.children, filter);
    }
    return filter(route);
  });
}

/**
 * 移出路由
 * @param routeName
 */
export function removeRoute(routeName: string) {
  router.removeRoute(routeName);
  router.options.routes = filterRoutes(router.options.routes, (route) => route.name !== routeName);
}

/**
 * 添加路由
 * @param routes
 * @param parentName
 * @returns
 */
export function appendRoutes(routes: RouteOption[], parentName: string) {
  const parent = findRoute(router.options.routes, (route) => route.name === parentName);
  if (!parent) {
    console.error(`name为${parentName}的父级路由不存在，请检查`);
    return false;
  }
  const routesRaw: RouteRecordRaw[] = parseRoutes(routes);
  routesRaw.forEach((routeRaw) => router.addRoute(parentName, routeRaw));
  parent.children = mergeRoutes(router.options.routes, mergeRoutes(parent.children ?? [], routesRaw));
}

/**
 * 扁平化路由配置
 * @param routes
 */
function flatRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const _routes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    _routes.push(route);
    if (route.children && route.children.length > 0) {
      _routes.push(...flatRoutes(route.children));
    }
  });
  return _routes;
}
