import {Context} from 'midway'
import {Response} from '../../utils'
import * as path from 'path'
import * as fs from 'fs'

export default class IndexController {
	public async version(ctx: Context) {
		Response.ok(ctx, {version: '1.0.0'})
	}

	async render(ctx: Context) {
		const app: any = ctx.app
		const filePath = path.resolve(app.appDir, './client/index.html')
		const html = fs.readFileSync(filePath, 'utf-8')
		ctx.set('content-type', 'text/html');
		ctx.body = html;
	}

	async gzip(ctx: Context) {
		const app: any = ctx.app
		const uri: string = ctx.request.path
		const filePath = path.resolve(app.appDir, `./client/${uri}`)
		const text = fs.readFileSync(filePath, 'utf-8');
		if (/.*\.js/.test(filePath)) {
			ctx.set('content-type', 'application/x-javascript');
		} else {
			ctx.set('content-type', 'text/css')
		}
		ctx.body = text
	}
}
