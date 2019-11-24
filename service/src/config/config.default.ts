import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

import pkg = require('../../package.json')
const appPort = process.env.PORT || 7001;

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
    dir: '../logs/statLog',
    flushInterval: 1000,
  }

  // config.cluster = {
  //   listen: {
  //       port: 3000,
  //   },
  // };

  // add your config here
  config.middleware = [
  ]

  return config;
};
