import { message, Modal } from 'antd';

export const msgError = (content: string) => {
  message.error({
    content,
    duration: 5
  });
};

export const msgInfo = (content: string) => {
  message.info({
    content,
    duration: 5
  });
};

export const msgWarning = (content: string) => {
  message.warning({
    content,
    duration: 5
  });
};

export const msgBoxNoLogin = () => {
  window.location.href = '/login';
  Modal.confirm({
    title: '系统提示',
    content: '未登录状态，是否重新登录',
    okText: '重新登录',
    cancelText: '取消',
    onOk: () => {
      window.location.href = '/login';
    }
  });
};

export const msgBoxNoRole = () => {
  Modal.confirm({
    title: '系统提示',
    content: '账号没有相关操作权限',
    okText: '确认',
    cancelButtonProps: { style: { display: 'none' } },
    onOk: () => {
      window.location.href = '/';
    }
  });
}; 