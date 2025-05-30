import React from 'react';
import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper';

const DwSiteShareV6: React.FC = () => {

  const children = () => {
    return (
      <div>
        <div className="dw-dcs-main-title">
          <h4>分享到社交网络</h4>
          <div className="dw-dcs-main-p">赶快分享您的问卷到各大社交网站，让更多关注您的朋友来回答问卷。</div>
        </div>
        <div className="dw-dcs-main-content"></div>
      </div>
    );
  };

  return (
    <DwSurveyDcsWrapper isAnswerWx={true} children={children} />
  );
};

export default DwSiteShareV6; 