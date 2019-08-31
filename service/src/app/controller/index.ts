import {Context} from 'midway'
import {Response} from '../../utils'
const fs = require('fs');

export default class IndexController {
	public async version(ctx: Context) {
		Response.ok(ctx, {version: '1.0.0'})
	}

	async render(ctx: Context) {
		const html = fs.readFileSync('./app/public/index.html', 'utf-8')
		ctx.set('content-type', 'text/html');
		ctx.body = html;
	}

	async gzip(ctx: Context) {
		const path = ctx.request.path;
		const text = fs.readFileSync(`./app/public${path}`, 'utf-8');
		if (/.*\.js/.test(path)) {
			ctx.set('content-type', 'application/x-javascript');
		} else {
			ctx.set('content-type', 'text/css')
		}
		ctx.body = text
	}
}
