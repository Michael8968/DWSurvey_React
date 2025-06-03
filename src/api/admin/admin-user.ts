import request from '@/utils/request'
import API from '@/api/index'

// 登录方法
export function dwAdminUserList (pageSize: number, current: number, status: number, loginName: string) {
  const params = {
    pageSize,
    current,
    status,
    loginName
  }
  return request({
    url: API.adminUserList,
    method: 'get',
    params
  })
}

/**
 * 创建用户
 * @param data
 * @returns {*}
 */
export function dwUserCreate (data: any) {
  return request({
    url: API.adminUserCreate,
    method: 'post',
    data
  })
}

export function dwUserUpdate (data: any) {
  return request({
    url: API.adminUserUpdate,
    method: 'put',
    data
  })
}

export function dwUserDelete (data: any) {
  return request({
    url: API.adminUserDelete,
    method: 'delete',
    data
  })
}
