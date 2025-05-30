import React, { useEffect, useState } from 'react';
import { dwFooterUtils } from '../dw-survey-comp/dw-utils/dw-common/dw-footer-util';
import './DwFooter.css';

interface FooterInfo {
  siteName: string;
  siteUrl: string;
  siteIcp: string;
  siteMail: string;
  sitePhone: string;
  versionInfo: string;
  versionNumber: string;
  versionBuilt: string;
  years: string;
  layoutType: string;
}

const DwFooter: React.FC = () => {
  const [footerInfo, setFooterInfo] = useState<FooterInfo>({
    siteName: '调问网',
    siteUrl: 'http://www.diaowen.net',
    siteIcp: '京ICP备13050030号-3',
    siteMail: 'service@diaowen.net',
    sitePhone: '18888888888',
    versionInfo: 'DWSurvey OSS V5.0 Vue',
    versionNumber: 'OSS V5.0',
    versionBuilt: '20211128',
    years: '2012-2021',
    layoutType: 'tb'
  });

  useEffect(() => {
    queryDWSurveyFooter();
  }, []);

  const queryDWSurveyFooter = () => {
    dwFooterUtils.getDwFooterInfoAuto((info: FooterInfo) => {
      setFooterInfo(info);
    });
  };

  return (
    <div className="dw-footer-main">
      <div>
        {(footerInfo.siteUrl !== '' || footerInfo.siteName !== '' || footerInfo.siteIcp !== '') && (
          <div>
            <span>
              <a href={footerInfo.siteUrl} style={{ color: '#333' }}>
                <strong>{footerInfo.siteName}</strong>
              </a>
              &nbsp;
            </span>
            <span>
              <a href="/" style={{ textDecoration: 'none', color: '#333' }}>
                {footerInfo.siteIcp}
              </a>
            </span>
          </div>
        )}
        {(footerInfo.siteMail !== '' || footerInfo.sitePhone !== '') && (
          <div>
            <span>
              &nbsp;{footerInfo.siteMail}&nbsp;{footerInfo.sitePhone}
            </span>
          </div>
        )}
      </div>
      <div>
        <span>
          Powered by{' '}
          <a href="http://www.diaowen.net">
            <strong>DWSurvey</strong>
          </a>{' '}
          {footerInfo.versionNumber} Vue{' '}
        </span>
        <span>
          {' '}
          © {footerInfo.years}{' '}
          <a href="http://www.diaowen.net">
            <strong>调问网</strong>
          </a>
        </span>
      </div>
    </div>
  );
};

export default DwFooter; 