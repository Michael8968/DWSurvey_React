import request from '@/utils/request'
import { ApiEndpoints } from './endpoints'
import DwAuthorized from '@/utils/auth'

interface LoginParams {
  userName: string
  password: string
  type?: string
}

interface RegisterParams {
  userName: string
  password: string
  phone?: string
  email?: string
}

interface SmsParams {
  phone: string
}

// 登录方法
export function dwLogin(params: LoginParams) {
  return request({
    url: ApiEndpoints.LOGIN_IN,
    method: 'post',
    params
  })
}

// 密码登录
export function dwLoginWithPassword(params: LoginParams) {
  return request({
    url: ApiEndpoints.LOGIN_IN_PWD,
    method: 'post',
    params
  })
}

// 获取微信二维码
export function wxLoginTicket() {
  return request({
    url: ApiEndpoints.LOGIN_WX_QR_CODE,
    method: 'get'
  })
}

// 检查微信登录状态
export function wxLoginTicketStatus() {
  return request({
    url: ApiEndpoints.LOGIN_WX_STATUS,
    method: 'get'
  })
}

// 发送短信验证码
export function sendFakeCaptcha(params: SmsParams) {
  return request({
    url: ApiEndpoints.LOGIN_SEND_SMS,
    method: 'post',
    params
  })
}

// 注册
export function dwRegister(params: RegisterParams) {
  return request({
    url: ApiEndpoints.REGISTER,
    method: 'post',
    params
  })
}

// 退出方法
export function logout() {
  // token方案
  DwAuthorized.setToken('')
  DwAuthorized.setAuthorityStr('')
  DwAuthorized.setUserName('')
  // session方案
  return request({
    url: ApiEndpoints.LOGOUT,
    method: 'post'
  })
}

// 获取问卷信息
export function answerLoginSurveyInfo(sid: string) {
  return request({
    url: '/api/dwsurvey/anon/response/survey_info.do',
    method: 'post',
    params: { sid }
  })
}

// 验证码校验
export function verifiedCaptchaCode(params: { code: string }) {
  return request({
    url: '/api/dwsurvey/anon/jcap/jcaptcha-check.do',
    method: 'post',
    params
  })
}

// 获取登录属性
export function loginProps() {
  return request({
    url: '/api/dwsurvey/anon/security/login-props.do',
    method: 'get'
  })
} 