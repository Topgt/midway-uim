import { Context, inject } from 'midway'
import * as fs from 'fs'
import * as path from 'path'
import {promisify, Response} from '../../utils'
import {Istat} from '../../lib/stat'

const stat =  promisify(fs.stat)
const readFile = promisify(fs.readFile)

export default class FileController {

  @inject('Stat')
  Stat: Istat

  async content(ctx: Context) {
    const {app} = ctx
    const filePath = path.resolve(app.config.dir, './static/个人简历.md')

    const content = await readFile(filePath, {encoding: 'utf-8'})
    const dirent: any = await stat(filePath);
    Response.ok(ctx, {content, fileSize: dirent.size})
  }

  async downLoad(ctx: Context) {
    const {app} = ctx
    const filePath = path.resolve(app.config.dir, './static/个人简历.md')

    const readStream = fs.createReadStream(filePath)
    const dirent: any = await stat(filePath);
    ctx.response.attachment('个人简历.md')
    ctx.set('Content-Length', `${dirent.size}`);
    ctx.body = readStream
  }
}
