import { ApiEndpoints } from '../../../../api'
import request from '../../../../utils/request'

interface FooterInfo {
  siteStatus?: string;
  layoutType?: string;
  [key: string]: any;
}

interface ApiResponse {
  data: {
    data: FooterInfo;
  };
}

type AuthorityType = string | string[] | FooterInfo;

export const dwFooterUtils = {
  setDwFooterInfo(authority: AuthorityType): void {
    const dwAuthority = typeof authority === 'string' ? [authority] : authority;
    localStorage.setItem('dw_footer_info', JSON.stringify(dwAuthority));
  },

  getDwFooterInfo(): FooterInfo {
    if (localStorage.hasOwnProperty('dw_footer_info')) {
      const authorityString = localStorage.getItem('dw_footer_info');
      try {
        if (authorityString) {
          return JSON.parse(authorityString);
        }
      } catch (e) {
        console.debug(e);
      }
    }
    return {};
  },

  getNewDwFooterInfoApi(params?: any): Promise<ApiResponse> {
    return request({
      url: ApiEndpoints.SURVEY_FOOTER_INFO,
      method: 'get',
      params
    });
  },

  getNewDwFooterInfo(callback: ((data: FooterInfo) => void) | null): void {
    this.getNewDwFooterInfoApi().then((response) => {
      const resultData = response.data.data;
      // 存储到本地
      resultData.layoutType = 'lr';
      this.setDwFooterInfo(resultData);
      if (callback !== null) callback(resultData);
    });
  },

  getDwFooterInfoAuto(callback: ((data: FooterInfo) => void) | null): void {
    const footerInfo = this.getDwFooterInfo();
    if (footerInfo.hasOwnProperty('siteStatus')) {
      if (callback !== null) callback(footerInfo);
    } else {
      this.getNewDwFooterInfo((newFooterInfo) => {
        if (callback !== null) callback(newFooterInfo);
      });
    }
  },

  isDemo(trueCallback: (() => void) | null, falseCallback: (() => void) | null = null): void {
    this.getDwFooterInfoAuto((dwFooterInfo) => {
      if (dwFooterInfo !== null && dwFooterInfo.hasOwnProperty('siteStatus') && dwFooterInfo.siteStatus === 'demo') {
        if (trueCallback !== null) trueCallback();
      } else {
        if (falseCallback !== null) falseCallback();
      }
    });
  },

  isLayoutLr(trueCallback: (() => void) | null, falseCallback: (() => void) | null = null): void {
    this.getDwFooterInfoAuto((footerInfo) => {
      if (footerInfo !== null && footerInfo.hasOwnProperty('layoutType') && footerInfo.layoutType === 'lr') {
        if (trueCallback !== null) trueCallback();
      } else {
        if (falseCallback !== null) falseCallback();
      }
    });
  },

  setLayout(layoutType: string): void {
    this.getDwFooterInfoAuto((footerInfo) => {
      if (footerInfo !== null) {
        footerInfo.layoutType = layoutType;
        this.setDwFooterInfo(footerInfo);
      }
    });
  }
};
