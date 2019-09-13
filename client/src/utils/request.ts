// import {fetch} from 'dva'
import { notification } from 'antd'
import md5 from 'md5'
import { Base64 } from 'js-base64'
// import router from 'umi/router'

const codeMessage:{
  [key: number]: string
} = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

interface Iresult {
  success: boolean
  result: any
  message: string
}

// 加盐
const salting = 'admin-authority'

const checkStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    const res = response.clone()
    res.json().then((result: Iresult) => {
      if(result.success && result.result && result.result.keycode) {
        const keycode = result.result.keycode
        sessionStorage.setItem('keycode', Base64.encode(keycode + salting))
      }
    })
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  notification.error({
    message: `操作失败   ${response.status}`,
    description: `${errortext}
                  ${response.body || ''}`,
  })
  const error: any = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error
}

export default function request(url:string, options={}) {
  let  fetchUrl = encodeURI(url)
  const key = sessionStorage.getItem('keycode') || ''
  let decodeName = Base64.decode(key) || salting
  decodeName = decodeName.split(salting)[0]
  if(decodeName) {
    const tm = Date.now()
    const sign = md5(`${decodeName}&${tm}`)
    if(fetchUrl.indexOf('?') < 0) {
      fetchUrl = `${fetchUrl}?tm=${tm}&sign=${sign}`
    } else {
      fetchUrl = /\$$/.test(fetchUrl) ? `${fetchUrl}tm=${tm}&sign=${sign}` : `${fetchUrl}&tm=${tm}&sign=${sign}`
    }
  }
  const newOptions:{[key: string]: string | object} = { ...options }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json charset=utf-8',
        ...(newOptions.headers as any),
      }
      newOptions.body = JSON.stringify(newOptions.body)
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...(newOptions.headers as any),
      }
    }
  }
  return fetch(fetchUrl, newOptions)
    .then(checkStatus)
    .then((response: Response) => {
      const contentType = response.headers.get('Content-Type')
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text()
      } if (contentType && contentType.match(/application\/json/i)) {
        return response.json()
      } if (contentType && contentType.match(/application\/xml/i)) {
        return response.text()
      } if (contentType && contentType.match(/application\/img/i)) {
        return response.blob()
      }
      return response
    })
    .catch((e: any) => {
      const status = e.name
      if (status === 401) {
        (<any>window).g_app._store.dispatch({
          type: 'login/logout',
        })
        return
      }
      // environment should not be used
      if (status === 403) {
        // router.push('/exception/403')
        return
      }
      if (status <= 504 && status >= 500) {
        // router.push('/exception/500')
        return
      }
      if (status >= 404 && status < 422) {
        // router.push('/exception/404')
      }
    })
}
