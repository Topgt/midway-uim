import Stat from './lib/stat'

module.exports = (app: any) => {
  // const done = app.readyCallback('worker_dal')
  app.beforeStart(async () => {
    console.log('🚀 Your awesome APP is launching...')
    Stat.initStat(app.config.statLog)

    console.log('✅  Your awesome APP launched')
  })

}
