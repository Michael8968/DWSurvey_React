import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiEndpoints } from './endpoints';
import {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  UserInfo,
  Survey,
  SurveyListParams,
  SurveyListResponse,
  Answer,
  AnswerListParams,
  AnswerListResponse,
  AdminUser,
  AdminUserListParams,
  AdminUserListResponse
} from './types';

export class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || '',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          // 处理未授权错误
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // 通用请求方法
  private async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      return await this.axiosInstance.request(config);
    } catch (error) {
      throw error;
    }
  }

  // 登录相关 API
  async login(data: LoginRequest): Promise<ApiResponse<{ token: string }>> {
    return this.request({ method: 'POST', url: ApiEndpoints.LOGIN_IN, data });
  }

  async loginWithPassword(data: LoginRequest): Promise<ApiResponse<{ token: string }>> {
    return this.request({ method: 'POST', url: ApiEndpoints.LOGIN_IN_PWD, data });
  }

  async getWxQrCode(): Promise<ApiResponse<{ qrCode: string }>> {
    return this.request({ method: 'GET', url: ApiEndpoints.LOGIN_WX_QR_CODE });
  }

  async checkWxLoginStatus(): Promise<ApiResponse<{ status: number }>> {
    return this.request({ method: 'GET', url: ApiEndpoints.LOGIN_WX_STATUS });
  }

  async sendSmsCode(data: { phone: string }): Promise<ApiResponse<void>> {
    return this.request({ method: 'POST', url: ApiEndpoints.LOGIN_SEND_SMS, data });
  }

  async register(data: RegisterRequest): Promise<ApiResponse<void>> {
    return this.request({ method: 'POST', url: ApiEndpoints.REGISTER, data });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request({ method: 'POST', url: ApiEndpoints.LOGOUT });
  }

  // 问卷相关 API
  async getSurveyList(params: SurveyListParams): Promise<ApiResponse<SurveyListResponse>> {
    return this.request({ method: 'GET', url: ApiEndpoints.SURVEY_LIST, params });
  }

  async getSurveyInfo(id: string): Promise<ApiResponse<Survey>> {
    return this.request({ method: 'GET', url: ApiEndpoints.SURVEY_INFO, params: { id } });
  }

  async updateSurvey(data: Partial<Survey>): Promise<ApiResponse<void>> {
    return this.request({ method: 'PUT', url: ApiEndpoints.SURVEY_UPDATE, data });
  }

  async createSurvey(data: Omit<Survey, 'id' | 'createTime' | 'updateTime'>): Promise<ApiResponse<{ id: string }>> {
    return this.request({ method: 'POST', url: ApiEndpoints.SURVEY_CREATE, data });
  }

  async updateSurveyState(data: { id: string; status: number }): Promise<ApiResponse<void>> {
    return this.request({ method: 'PUT', url: ApiEndpoints.SURVEY_UP_STATE, data });
  }

  async copySurvey(id: string): Promise<ApiResponse<{ id: string }>> {
    return this.request({ method: 'POST', url: ApiEndpoints.SURVEY_COPY, data: { id } });
  }

  async deleteSurvey(id: string): Promise<ApiResponse<void>> {
    return this.request({ method: 'DELETE', url: ApiEndpoints.SURVEY_DELETE, data: { id } });
  }

  // 答案相关 API
  async getSurveyReport(id: string): Promise<ApiResponse<any>> {
    return this.request({ method: 'GET', url: ApiEndpoints.SURVEY_REPORT, params: { id } });
  }

  async getAnswerList(params: AnswerListParams): Promise<ApiResponse<AnswerListResponse>> {
    return this.request({ method: 'GET', url: ApiEndpoints.SURVEY_ANSWER_LIST, params });
  }

  async getAnswerInfo(id: string): Promise<ApiResponse<Answer>> {
    return this.request({ method: 'GET', url: ApiEndpoints.SURVEY_ANSWER_INFO, params: { id } });
  }

  async exportAnswers(id: string): Promise<Blob> {
    const response = await this.axiosInstance.get(ApiEndpoints.SURVEY_ANSWER_EXPORT, {
      params: { id },
      responseType: 'blob'
    });
    return response.data;
  }

  async deleteAnswer(id: string): Promise<ApiResponse<void>> {
    return this.request({ method: 'DELETE', url: ApiEndpoints.SURVEY_ANSWER_DELETE, data: { id } });
  }

  // 用户相关 API
  async getCurrentUser(): Promise<ApiResponse<UserInfo>> {
    return this.request({ method: 'GET', url: ApiEndpoints.CUR_USER_INFO });
  }

  async updatePassword(data: { oldPassword: string; newPassword: string }): Promise<ApiResponse<void>> {
    return this.request({ method: 'PUT', url: ApiEndpoints.CUR_USER_PWD_UPDATE, data });
  }

  // 管理员用户 API
  async getAdminUserList(params: AdminUserListParams): Promise<ApiResponse<AdminUserListResponse>> {
    return this.request({ method: 'GET', url: ApiEndpoints.ADMIN_USER_LIST, params });
  }

  async createAdminUser(data: Omit<AdminUser, 'id' | 'createTime'>): Promise<ApiResponse<{ id: string }>> {
    return this.request({ method: 'POST', url: ApiEndpoints.ADMIN_USER_CREATE, data });
  }

  async updateAdminUser(data: Partial<AdminUser> & { id: string }): Promise<ApiResponse<void>> {
    return this.request({ method: 'PUT', url: ApiEndpoints.ADMIN_USER_UPDATE, data });
  }

  async deleteAdminUser(id: string): Promise<ApiResponse<void>> {
    return this.request({ method: 'DELETE', url: ApiEndpoints.ADMIN_USER_DELETE, data: { id } });
  }
} 