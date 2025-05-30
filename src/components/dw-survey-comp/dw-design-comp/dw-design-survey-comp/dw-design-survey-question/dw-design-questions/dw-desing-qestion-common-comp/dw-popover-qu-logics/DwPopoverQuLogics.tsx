import React, { useState } from 'react';
import { Popover, Tabs, TabPane, Badge, Message } from 'element-react';
import DwQuLogicShowGo from './dw-popover-qu-logics/componets/DwQuLogicShowGo';
import { logicNum } from '../../../../dw-utils/dw-survey-design';
import './DwPopoverQuLogics.scss';

interface QuFocusObj {
  quLogicShow: boolean;
}

interface QuestionLogic {
  logicType: string;
  skQuId?: string;
  cgQuItemId?: string;
  error?: boolean;
}

interface Question {
  quFocusObj: QuFocusObj;
  quType: string;
  questionLogics: QuestionLogic[];
}

interface Survey {
  questions: Question[];
}

interface Props {
  value: Survey;
  index: number;
  onClickItem?: () => void;
  onChange: (survey: Survey) => void;
  children: React.ReactNode;
}

const DwPopoverQuLogics: React.FC<Props> = ({
  value,
  index,
  onClickItem,
  onChange,
  children,
}) => {
  const [activeName, setActiveName] = useState('logicShowTab');
  const question = value.questions[index];

  const logicNumGo = logicNum(question.questionLogics, 'GO');
  const logicNumShow = logicNum(question.questionLogics, 'SHOW');

  const showPopoverLoad = () => {
    const questionLogics = question.questionLogics;
    let isLogicGo = false;
    let isLogicShow = false;
    questionLogics.forEach((item) => {
      if (item.logicType === 'GO') isLogicGo = true;
      if (item.logicType === 'SHOW') isLogicShow = true;
    });
    if (isLogicShow) setActiveName('logicShowTab');
    else if (isLogicGo) setActiveName('logicGoTab');
  };

  const clickShowPopoverEvent = () => {
    onClickItem?.();
    const newSurvey = { ...value };
    newSurvey.questions[index].quFocusObj.quLogicShow = true;
    onChange(newSurvey);
  };

  const checkQuLogic = (isShowMsg: boolean) => {
    let checkQuLogic = true;
    if (question.questionLogics.length > 0) {
      const quType = question.quType;
      const quLogics = question.questionLogics;
      quLogics.forEach((item) => {
        let itemError = false;
        if (quType === 'FILLBLANK' || quType === 'UPLOADFILE') {
          if (!item.skQuId || item.skQuId.length <= 0) itemError = true;
        } else {
          if (!item.cgQuItemId || !item.skQuId || item.cgQuItemId.length <= 0 || item.skQuId.length <= 0) itemError = true;
        }
        if (itemError) {
          if (isShowMsg) {
            item.error = true;
            checkQuLogic = false;
          }
        } else {
          item.error = false;
        }
      });
      if (!checkQuLogic && isShowMsg) {
        Message({
          message: '提醒，如果增加了逻辑配置项，请确认每个配置项都有合适的值！',
          customClass: 'dw-msg-waring',
          iconClass: 'el-icon-info',
        });
        clickShowPopoverEvent();
      }
    }
    return checkQuLogic;
  };

  const beforeLeave = (activeName: string, oldActiveName: string) => {
    checkQuLogic(true);
  };

  return (
    <Popover
      value={question.quFocusObj.quLogicShow}
      trigger="manual"
      placement="right-start"
      width={700}
      popperClass="dw-qu-set-popper"
      onShow={showPopoverLoad}
    >
      <div>
        <Tabs activeName={activeName} onTabClick={setActiveName} beforeLeave={beforeLeave}>
          <TabPane
            label={
              <span>
                显示逻辑&nbsp;
                <Badge value={logicNumShow} hidden={logicNumShow <= 0} className="mark" />
              </span>
            }
            name="logicShowTab"
          >
            <DwQuLogicShowGo value={value} index={index} logicType="SHOW" onChange={onChange} />
          </TabPane>
          <TabPane
            label={
              <span>
                跳转逻辑&nbsp;
                <Badge value={logicNumGo} hidden={logicNumGo <= 0} className="mark" />
              </span>
            }
            name="logicGoTab"
          >
            <DwQuLogicShowGo value={value} index={index} logicType="GO" onChange={onChange} />
          </TabPane>
        </Tabs>
      </div>
      <div onClick={clickShowPopoverEvent}>{children}</div>
    </Popover>
  );
};

export default DwPopoverQuLogics; 