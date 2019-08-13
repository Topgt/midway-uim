import { provide, config, scope, ScopeEnum } from 'midway'
import * as path from 'path'
import * as moment from 'moment'
import {Logger, FileBufferTransport, FileTransport} from 'egg-logger'

interface IstatConfig {
  buffer?: boolean
  dir: string
  fileName: string
  flushInterval?:number
}

function getCurTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

@scope(ScopeEnum.Singleton)
@provide()
export default class StatService extends Logger {
  @config('statLog')
  statConfig: IstatConfig

  constructor (options:any) {
    super(options)
    const {buffer, dir, fileName, flushInterval} = this.statConfig
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

  public stat(lt: string, data:any) {
    const msg: string[] = [];
    msg.push(`tm=${getCurTime()}`, `lt=${lt}`);
    Object.keys(data).forEach(key => {
      msg.push(`${key}=${data[key]}`);
    });
    this.log('INFO', [msg.join('`')], {});
  }

}