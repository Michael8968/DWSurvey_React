// 通用响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 用户相关类型
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  phone?: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  phone?: string;
  role: string;
  createTime: string;
}

// 问卷相关类型
export interface Survey {
  id: string;
  title: string;
  description?: string;
  status: number;
  createTime: string;
  updateTime: string;
}

export interface SurveyListParams {
  pageNum: number;
  pageSize: number;
  keyword?: string;
  status?: number;
}

export interface SurveyListResponse {
  total: number;
  list: Survey[];
}

// 答案相关类型
export interface Answer {
  id: string;
  surveyId: string;
  content: string;
  createTime: string;
}

export interface AnswerListParams {
  surveyId: string;
  pageNum: number;
  pageSize: number;
}

export interface AnswerListResponse {
  total: number;
  list: Answer[];
}

// 管理员用户相关类型
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  status: number;
  createTime: string;
}

export interface AdminUserListParams {
  pageNum: number;
  pageSize: number;
  keyword?: string;
  role?: string;
}

export interface AdminUserListResponse {
  total: number;
  list: AdminUser[];
} 