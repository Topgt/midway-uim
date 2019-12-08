import { EggPlugin } from 'midway'
import * as path from 'path'

export default {
  static: true, // default is true
  mysql: {
    enable: false,
    path: path.join(__dirname, '../lib/sequelize'),
  }

} as EggPlugin
