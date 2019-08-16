import { Context, inject, controller, get, provide } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @inject('Stat')
  Stat: any

  @get('/')
  async index() {
    this.Stat.looger('create', {active: '浏览'})
    this.ctx.body = `Welcome to midwayjs!`;
  }
}
