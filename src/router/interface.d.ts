import { _RouteRecordBase, RouteLocationNormalized } from 'vue-router';
import { Component, DefineComponent } from 'vue';

export type RouteComponent = Component | DefineComponent;
export type LazyRouteComponent = () => Promise<RouteComponent>;

declare type _RouteRecordProps = boolean | Record<string, any> | ((to: RouteLocationNormalized) => Record<string, any>);
declare type RedirectType = Pick<_RouteRecordBase, 'redirect'>;

export interface RouteMeta {
  renderMenu?: boolean;
  permission?: string | number;
  icon?: Component | string;
  cacheable?: boolean;
  link?: string;
  title?: string;
}

declare interface RouteRecordBase extends Omit<_RouteRecordBase, 'redirect'> {
  children?: never;
  component?: never;
  components?: never;
  meta: RouteMeta;
}

export interface RouteRecordSingleView extends RouteRecordBase {
  component: string;
}

redirect: never;
export interface RouteRecordSingleViewWithChildren extends RouteRecordBase, RedirectType {
  component?: string | null | undefined;
  children: RouteOption[];
  props?: _RouteRecordProps;
}

export interface RouteRecordMultipleViews extends RouteRecordBase {
  components: Record<string, string>;
  props?: Record<string, _RouteRecordProps> | boolean;
}

export interface RouteRecordMultipleViewsWithChildren extends RouteRecordBase, RedirectType {
  components?: Record<string, string> | null | undefined;
  children: RouteOption[];
  props?: Record<string, _RouteRecordProps> | boolean;
}

export interface RouteRecordRedirect extends RouteRecordBase, Required<RedirectType> {
  children?: RouteOption[];
}

export interface RouteRecordLink extends RouteRecordBase {
  link: string;
  children?: RouteOption[];
}

export type RouteOption =
  | RouteRecordSingleView
  | RouteRecordSingleViewWithChildren
  | RouteRecordMultipleViews
  | RouteRecordMultipleViewsWithChildren
  | RouteRecordRedirect
  | RouteRecordLink;
