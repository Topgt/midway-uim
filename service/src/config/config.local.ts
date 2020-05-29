import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway'
import * as path from 'path'

export type DefaultConfig = PowerPartial<EggAppConfig>

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  config.development = {
    watchDirs: [
      'app',
      'lib',
      'service',
      'config',
      'app.ts',
      'agent.ts',
      'interface.ts',
    ],
    overrideDefault: true,
  }

  config.static = {
    prefix: '/',
    dir: [`${path.resolve(appInfo.baseDir, './static')}`],
    maxAge: 1, // maxAge 缓存，默认 1 年
    // buffer: false, // 是否将文件读到内存中（如果设置为 true，服务开启后文件的更新不会重新载入）
    // dynamic: true, // 是否支持服务启动后新增文件（如果设置为 false，服务开启后新增的文件不会被载入）
  }

  config.middleware = [
  ];

  return config;
}
