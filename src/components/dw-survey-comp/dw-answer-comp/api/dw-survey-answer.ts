import request from '@/utils/request';
import type { AxiosResponse } from 'axios';

interface SurveyParams {
  surveyId: string;
  [key: string]: any;
}

interface SurveyAnswerData {
  surveyId: string;
  answerJson: string;
  [key: string]: any;
}

interface ApiResponse<T = any> {
  resultCode: number;
  data: T;
  message?: string;
}

/**
 * 获取问卷设计原始JSON
 * @param params 查询参数
 * @returns Promise<AxiosResponse<ApiResponse>>
 */
export function dwSurveyJsonBySurveyId(params: SurveyParams): Promise<AxiosResponse<ApiResponse>> {
  return request({
    url: '/api/dwsurvey/none/v6/dw-answer-survey/survey-json-by-survey-id.do',
    method: 'get',
    params
  });
}

/**
 * 保存答卷原始JSON
 * @param data 答卷数据
 * @returns Promise<AxiosResponse<ApiResponse>>
 */
export function dwSaveSurveyAnswerJson(data: SurveyAnswerData): Promise<AxiosResponse<ApiResponse>> {
  return request({
    url: '/api/dwsurvey/none/v6/dw-answer-survey/save-survey-answer.do',
    method: 'post',
    data
  });
}

/**
 * 根据ID获取问卷答案
 * @param params 查询参数
 * @returns Promise<AxiosResponse<ApiResponse>>
 */
export function dwSurveyAnswerById(params: SurveyParams): Promise<AxiosResponse<ApiResponse>> {
  return request({
    url: '/api/dwsurvey/none/v6/dw-answer-survey/get-survey-answer.do',
    method: 'get',
    params
  });
}

/**
 * 检查问卷答案密码
 * @param params 查询参数
 * @returns Promise<AxiosResponse<ApiResponse>>
 */
export function dwSurveyAnswerCheckPwd(params: SurveyParams): Promise<AxiosResponse<ApiResponse>> {
  return request({
    url: '/api/dwsurvey/none/v6/dw-answer-survey/check-answer-pwd.do',
    method: 'get',
    params
  });
} 