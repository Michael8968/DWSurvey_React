import { ApiService } from './apiService';
export { ApiService } from './apiService';
export { ApiEndpoints } from './endpoints';
export * from './types';

// 导出 API 服务实例
export const api = ApiService.getInstance(); 