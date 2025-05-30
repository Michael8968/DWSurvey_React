import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Row, Col, Button, Switch, message } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { dwSaveSurveyJson, questionComps } from '../../../api/dw-design-survey-api';
import { initQuestionModels, parseQuestions, resetQuestion } from '../../../../../dw-utils/dw-survey-parse';
import { clearSurveyJson, getSaveSurveyJsonText, getSurveyJsonSimple } from '../../../../../dw-utils/dw-survey-design';
import { dwResetQuestionRefreshValue } from '../../../../../dw-utils/dw-survey-update-question';
import { caleDesignSurveySumScore } from '../../../../../dw-utils/dw-common/dw-survey-design-score';
import DwDesignToolbarQuestion from './components/DwDesignToolbarQuestion';
import DwUpEntDialog from './components/DwUpEntDialog';
import { useNavigate, useParams } from 'react-router-dom';

const { TabPane } = Tabs;

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
  surveyType: string;
  questions: Question[];
  [key: string]: any;
}

interface Props {
  survey: Survey;
  onStartDrag?: () => void;
  onEndDrag?: () => void;
}

const DwDesignToolbar: React.FC<Props> = ({ survey, onStartDrag, onEndDrag }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAutoSave, setIsAutoSave] = useState(true);
  const [autoSaveTime, setAutoSaveTime] = useState(30);
  const [activeTab, setActiveTab] = useState('tabQu_0');
  const dwUpEntDialogRef = useRef<any>(null);
  const navigate = useNavigate();
  const { dwSurveyId } = useParams();

  useEffect(() => {
    loadDesignSurveyData();
    if (isAutoSave) {
      startIntervalSaveSurvey();
    }
    return () => {
      stopIntervalSaveSurvey();
    };
  }, []);

  const clickToolbarItem = (item: Question) => {
    if (item.eventName !== undefined && item.eventName !== null) {
      if (item.eventName === 'SurveyStyleEvent') {
        previewSurvey();
      }
    } else {
      item.isNew = true;
      survey.questions.push(dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(item))));
      resetQuestion(survey.questions[survey.questions.length - 1]);
      caleDesignSurveySumScore(survey, survey.questions.length - 1);
    }
  };

  const onStart = () => {
    onStartDrag?.();
  };

  const onEnd = () => {
    onEndDrag?.();
  };

  const loadDesignSurveyData = async () => {
    try {
      const params = { surveyType: survey.surveyType };
      const response = await questionComps(params);
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

  const saveSurvey = () => {
    saveSurveyFun(null);
  };

  const devSurvey = () => {
    stopIntervalSaveSurvey();
    previewSurvey();
  };

  const clickDesignStyle = (activeKey: string) => {
    if (activeKey === 'designStyle') {
      previewSurvey();
      return false;
    } else if (activeKey === 'moreQus') {
      dwUpEntDialogRef.current?.openDialog();
      return false;
    }
    return true;
  };

  const previewSurvey = () => {
    saveSurveyFun(() => {
      navigate(`/v6/diaowen/dw-preview-style/survey/${dwSurveyId}`);
    });
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
    <Tabs
      activeKey={activeTab}
      onChange={clickDesignStyle}
      type="card"
      loading={loading}
    >
      {tabs.map((tab, tabIndex) => (
        <TabPane tab={tab.tabName} key={`tabQu_${tabIndex}`}>
          <div className="toolbars-contents">
            <Row justify="space-between" align="middle">
              <Col span={18}>
                <div className="toolbars-contents-body">
                  {tab.tabQus.map((item, index) => (
                    item.questions.length > 0 && (
                      <div key={`toolbar${index}`} className="tools_item">
                        <div className="toolbars">
                          {(!item.eventType) && (
                            <DragDropContext onDragStart={onStart} onDragEnd={onEnd}>
                              <Droppable droppableId={`questions-${tabIndex}-${index}`} isDropDisabled={true}>
                                {(provided) => (
                                  <div {...provided.droppableProps} ref={provided.innerRef} className="toolbars-draggable">
                                    <div className="toolbars-draggable-group">
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
                                              className="toolbar-item"
                                              onClick={() => clickToolbarItem(quItem)}
                                            >
                                              <DwDesignToolbarQuestion item={quItem} />
                                            </div>
                                          )}
                                        </Draggable>
                                      ))}
                                      {provided.placeholder}
                                    </div>
                                  </div>
                                )}
                              </Droppable>
                            </DragDropContext>
                          )}
                          {item.eventType && (
                            <div className="toolbars-draggable-group">
                              {item.questions.map((quItem, quIndex) => (
                                <div
                                  key={`base${quIndex}`}
                                  className="toolbar-item"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => clickToolbarItem(quItem)}
                                >
                                  <DwDesignToolbarQuestion item={quItem} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="toolbars-text">{item.tabQuName}</div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </Col>
              <Col span={6}>
                <div style={{ textAlign: 'right', paddingRight: '10px' }}>
                  <span className="autoSave" style={{ marginRight: '10px', fontSize: '12px' }}>
                    <Switch
                      checked={isAutoSave}
                      onChange={(checked) => setIsAutoSave(checked)}
                      checkedChildren="自动保存"
                    />
                    <span style={{ color: '#afafb0' }}>({autoSaveTime})</span>
                  </span>
                  <Button type="primary" size="small" onClick={devSurvey}>
                    <i className="fa fa-paper-plane" />&nbsp;发布
                  </Button>
                  <Button size="small" style={{ marginTop: '10px' }} onClick={saveSurvey}>
                    <i className="fa-solid fa-floppy-disk" />&nbsp;保存
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </TabPane>
      ))}
      <TabPane tab="更多题型" key="moreQus">
        <DwUpEntDialog ref={dwUpEntDialogRef} />
      </TabPane>
    </Tabs>
  );
};

export default DwDesignToolbar; 