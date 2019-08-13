import { provide, scope, ScopeEnum } from 'midway';
import {Sequelize} from 'sequelize-typescript';
import * as path from 'path'

@scope(ScopeEnum.Singleton)
@provide()
export default class DB {

  public static async creatConnect(config: any) {  //config: ISequelizeConfig
    const connect = new Sequelize(config)

    const modelPath = path.resolve(__dirname, '../models/mysql')
    connect.addModels([
      modelPath + '/*.model.*',
    ]);

    try {
      connect.authenticate()
      await connect.sync()
    } catch (error) {
      error.message = `DB connection error: ${error.message}`
      throw error;
    }
  }

}
