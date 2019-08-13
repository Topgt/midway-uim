import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

export type DefaultConfig = PowerPartial<EggAppConfig>

export default (appInfo: EggAppInfo) => {
  const config = <DefaultConfig> {};

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

  config.mysql = {
    host: '127.0.0.1',
    port: '3306',
    database: 'ymy_local',
    username: 'root',
    password: '123456',
    dialect: 'mysql',
  }

  config.middleware = [
  ];

  return config;
}

