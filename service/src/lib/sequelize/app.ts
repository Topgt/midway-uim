import connect from './lib/connect'

module.exports = (app: any) => {
  // const done = app.readyCallback('worker_dal')
  app.beforeStart(async () => {
    console.log('connect db....')
    await connect(app, (err) => {
      if (err) {
        console.log('\x1B[31m%s\x1B[0m', 'creact DB err')
        return
      }
      console.log('✅  creact DB succse')
    })
  })

}
