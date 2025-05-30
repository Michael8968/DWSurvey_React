interface Authority {
  setLoginCount: (count: string) => void;
  getLoginCount: () => string;
  setUserName: (userName: string) => void;
  getUserName: () => string;
  setToken: (token: string) => void;
  getToken: () => string | null;
  setAuthority: (authority: string | string[]) => void;
  setAuthorityStr: (authority: string) => void;
  getAuthority: () => string[];
  getDwSessionId: () => string | null;
  setDwSessionId: (sessionId: string) => void;
}

const auth: Authority = {
  setLoginCount(count: string) {
    localStorage.setItem('dw_oss_login_count', count);
  },

  getLoginCount(): string {
    return localStorage.getItem('dw_oss_login_count') || 'none';
  },

  setUserName(userName: string) {
    localStorage.setItem('dw_oss_user_name', userName);
  },

  getUserName(): string {
    return localStorage.getItem('dw_oss_user_name') || 'none';
  },

  setToken(token: string) {
    localStorage.setItem('dw_oss_token', token);
  },

  getToken(): string | null {
    return localStorage.getItem('dw_oss_token');
  },

  setAuthority(authority: string | string[]) {
    const dwAuthority = typeof authority === 'string' ? [authority] : authority;
    localStorage.setItem('dw_oss_authority', JSON.stringify(dwAuthority));
  },

  setAuthorityStr(authority: string) {
    localStorage.setItem('dw_oss_authority', authority);
  },

  getAuthority(): string[] {
    const authorityString = localStorage.getItem('dw_oss_authority');
    if (!authorityString) return [];

    try {
      const authority = JSON.parse(authorityString);
      return typeof authority === 'string' ? [authority] : authority;
    } catch (e) {
      return [authorityString];
    }
  },

  getDwSessionId(): string | null {
    return localStorage.getItem('dw_oss_session_id');
  },

  setDwSessionId(sessionId: string) {
    localStorage.setItem('dw_oss_session_id', sessionId);
  }
};

export const { getToken, setToken } = auth;
export default auth; 