import axios from 'axios';
import request from '@/utils/request';

export const dwUserPwd = async (oldPass: string, newPass: string) => {
  return axios.post('/api/user/password', {
    oldPassword: oldPass,
    newPassword: newPass
  });
};

export const dwUserInfo = () => {
  return request({
    url: '/api/user/info',
    method: 'get'
  });
}; 