import React from 'react';
import DwDesignQuestionModelCommon from './DwDesignQuestionModelCommon';

interface Question {
  dwsurveyfont?: string;
  quType: string;
  [key: string]: any;
}

interface Props {
  item: Question;
}

const DwDesignToolbarQuestion: React.FC<Props> = ({ item }) => {
  return (
    <div>
      <DwDesignQuestionModelCommon item={item}>
        <DwDesignQuestionModelCommon
          item={item}
          quModelTagDwsurveyfont={
            <div className="toolbar-item-content">
              <div className={`dwToolbar_icon dwsurveyfont ${item.dwsurveyfont}`} />
            </div>
          }
          quModelTagXialati={
            <div className="toolbar-item-content">
              <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-xialati" />
            </div>
          }
          quModelTagDanxuan={
            <div className="toolbar-item-content">
              <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-danxuan" />
            </div>
          }
          quModelTagDuoxuan={
            <div className="toolbar-item-content">
              <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-duoxuan" />
            </div>
          }
          quModelTagDuoxiangwenben={
            <div className="toolbar-item-content">
              <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-duoxiangwenben" />
            </div>
          }
          quModelTagTiankong={
            <div className="toolbar-item-content">
              <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-tiankong" />
            </div>
          }
          quModelTagPingfen={
            <div className="toolbar-item-content">
              <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-pingfen" />
            </div>
          }
          quModelTagPaixu={
            <div className="toolbar-item-content">
              <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-paixu" />
            </div>
          }
          quModelTagDuoxiangtiankong={
            <div className="toolbar-item-content">
              <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-duoxiangtiankong" />
            </div>
          }
          quModelTagShangchuan={
            <div className="toolbar-item-content">
              <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-shangchuan" />
            </div>
          }
          quModelTagFenye={
            <div className="toolbar-item-content">
              <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-fenye" />
            </div>
          }
          quModelTagFenduan={
            <div className="toolbar-item-content">
              <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-fenduan" />
            </div>
          }
        />
      </DwDesignQuestionModelCommon>
    </div>
  );
};

export default DwDesignToolbarQuestion; 