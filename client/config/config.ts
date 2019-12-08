import { IConfig } from 'umi-types';

import routes from './routes'
import webpackPlugin from './webpack-plugin'

const config: IConfig =  {
  treeShaking: true,
  outputPath: '../dist/client',
  runtimePublicPath: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      title: 'client',
      dll: false,
      dynamicImport: {
        webpackChunkName: true,
      },
    }],
  ],
  routes,
  chainWebpack: webpackPlugin,
  proxy: {
    "/app": {
      "target": "http://localhost:3000/",
      "changeOrigin": true,
    }
  },
}

export default config;
