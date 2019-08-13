import DB from './lib/connect-mysql'

module.exports = (app:any) => {
  // const done = app.readyCallback('worker_dal')
  app.beforeStart(async () => {
    console.log('🚀 Your awesome APP is launching...')
    await DB.creatConnect(app.config.mysql)

    console.log('✅  Your awesome APP launched')
  })
  
};