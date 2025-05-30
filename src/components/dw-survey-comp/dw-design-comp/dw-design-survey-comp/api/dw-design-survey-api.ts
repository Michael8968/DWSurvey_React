import request from '@/utils/request';

interface RequestParams {
  [key: string]: any;
}

interface RequestData {
  [key: string]: any;
}

interface ApiResponse<T> {
  data: T;
  resultCode: number;
  message?: string;
}

export function questionComps(params?: RequestParams): Promise<ApiResponse<any>> {
  return request({
    url: '/api/dwsurvey/app/v6/dw-design-survey/toolbar-qus.do',
    method: 'get',
    params
  });
}

export function querySurveyAll(params: RequestParams): Promise<ApiResponse<any>> {
  return request({
    url: '/api/dwsurvey/app/design/survey-design/surveyAll.do',
    method: 'post',
    params
  });
}

/**
 * 获取问卷设计原始JSON
 * @param params 请求参数
 * @returns Promise<ApiResponse<any>>
 */
export function surveyJsonDesignBySurveyId(params: RequestParams): Promise<ApiResponse<any>> {
  return request({
    url: '/api/dwsurvey/app/v6/dw-design-survey/survey-json-by-survey-id.do',
    method: 'get',
    params
  });
}

/**
 * 保存问卷设计原始JSON
 * @param data 请求数据
 * @returns Promise<ApiResponse<any>>
 */
export function dwSaveSurveyJson(data: RequestData): Promise<ApiResponse<any>> {
  return request({
    url: '/api/dwsurvey/app/v6/dw-design-survey/save-survey-json.do',
    method: 'post',
    data
  });
}

export function dwDevSurvey(params: RequestParams): Promise<ApiResponse<any>> {
  return request({
    url: '/api/dwsurvey/app/v6/dw-design-survey/dev-survey.do',
    method: 'post',
    params
  });
} 