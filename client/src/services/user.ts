import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function userInfo() {
  return request('/api/user_info')
}

export async function getAuthority() {
  return request('/api/authority')
}
