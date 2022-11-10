import fs from 'fs';
import path from 'path';

/**
 * 读取环境变量文件
 * @param path
 */
export function readEnvFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data
      .split('\n')
      .map((kv) => kv.split('='))
      .filter(([k, v]) => k != undefined && v != undefined)
      .map(([k, v]) => ({ [k]: v.replace(/\r\n/, '').replace(/\r/, '') }))
      .reduce((p, c) => ({ ...p, ...c }));
  } catch (err) {}
  return {};
}

/**
 * 获取环境变量
 * @param dirname 环境变量文件目录
 * @param command 命令 build | dev
 * @param mode 模式 development | production | test | or any other custom mode
 */
export function getEnv(dirname: string, command?: string, mode?: string) {
  const _environment = command === 'build' ? 'production' : 'development';
  const environment = mode || _environment;
  const baseEnv = readEnvFile(path.resolve(dirname, `./.env`));
  const modeEnv = readEnvFile(path.resolve(dirname, `./.env.${environment}`));
  return { ...baseEnv, ...modeEnv };
}

/**
 * 获取文件 base64 编码内容
 * @param file
 * @returns
 */
export async function getBase64(file: Blob): Promise<string> {
  const promise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    try {
      reader.readAsDataURL(file);
    } catch (e) {
      reject(e);
    }
  });
  return promise;
}
