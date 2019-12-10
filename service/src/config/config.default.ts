import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway'

import pkg = require('../../package.json')
const appPort = process.env.PORT || 7001;
import * as path from 'path'

export type DefaultConfig = PowerPartial<EggAppConfig>

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565504711889_4236';

  config.mysql = {
    name: 'mysqlDB',
    host: '127.0.0.1',
    port: '3306',
    database: 'ymy_local',
    username: 'root',
    password: '123456',
    dialect: 'mysql',
  }

  config.statLog = {
    enable: true,
    buffer: false,
    fileName: `${pkg.name}.log.${appPort}`,
    dir: './logs/statLog',
    flushInterval: 1000,
  }

  // config.cluster = {
  //   listen: {
  //       port: 3000,
  //   },
  // };

  config.static = {
    prefix: '/static',
    dir: [
      `${path.resolve(appInfo.baseDir, '../client/static')}`,
      `${path.resolve(appInfo.baseDir, '../static')}`,
    ],
    maxAge: 1, // maxAge 缓存，默认 1 年
    // buffer: false, // 是否将文件读到内存中（如果设置为 true，服务开启后文件的更新不会重新载入）
    // dynamic: true, // 是否支持服务启动后新增文件（如果设置为 false，服务开启后新增的文件不会被载入）
  }
  config.middleware = [
    'gzip'
  ]
  config.gzip = {
      threshold: 30,
  }

  return config;
};
