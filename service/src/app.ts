import DB from './lib/connect-mysql'
import Stat from './lib/stat'

module.exports = (app:any) => {
  // const done = app.readyCallback('worker_dal')
  app.beforeStart(async () => {
    console.log('🚀 Your awesome APP is launching...')
    await DB.creatConnect(app.config.mysql)
    Stat.initStat(app.config.statLog)

    console.log('✅  Your awesome APP launched')
  })

}
