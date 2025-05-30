export const dwGetMsgType = (type: string): string => {
  const types: { [key: string]: string } = {
    'success': 'success',
    'error': 'error',
    'warning': 'warning',
    'info': 'info'
  };
  return types[type] || 'info';
};

export const dwGetMsgIcon = (type: string): string => {
  const icons: { [key: string]: string } = {
    'success': 'icon-success',
    'error': 'icon-error',
    'warning': 'icon-warning',
    'info': 'icon-info'
  };
  return icons[type] || 'icon-info';
};

export const dwGetMsgColor = (type: string): string => {
  const colors: { [key: string]: string } = {
    'success': '#52c41a',
    'error': '#f5222d',
    'warning': '#faad14',
    'info': '#1890ff'
  };
  return colors[type] || '#1890ff';
};

export const showReadNotify = (survey: any) => {
  if (survey.readonly) {
    // 使用 antd 的 message 组件显示提示
    const { message } = require('antd');
    message.info('当前为只读模式');
    return true;
  }
  return false;
}; 