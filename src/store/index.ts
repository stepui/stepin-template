import { createPinia } from 'pinia';
export { storeToRefs } from 'pinia';
export * from './account';
export * from './menu';
export * from './setting';
export * from './loading';

const pinia = createPinia();

export default pinia;
