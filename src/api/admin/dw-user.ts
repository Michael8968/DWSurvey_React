import { ApiService } from '../apiService';
import { ApiEndpoints } from '../endpoints';
import { AdminUser, AdminUserListParams, AdminUserListResponse } from '../types';

const api = ApiService.getInstance();

export const adminUserApi = {
  // 获取管理员用户列表
  getList: (params: AdminUserListParams) => {
    return api.getAdminUserList(params);
  },

  // 创建管理员用户
  create: (data: Omit<AdminUser, 'id' | 'createTime'>) => {
    return api.createAdminUser(data);
  },

  // 更新管理员用户
  update: (data: Partial<AdminUser> & { id: string }) => {
    return api.updateAdminUser(data);
  },

  // 删除管理员用户
  delete: (id: string) => {
    return api.deleteAdminUser(id);
  }
}; 