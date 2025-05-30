import auth from './auth';

interface BrowserInfo {
  version: number;
  plat: string;
  type: string;
  pc: string;
  prefix: string;
  isMobile: boolean;
}

export const hasRoleOrPermCode = (permissionRoles: string[] | null | undefined): boolean => {
  if (!permissionRoles || permissionRoles.length === 0) return true;
  
  const authority = auth.getAuthority();
  if (authority) {
    return authority.some(role => permissionRoles.includes(role));
  }
  return false;
};

export const getBrowser = (): BrowserInfo => {
  const ua = navigator.userAgent.toLowerCase();
  if (!ua) {
    return {
      version: 0,
      plat: 'a',
      type: '',
      pc: 'pc',
      prefix: '',
      isMobile: false
    };
  }

  const btypeInfo = (ua.match(/firefox|chrome|safari|opera/g) || ['other'])[0];
  const isMsie = (ua.match(/msie|trident/g) || [])[0];
  const browserType = isMsie ? 'msie' : btypeInfo;

  let pc = 'pc';
  const isTouch = ('ontouchstart' in window) || (ua.indexOf('touch') !== -1) || (ua.indexOf('mobile') !== -1);
  
  if (isTouch) {
    if (ua.indexOf('ipad') !== -1) {
      pc = 'pad';
    } else if (ua.indexOf('mobile') !== -1) {
      pc = 'mobile';
    } else if (ua.indexOf('android') !== -1) {
      pc = 'androidPad';
    }
  }

  let prefix = 'webkit';
  switch (browserType) {
    case 'msie':
      prefix = 'ms';
      break;
    case 'firefox':
      prefix = 'Moz';
      break;
    case 'opera':
      prefix = 'O';
      break;
  }

  const plat = (ua.indexOf('android') > 0) ? 'android' : navigator.platform.toLowerCase();

  return {
    version: 0,
    plat,
    type: browserType,
    pc,
    prefix,
    isMobile: pc !== 'pc'
  };
}; 