import React, { useState, useEffect } from 'react';
import { Alert, Collapse, message } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { questionComps, dwSaveSurveyJson } from '../../../../api/dw-design-survey-api';
import { initQuestionModels, parseQuestions, resetQuestion } from '../../../../../../dw-utils/dw-survey-parse';
import { clearSurveyJson, getSaveSurveyJsonText, getSurveyJsonSimple } from '../../../../../../dw-utils/dw-survey-design';
import { dwResetQuestionRefreshValue } from '../../../../../../dw-utils/dw-survey-update-question';
import DwDesignQuBankQuestion from '../dw-design-body-right/components/DwDesignQuBankQuestion';

const { Panel } = Collapse;

interface Question {
  eventName?: string;
  isNew?: boolean;
  [key: string]: any;
}

interface TabQu {
  tabQuName: string;
  eventType?: string;
  questions: Question[];
}

interface Tab {
  tabName: string;
  tabQus: TabQu[];
}

interface Survey {
  id: string;
  sid: string;
  questions: Question[];
  [key: string]: any;
}

interface Props {
  survey: Survey;
  onStartDrag?: () => void;
  onEndDrag?: () => void;
}

const DwDesignToolbarLeft: React.FC<Props> = ({ survey, onStartDrag, onEndDrag }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAutoSave, setIsAutoSave] = useState(true);
  const [autoSaveTime, setAutoSaveTime] = useState(30);
  const [activeKeys, setActiveKeys] = useState<string[]>(['0', '1', '2', '3']);

  useEffect(() => {
    loadDesignSurveyData();
    if (isAutoSave) {
      startIntervalSaveSurvey();
    }
    return () => {
      stopIntervalSaveSurvey();
    };
  }, []);

  const loadDesignSurveyData = async () => {
    try {
      const response = await questionComps();
      const httpResult = response.data;
      if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
        const tabs = httpResult.data;
        tabs.forEach((tab: Tab) => {
          tab.tabQus.forEach((tabQu: TabQu) => {
            tabQu.questions = initQuestionModels(parseQuestions(tabQu.questions, false));
          });
        });
        setTabs(tabs);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to load design survey data:', error);
      setLoading(false);
    }
  };

  const clickToolbarItem = (item: Question) => {
    if (item.eventName !== undefined && item.eventName !== null) {
      // 处理对应的按钮事件
    } else {
      item.isNew = true;
      survey.questions.push(dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(item))));
      resetQuestion(survey.questions[survey.questions.length - 1]);
    }
  };

  const onDragStart = () => {
    onStartDrag?.();
  };

  const onDragEnd = () => {
    onEndDrag?.();
  };

  const startIntervalSaveSurvey = () => {
    const intervalId = setInterval(() => {
      saveSurveyFun(null);
      setAutoSaveTime(20);
    }, 20000);

    const timeIntervalId = setInterval(() => {
      setAutoSaveTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timeIntervalId);
    };
  };

  const stopIntervalSaveSurvey = () => {
    // 清除定时器的逻辑在 useEffect 的清理函数中处理
  };

  const saveSurveyFun = async (callback?: () => void) => {
    const surveyId = survey.id;
    const sid = survey.sid;
    clearSurveyJson(survey);
    const surveyJsonText = JSON.stringify(getSaveSurveyJsonText(survey));
    const surveyJsonSimple = JSON.stringify(getSurveyJsonSimple(surveyJsonText));
    const data = { surveyId, sid, surveyJsonText, surveyJsonSimple };

    try {
      const response = await dwSaveSurveyJson(data);
      const httpResult = response.data;
      if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
        message.success('保存成功！');
        callback?.();
      } else {
        message.error('保存失败！');
      }
    } catch (error) {
      console.error('Failed to save survey:', error);
      message.error('保存失败！');
    }
  };

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div>
      <div style={{ paddingBottom: '5px' }}>
        <Alert message="点击或拖动可加入到问卷中" type="info" showIcon />
      </div>
      <Collapse activeKey={activeKeys} onChange={setActiveKeys}>
        {tabs.map((tab, tabIndex) => (
          <Panel header={tab.tabName} key={tabIndex.toString()}>
            {tab.tabQus.map((item, index) => (
              item.questions.length > 0 && (
                <div key={`toolbar${index}`} className="tools_item">
                  <div className="quBanks">
                    {(!item.eventType) && (
                      <>
                        <div>
                          <div className="toolbars-text" style={{ borderTop: 'none', textAlign: 'left', paddingLeft: '10px' }}>
                            {item.tabQuName}
                          </div>
                        </div>
                        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                          <Droppable droppableId={`questions-${tabIndex}-${index}`} isDropDisabled={true}>
                            {(provided) => (
                              <div {...provided.droppableProps} ref={provided.innerRef} className="toolbars-draggable">
                                {item.questions.map((quItem, quIndex) => (
                                  <Draggable
                                    key={`base${quIndex}`}
                                    draggableId={`base${quIndex}`}
                                    index={quIndex}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="dw-list-group-item"
                                        onClick={() => clickToolbarItem(quItem)}
                                      >
                                        <DwDesignQuBankQuestion item={quItem} />
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      </>
                    )}
                  </div>
                </div>
              )
            ))}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default DwDesignToolbarLeft; 