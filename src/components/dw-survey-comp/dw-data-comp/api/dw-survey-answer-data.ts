import request from '@/utils/request';
import type { AxiosResponse } from 'axios';

interface SurveyParams {
  surveyId: string;
  [key: string]: any;
}

interface ApiResponse<T = any> {
  resultCode: number;
  data: T;
  message?: string;
}

/**
 * 获取问卷答案列表
 * @param params 查询参数
 * @returns Promise<AxiosResponse<ApiResponse>>
 */
export function dwSurveyAnswerListV6(params: SurveyParams): Promise<AxiosResponse<ApiResponse>> {
  return request({
    url: '/api/dwsurvey/app/v6/dw-answer-data-survey/list.do',
    method: 'get',
    params
  });
}

/**
 * 获取问卷统计数据
 * @param params 查询参数
 * @returns Promise<AxiosResponse<ApiResponse>>
 */
export function dwSurveyAnswerStatsV6(params: any): Promise<AxiosResponse<ApiResponse>> {
  return request({
    url: '/api/dwsurvey/app/v6/dw-answer-data-survey/survey-stats.do',
    method: 'get',
    params
  });
}

/**
 * 执行异步答卷信息导出
 * @param params 导出参数
 * @returns Promise<AxiosResponse<ApiResponse>>
 */
export function dwSurveyAnswerExportSync(params: any): Promise<AxiosResponse<ApiResponse>> {
  return request({
    url: '/api/dwsurvey/app/v6/dw-answer-data-survey/export-by-sync.do',
    method: 'get',
    params
  });
}

/**
 * 查询异步答卷信息进度信息
 * @param params 查询参数
 * @returns Promise<AxiosResponse<ApiResponse>>
 */
export function dwSurveyAnswerExportLogInfo(params: any): Promise<AxiosResponse<ApiResponse>> {
  return request({
    url: '/api/dwsurvey/app/v6/answer/export-log/export-log-info.do',
    method: 'get',
    params
  });
} 