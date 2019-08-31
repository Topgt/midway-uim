import { Context, inject, controller, get, provide } from 'midway'
import {Istat} from '../../lib/stat'

@provide()
@controller('/test')
export class HomeController {

  @inject('Stat')
  Stat: Istat

  @get('/')
  async index(ctx: Context) {
    this.Stat.logger('create', {active: '浏览'})
    ctx.body = `Welcome to midwayjs!`;
  }
}
