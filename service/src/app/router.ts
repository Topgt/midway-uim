import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.index.render);
  // router.get('/api', controller.index.version);

  // router.get('/api/user_info', controller.userInfo.info);
  // router.get('/api/authority', controller.userInfo.authority)

  // router.get('/api/file_tree', controller.fileData.list);
  router.get('/app/file_content', controller.fileContorller.content)
  // router.get('/api/down_load', controller.fileData.downLoad)

  // 静态文件不会经gzip处理，必须手动处理
  router.get(/(.*\.js$)|(.*\.css$)/, controller.index.gzip)
  router.get('/*', controller.index.render);
};
