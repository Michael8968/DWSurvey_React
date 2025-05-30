export enum ApiEndpoints {
  // 账号密码登录登出
  LOGIN_IN = '/api/dwsurvey/anon/security-token/login.do',
  LOGIN_IN_PWD = '/api/dwsurvey/anon/security/login-pwd.do',
  LOGIN_WX_QR_CODE = '/api/dwsurvey/anon/security/wx-login-qrcode.do',
  LOGIN_WX_STATUS = '/api/dwsurvey/anon/security/login-weixin.do',
  LOGIN_SEND_SMS = '/api/dwsurvey/anon/security/send-smscode.do',
  REGISTER = '/api/dwsurvey/anon/security/register.do',
  LOGOUT = '/api/dwsurvey/anon/security/logout.do',

  // 问卷数据
  SURVEY_LIST = '/api/dwsurvey/app/survey/list.do',
  SURVEY_INFO = '/api/dwsurvey/app/survey/info.do',
  SURVEY_UPDATE = '/api/dwsurvey/app/survey/survey-base-attr.do',
  SURVEY_CREATE = '/api/dwsurvey/app/survey/add.do',
  SURVEY_UP_STATE = '/api/dwsurvey/app/survey/up-survey-status.do',
  SURVEY_COPY = '/api/dwsurvey/app/survey/copy.do',
  SURVEY_DELETE = '/api/dwsurvey/app/survey/delete.do',
  SURVEY_REPORT = '/api/dwsurvey/app/stats/report.do',
  SURVEY_ANSWER_LIST = '/api/dwsurvey/app/answer/list.do',
  SURVEY_ANSWER_INFO = '/api/dwsurvey/app/answer/info.do',
  SURVEY_ANSWER_EXPORT = '/api/dwsurvey/app/answer/export-xls.do',
  SURVEY_ANSWER_DELETE = '/api/dwsurvey/app/answer/delete.do',
  SURVEY_FOOTER_INFO = '/api/dwsurvey/anon/web/footer-info.do',

  // 管理员用户
  ADMIN_USER_LIST = '/api/dwsurvey/admin/user/list.do',
  ADMIN_USER_CREATE = '/api/dwsurvey/admin/user/add.do',
  ADMIN_USER_UPDATE = '/api/dwsurvey/admin/user/edit.do',
  ADMIN_USER_DELETE = '/api/dwsurvey/admin/user/delete.do',

  // 当前用户
  CUR_USER_INFO = '/api/dwsurvey/app/user/currentUser.do',
  CUR_USER_PWD_UPDATE = '/api/dwsurvey/app/user/up-pwd.do'
} 