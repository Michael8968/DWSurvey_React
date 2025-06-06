import request from '@/utils/request'
import API from '@/api/index.js'

/**
 * 问卷列表
 * @param pageSize
 * @param current
 * @returns {*}
 */
export function dwSurveyList (pageSize: number, current: number, surveyName: string, surveyState: number) {
  const params = {
    pageSize,
    current,
    surveyName,
    surveyState
  }
  return request({
    url: API.surveyList,
    method: 'get',
    params
  })
}
/**
 * 创建问卷
 * @param data
 * @returns {*}
 */
export function dwSurveyCreate (data: any) {
  return request({
    url: API.surveyCreate,
    method: 'post',
    data
  })
}

/**
 * 更新问卷状态
 * @param surveyId
 * @param surveyState
 * @returns {*}
 */
export function dwSurveyUpState (surveyId: string, surveyState: number) {
  const params = {
    surveyId,
    surveyState
  }
  return request({
    url: API.surveyUpState,
    method: 'post',
    params
  })
}
/**
 * 复制问卷
 * @param data
 * @returns {*}
 */
export function dwSurveyCopy (fromSurveyId: string, surveyName: string) {
  const params = {
    fromSurveyId,
    surveyName,
    tag: '2'
  }
  return request({
    url: API.surveyCopy,
    method: 'post',
    params
  })
}
/**
 * 获取问卷信息
 * @param surveyId
 * @returns {*}
 */
export function dwSurveyInfo (surveyId: string) {
  const params = {
    id: surveyId
  }
  return request({
    url: API.surveyInfo,
    method: 'get',
    params
  })
}
/**
 * 更新问卷信息
 * @param data
 * @returns {*}
 */
export function dwSurveyUpdate (data: any) {
  return request({
    url: API.surveyUpdate,
    method: 'put',
    data
  })
}
/**
 * 更新问卷信息
 * @param data
 * @returns {*}
 */
export function dwSurveyDelete (data: any) {
  return request({
    url: API.surveyDelete,
    method: 'delete',
    data
  })
}
/**
 * 获取问卷的统计信息
 * @param surveyId
 * @returns {*}
 */
export function dwSurveyReport (surveyId: string) {
  const params = {
    surveyId
  }
  return request({
    url: API.surveyReport,
    method: 'get',
    params
  })
}
/**
 * 获取问卷的答卷列表
 * @param pageSize
 * @param current
 * @param surveyId
 * @returns {*}
 */
export function dwSurveyAnswerList (pageSize: number, current: number, surveyId: string) {
  const params = {
    pageSize,
    current,
    surveyId
  }
  return request({
    url: API.surveyAnswerList,
    method: 'get',
    params
  })
}
/**
 * 更新问卷信息
 * @param data
 * @returns {*}
 */
export function dwSurveyAnswerDelete (data: any) {
  return request({
    url: API.surveyAnswerDelete,
    method: 'delete',
    data
  })
}
/**
 * 获取问卷答卷详情
 * @param answerId
 * @returns {*}
 */
export function dwSurveyAnswerInfo (answerId: string) {
  const params = {
    answerId
  }
  return request({
    url: API.surveyAnswerInfo,
    method: 'get',
    params
  })
}

/**
 * 更新问卷信息
 * @param data
 * @returns {*}
 */
export function dwSurveyAnswerDeleteByEs (data: any) {
  return request({
    url: '/api/dwsurvey/app/v6/dw-answer-data-survey/delete-answer.do',
    method: 'delete',
    data
  })
}
