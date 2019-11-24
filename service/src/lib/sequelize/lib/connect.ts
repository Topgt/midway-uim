import {Sequelize} from 'sequelize-typescript'
import * as path from 'path'
import * as fs from 'fs'

type Iconnect = (app: any, callback?: (e?: Error) => void) => Promise<any>

const connect: Iconnect = async (app, callback= () => {}): Promise<any> => {
  const config = app.config.mysql
  const connect = new Sequelize(config)
  const modelPath = path.resolve(app.appDir, 'src/models/mysql')

  try {
    fs.accessSync(modelPath)
    connect.addModels([
      modelPath + '/*.model.*',
    ])
  } catch (err) {
    callback(err)
    console.log('\x1B[31m%s\x1B[0m', 'sequelize model dir undefine')
    return
  }

  try {
    connect.authenticate()
    await connect.sync()
    app[config.name] = connect
    callback()
  } catch (error) {
    error.message = `DB connection error: ${error.message}`
    callback(error)
  }

}

export default connect
