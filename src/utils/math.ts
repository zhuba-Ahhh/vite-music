/**
 * @description 分割数组,生成新嵌套数组
 * @param arr
 * @param chunkSize
 * @returns
 */
export const chunkArray = <T>(arr: T[], chunkSize: number): T[][] => {
  const result: T[][] = [];
  const len = arr.length;
  const chunks = Math.ceil(len / chunkSize);

  for (let i = 0; i < chunks; i++) {
    const start = i * chunkSize;
    const end = (i + 1) * chunkSize;
    result.push(arr.slice(start, end));
  }

  return result;
};

/**
 * @description 随机生成id(字符型)
 * @param len 长度
 * @param pre 前缀
 * @returns uuid
 */
export const uuid = (len: number = 6, pre: string = 'u_'): string => {
  const seed = 'abcdefhijkmnprstwxyz0123456789',
    maxPos = seed.length;
  let rtn = '';
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
};
