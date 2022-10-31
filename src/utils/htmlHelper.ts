/**
 * 计算元素距离屏幕左上距离
 * @param el
 * @returns
 */
export function offsetScreen(el: HTMLElement) {
  let { offsetLeft, offsetTop } = el;

  if (el.offsetParent) {
    const [left, top] = offsetScreen(el.offsetParent as HTMLElement);
    offsetLeft += left;
    offsetTop += top;
  }

  return [offsetLeft, offsetTop];
}
