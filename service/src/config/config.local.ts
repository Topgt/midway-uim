import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

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

  config.middleware = [
  ];

  return config;
}
