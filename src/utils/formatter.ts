/**
 * 格式化金额
 * @param value
 * @param fixed
 * @returns
 */
export function formatMoney(value: number, fixed: number = 0) {
  let unit: string = value < 10000 ? '' : value < 100000000 ? 'w' : '亿';
  value =
    value < 10000
      ? value
      : value < 100000000
      ? value / 10000
      : value / 100000000;
  let format: string = value.toFixed(fixed);
  const _val = format.split('.');
  const _int = _val[0],
    _dec = _val[1];
  return `${_val}${unit}`;
}

/**
 * 千位格式化
 * @param value
 * @param fixed
 * @returns
 */
export function formatThousand(value: number, fixed: number = 0): string {
  const _val: string[] = value.toFixed(fixed).split('.');
  let [_int, _dec] = _val;
  _dec = (parseInt(_dec) === 0 ? undefined : _dec) as string;
  let numbers = [];
  let format = '';
  for (let i = _int.length; i >= 0; i -= 3) {
    numbers.push(_int.substring(i - 3 < 0 ? 0 : i - 3, i));
  }
  return numbers.reverse().join(',') + ((_dec && `.${_dec}`) ?? '');
}
