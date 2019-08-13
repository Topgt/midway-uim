import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

import pkg = require('../../package.json')
const appPort = process.env.PORT || 7001;

export type DefaultConfig = PowerPartial<EggAppConfig>

export default (appInfo: EggAppInfo) => {
  const config = <DefaultConfig> {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565504711889_4236';

  config.statLog = {
    enable: true,
    buffer: false,
    fileName: `${pkg.name}.log.${appPort}`,
    dir: '../../logs/statLog',
    flushInterval: 1000,
  },

  // config.cluster = {
  //   listen: {
  //       port: 3000,
  //   },
  // };

  // add your config here
  config.middleware = [
  ];

  return config;
};
