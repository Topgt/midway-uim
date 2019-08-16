import { provide, scope, ScopeEnum } from 'midway'
import * as path from 'path'
import * as moment from 'moment'
import * as _ from 'lodash'
import {Logger, FileBufferTransport, FileTransport} from 'egg-logger'

interface IstatConfig {
  buffer?: boolean
  dir: string
  fileName: string
  flushInterval?:number
}

interface obj {
  [key:string]: string
}

const dropKeys = (keys:string[], object:obj):obj => 
  Object.keys(object)
  .filter(_key => !keys.includes(_key))
  .reduce((start:obj, key:string)=>{
    const result = start
    result[key] = object[key]
    return result
  }, {})

function getCurTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

class Dot extends Logger {

  constructor (options:IstatConfig) {
    super({})
    const {buffer, dir, fileName, flushInterval} = options
    let fileTransport
    if (buffer) {
      fileTransport = new FileBufferTransport({
        file: path.resolve(dir, fileName),
        level: 'INFO',
        flushInterval,
      })
    } else {
      fileTransport = new FileTransport({
        file: path.resolve(dir, fileName),
        level: 'INFO'
      })
    }
    this.set('file', fileTransport);
  }

  public looger(lt: string, data:any) {
    const msg: string[] = [];
    msg.push(`tm=${getCurTime()}`, `lt=${lt}`);
    Object.keys(data).forEach(key => {
      msg.push(`${key}=${data[key]}`);
    });
    this.log('INFO', [msg.join('`')], {});
  }
}

@scope(ScopeEnum.Singleton)
@provide('Stat')
export default class Stat {

  static dot: any

  public static initStat (options: IstatConfig) {
    this.dot = new Dot(options)
  }
  looger(name: string, info: any) {
    const body = _.pickBy(
      _.merge({
        e_c: name,
      }, dropKeys(['t', 'lt', 'e_c'], info)),
    (value:any) => typeof value !== 'undefined')
    if(Stat.dot) {
      Stat.dot.looger('', body)
    }
  }
}