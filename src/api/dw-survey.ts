import { ApiService } from './apiService';
import { ApiEndpoints } from './endpoints';
import { Survey, SurveyListParams, SurveyListResponse, Answer, AnswerListParams, AnswerListResponse } from './types';

const api = ApiService.getInstance();

export const surveyApi = {
  // 获取问卷列表
  getList: (params: SurveyListParams) => {
    return api.getSurveyList(params);
  },

  // 获取问卷详情
  getInfo: (id: string) => {
    return api.getSurveyInfo(id);
  },

  // 更新问卷
  update: (data: Partial<Survey>) => {
    return api.updateSurvey(data);
  },

  // 创建问卷
  create: (data: Omit<Survey, 'id' | 'createTime' | 'updateTime'>) => {
    return api.createSurvey(data);
  },

  // 更新问卷状态
  updateState: (data: { id: string; status: number }) => {
    return api.updateSurveyState(data);
  },

  // 复制问卷
  copy: (id: string) => {
    return api.copySurvey(id);
  },

  // 删除问卷
  delete: (id: string) => {
    return api.deleteSurvey(id);
  },

  // 获取问卷报告
  getReport: (id: string) => {
    return api.getSurveyReport(id);
  },

  // 获取答案列表
  getAnswerList: (params: AnswerListParams) => {
    return api.getAnswerList(params);
  },

  // 获取答案详情
  getAnswerInfo: (id: string) => {
    return api.getAnswerInfo(id);
  },

  // 导出答案
  exportAnswers: (id: string) => {
    return api.exportAnswers(id);
  },

  // 删除答案
  deleteAnswer: (id: string) => {
    return api.deleteAnswer(id);
  }
}; 