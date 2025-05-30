import request from '@/utils/request';

interface ApiResponse<T> {
  data: T;
  resultCode: number;
  message?: string;
}

export function bankQuestions(): Promise<ApiResponse<any>> {
  return request({
    url: '/api/dwsurvey/app/v6/dw-design-survey/bank-qus.do',
    method: 'get'
  });
} 