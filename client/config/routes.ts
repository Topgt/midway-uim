import { router } from 'dva';
import { Component } from 'react';

export default [{
  path: '/',
  component: '../layouts/static-view-layout',
  // Routes: ['src/pages/Authorized'],
  // authority: ['admin', 'user'],
  routes: [
    {path: '/', component: './static-view/index' },
    { path: '/solution', component: './static-view/solution' },
    { path: '/onlineClass', component: './static-view/online-class' },
    { path: '/core', component: './static-view/core' },
    { path: '/question', component: './static-view/question' },
    { path: '/recordModel', component: './static-view/record-model' },
    { path: '/about', component: './static-view/about' },
    { path: '/editor', component: './draft-editor'},
  ],
}]
