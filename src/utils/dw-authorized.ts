
export default {
  setLoginCount (count: string) {
    localStorage.setItem('dw_oss_login_count', count)
  },
  getLoginCount () {
    if (localStorage.hasOwnProperty('dw_oss_login_count')) {
      return localStorage.getItem('dw_oss_login_count')
    }
    return 'none'
  },
  setUserName (userName: string) {
    localStorage.setItem('dw_oss_user_name', userName)
  },
  getUserName () {
    if (localStorage.hasOwnProperty('dw_oss_user_name')) {
      return localStorage.getItem('dw_oss_user_name')
    }
    return 'none'
  },
  setToken (token: string) {
    localStorage.setItem('dw_oss_token', token)
  },
  getToken () {
    if (localStorage.hasOwnProperty('dw_oss_token')) {
      return localStorage.getItem('dw_oss_token')
    }
    return null
  },
  setAuthority (authority: string) {
    const dwAuthority = typeof authority === 'string' ? [authority] : authority
    localStorage.setItem('dw_oss_authority', JSON.stringify(dwAuthority))
  },
  setAuthorityStr (authority: string) {
    localStorage.setItem('dw_oss_authority', authority)
  },
  getAuthority () {
    let authority = []
    if (localStorage.hasOwnProperty('dw_oss_authority')) {
      const authorityString = localStorage.getItem('dw_oss_authority')
      try {
        if (authorityString) {
          authority = JSON.parse(authorityString)
        }
      } catch (e) {
        authority = []
      }
      if (typeof authority === 'string') {
        return [authority]
      }
    }
    return authority
  },
  getDwSessionId () {
    if (localStorage.hasOwnProperty('dw_oss_session_id')) {
      return localStorage.getItem('dw_oss_session_id')
    }
    return null
  },
  setDwSessionId (sessionId: string) {
    localStorage.setItem('dw_oss_session_id', sessionId)
  }
}
