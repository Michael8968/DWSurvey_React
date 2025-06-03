import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '@/api/index';
import './DwFooterSm.css';

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
}

const DwFooterSm: React.FC = () => {
  const [footerInfo, setFooterInfo] = useState<FooterInfo>({
    siteName: '调问网',
    siteUrl: 'http://www.diaowen.net',
    siteIcp: '京ICP备13050030号-3',
    siteMail: 'service@diaowen.net',
    sitePhone: '18888888888',
    versionInfo: 'DWSurvey OSS V5.0 Vue',
    versionNumber: 'OSS V5.0',
    versionBuilt: '20211128',
    years: '2012-2021'
  });

  useEffect(() => {
    const queryDWSurveyFooter = async () => {
      try {
        const response = await axios.get(API.surveyFooterInfo);
        const resultData = response.data.data;
        console.debug(resultData);
        setFooterInfo(resultData);
      } catch (error) {
        console.error('Failed to fetch footer info:', error);
      }
    };

    queryDWSurveyFooter();
  }, []);

  return (
    <div className="dw-footer-main">
      <div>
        <span>
          Powered by{' '}
          <a href="http://www.diaowen.net">
            <strong>DWSurvey</strong>
          </a>{' '}
          {footerInfo.versionNumber} Vue
        </span>
      </div>
    </div>
  );
};

export default DwFooterSm;
