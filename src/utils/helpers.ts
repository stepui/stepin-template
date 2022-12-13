/**
 * 初始化目标值为 undefined 的属性
 * @param target 目标对象
 * @param dft 默认值对象
 */
export function initUndefined<T extends Record<string, any>, K extends keyof T>(target: T, dft: Required<Pick<T, K>>) {
  (Object.keys(dft) as K[]).forEach((key) => (target[key] = target[key] ?? dft[key]));
}
