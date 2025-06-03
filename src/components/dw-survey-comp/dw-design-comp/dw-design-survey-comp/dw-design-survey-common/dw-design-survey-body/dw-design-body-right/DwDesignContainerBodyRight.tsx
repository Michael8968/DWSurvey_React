import React from 'react';
import { Tabs, Alert } from 'antd';
import DwDesignSurveyAttrs from '../dw-design-body-left/components/DwDesignSurveyAttrs';
import DwQuAttrs from '../../../dw-design-survey-question/dw-design-questions/dw-desing-qestion-common-comp/dw-qu-attrs/DwQuAttrs';

const { TabPane } = Tabs;

interface Survey {
  surveyFocusObj: {
    rightFocusTab: string;
    focusQuIndex: number;
  };
  [key: string]: any;
}

interface Props {
  survey: Survey;
  lrContentHeight: number;
  onStartDragRight?: () => void;
  onEndDrag?: () => void;
}

const DwDesignContainerBodyRight: React.FC<Props> = ({
  survey,
  lrContentHeight,
  onStartDragRight,
  onEndDrag
}) => {
  const clickShowPopoverEvent = () => {
    // 处理点击事件
  };

  return (
    <div onClick={clickShowPopoverEvent}>
      <Tabs activeKey={survey.surveyFocusObj.rightFocusTab} type="card">
        <TabPane tab="问卷设置" key="surveySet">
          <div style={{ height: `${lrContentHeight}px` }} className="scrollable-hidden scrollable-y">
            <div style={{ paddingBottom: '5px' }}>
              <Alert message="可以配置整个问卷的基本属性" type="info" showIcon />
            </div>
            <DwDesignSurveyAttrs survey={survey as any} />
          </div>
        </TabPane>
        <TabPane tab="题目设置" key="quSet">
          <DwQuAttrs survey={survey as any} index={survey.surveyFocusObj.focusQuIndex} onChange={() => {}} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DwDesignContainerBodyRight; 