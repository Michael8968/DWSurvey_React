import Api from '../../../../api'
import request from '../../../../utils/request'

export const dwFooterUtils = {
  setDwFooterInfo (authority: any) {
    const dwAuthority = typeof authority === 'string' ? [authority] : authority
    localStorage.setItem('dw_footer_info', JSON.stringify(dwAuthority))
  },
  getDwFooterInfo () {
    if (localStorage.hasOwnProperty('dw_footer_info')) {
      const authorityString = localStorage.getItem('dw_footer_info')
      try {
        if (authorityString) {
          return JSON.parse(authorityString)
        }
      } catch (e) {
        console.debug(e)
      }
    }
    return {}
  },
  getNewDwFooterInfoApi (params: any) {
    return request({
      url: Api.surveyFooterInfo,
      method: 'get',
      params
    })
  },
  getNewDwFooterInfo (callback: (resultData: any) => void) {
    this.getNewDwFooterInfoApi(null).then((response: any) => {
      const resultData = response.data.data
      // 存储到本地
      resultData.layoutType = 'lr'
      this.setDwFooterInfo(resultData)
      if (callback!==null) callback(resultData)
    })
  },
  getDwFooterInfoAuto (callback: (footerInfo: any) => void) {
    const footerInfo = this.getDwFooterInfo()
    if (footerInfo.hasOwnProperty('siteStatus')) {
      if (callback!==null) callback(footerInfo)
    } else {
      this.getNewDwFooterInfo((newFooterInfo) => {
        if (callback!==null) callback(newFooterInfo)
      })
    }
  },
  isDemo (trueCallback: (dwFooterInfo: any) => void, falseCallback: (dwFooterInfo: any) => void) {
    this.getDwFooterInfoAuto((dwFooterInfo) => {
      if (dwFooterInfo!==null && dwFooterInfo.hasOwnProperty('siteStatus') && dwFooterInfo.siteStatus === 'demo') {
        if (trueCallback!==null) trueCallback(dwFooterInfo)
      } else {
        if (falseCallback!==null) falseCallback(dwFooterInfo)
      }
    })
  },
  isLayoutLr (trueCallback: (dwFooterInfo: any) => void, falseCallback: (dwFooterInfo: any) => void) {
    this.getDwFooterInfoAuto((footerInfo) => {
      if (footerInfo!==null && footerInfo.hasOwnProperty('layoutType') && footerInfo.layoutType==='lr') {
        if (trueCallback!==null) trueCallback(footerInfo)
      } else {
        if (falseCallback!==null) falseCallback(footerInfo)
      }
    })
  },
  setLayout (layoutType: string) {
    this.getDwFooterInfoAuto((footerInfo) => {
      if (footerInfo!==null) {
        footerInfo.layoutType = layoutType
        this.setDwFooterInfo(footerInfo)
      }
    })
  }
}
