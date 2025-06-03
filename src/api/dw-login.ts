import request from '@/utils/request'
import API from '@/api/index.js'
import DwAuthorized from '../utils/dw-authorized'

// 登录方法
export function dwLogin (params: any) {
  // const params = {userName, password, type: 'account'}
  return request({
    url: API.loginIn,
    method: 'post',
    params
  })
}

export function wxLoginTicket (params: any) {
  return request({
    url: API.loginWxQrCode,
    method: 'post',
    params
  })
}

export function wxLoginTicketStatus (params: any) {
  return request({
    url: API.loginWxStatus,
    method: 'post',
    params
  })
}

export function sendFakeCaptcha (params: any) {
  return request({
    url: API.loginSendSms,
    method: 'post',
    params
  })
}

// 退出方法
export function logout () {
  // token方案
  DwAuthorized.setToken('')
  DwAuthorized.setAuthorityStr('')
  DwAuthorized.setUserName('')
  // session方案
  return request({
    url: API.logOut,
    method: 'post'
  })
}

// 登录方法
export function dwRegister (params: any) {
  // const params = {userName, password, type: 'account'}
  return request({
    url: API.register,
    method: 'post',
    params
  })
}

export function answerLoginSurveyInfo (sid: string) {
  const params = {sid}
  return request({
    url: '/api/dwsurvey/anon/response/survey_info.do',
    method: 'post',
    params
  })
}

export function verifiedCaptchaCode (params: any) {
  return request({
    url: '/api/dwsurvey/anon/jcap/jcaptcha-check.do',
    method: 'post',
    params
  })
}

export function loginProps () {
  return request({
    url: '/api/dwsurvey/anon/security/login-props.do',
    method: 'get'
  })
}

