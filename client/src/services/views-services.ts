import { stringify } from 'qs';
import request from '@/utils/request';

export async function downLoad (params: any) {
  window.open(`/app/down_load?${stringify(params)}`)
}

export async function queryFileContent(params: any) {
  return request(`/app/file_content?${stringify(params)}`);
}
