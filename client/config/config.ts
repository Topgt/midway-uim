import { IConfig } from 'umi-types';

import routes from './routes'
import webpackPlugin from './webpack-plugin'



const config: IConfig =  {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'client',
      dll: false,
    }],
  ],
  routes,
  chainWebpack: webpackPlugin,
}

export default config;
