import { Context, inject } from 'midway'
import * as fs from 'fs'
import * as path from 'path'
import {promisify, Response} from '../../utils'
import {Istat} from '../../lib/stat'

export default class FileController {

  @inject('Stat')
  Stat: Istat

  async content(ctx: Context) {
    const filePath = path.resolve(__dirname, '../public/个人简历.md')
    const readFile = promisify(fs.readFile)
    const content = await readFile(filePath, {encoding: 'utf-8'})
    const stat =  promisify(fs.stat)
    const dirent: any = await stat(filePath);
    Response.ok(ctx, {content, fileSize: dirent.size})
  }
}
