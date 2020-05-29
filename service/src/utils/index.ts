import { Context } from 'midway'

type Ifun = (...args: any) => void
const promisify = (Function: Ifun) => {
  return (...args: any) => {
    return new Promise((resolve, reject) => {
      Function.call(null, ...args, (err: boolean, ...data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(...data);
        }
      });
    });
  };
};

type Iok = (ctx: Context, result?: any, message?: string) => void
type Ierr = (ctx: Context, message?: string | number, pCode?: number) => void
type Idownload = (ctx: Context, readStream: any, fileName?: string, fileSize?: number) => void
interface Iresponse {
  ok: Iok
  error: Ierr
  download: Idownload
}
const Response: Iresponse = {
  ok(ctx, result, message) {
    ctx.response.status = 200
    ctx.body = {
      success: true,
      result,
      message: message || 'ok',
    }
  },

  error(ctx, message, pCode= 500) {
    let code = pCode
    if (typeof message === 'number') {
      code = message
    }
    ctx.response.status = code
    ctx.body = {
      success: true,
      message: message || 'error',
    }
  },

  download(ctx, readStream, fileName= 'file', fileSize= 0) {
    ctx.response.attachment(fileName)
    ctx.set('Content-Length', `${fileSize}`);
    ctx.body = readStream
  }

}

export {promisify, Response}
