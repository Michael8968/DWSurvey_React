import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Tabs, Row, Col, Button, Spin } from 'antd';
import { questionComps } from '../../../../api/dw-design-survey-api';
import { initQuestionModels, parseQuestions, resetQuestion } from '../../../../../../dw-utils/dw-survey-parse';
import DwDesignToolbarQuestion from './DwDesignToolbarQuestion';
import { dwResetQuestionRefreshValue } from '../../../../../../dw-utils/dw-survey-update-question';
import { caleDesignSurveySumScore } from '../../../../../../dw-utils/dw-common/dw-survey-design-score';

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
  tabQus: TabQu[];
}

interface Survey {
  questions: Question[];
  [key: string]: any;
}

interface Props {
  survey: Survey;
}

const DwAddNewQuDialog = forwardRef<any, Props>(({ survey }, ref) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    openDialog: () => setDialogVisible(true)
  }));

  useEffect(() => {
    loadDesignSurveyData();
  }, []);

  const loadDesignSurveyData = async () => {
    try {
      const response = await questionComps();
      const httpResult = response.data;
      if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
        const tabs = httpResult.data;
        tabs.forEach((item: Tab) => {
          item.tabQus.forEach((item_1: TabQu) => {
            item_1.questions = initQuestionModels(parseQuestions(item_1.questions, false));
          });
        });
        setTabs(tabs);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to load question components:', error);
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
      // 如果已经配置了分值则自动计算分数并显示
      caleDesignSurveySumScore(survey, survey.questions.length - 1);
    }
  };

  return (
    <Modal
      title="新增题目"
      open={dialogVisible}
      onCancel={() => setDialogVisible(false)}
      width="40%"
      footer={[
        <Button key="close" onClick={() => setDialogVisible(false)}>
          关 闭
        </Button>
      ]}
    >
      <Spin spinning={loading}>
        <div style={{ paddingBottom: 10 }}>点击对应的题型控件，被点击的题型会自动追加在问卷中</div>
        {tabs.length > 0 && (
          <Tabs type="card">
            <Tabs.TabPane tab="常用题型" key="common">
              <div className="toolbars-contents" style={{ backgroundColor: 'white' }}>
                <Row justify="space-between" align="middle">
                  <Col span={24}>
                    <div className="toolbars-contents-body" style={{ display: 'block' }}>
                      {tabs[0].tabQus.map((item, index) => (
                        item.questions.length > 0 && (
                          <div key={`toolbar${index}`} className="tools_item">
                            <div>
                              <div>
                                <div className="toolbars-text" style={{ textAlign: 'left', paddingLeft: 20, border: 'none' }}>
                                  {item.tabQuName}
                                </div>
                              </div>
                              <div className="toolbars">
                                {(!item.eventType || item.eventType === null) && (
                                  <div className="toolbars-draggable-group">
                                    {item.questions.map((quItem, qyIndex) => (
                                      <div
                                        key={`base${qyIndex}`}
                                        className="toolbar-item"
                                        onClick={() => clickToolbarItem(quItem)}
                                      >
                                        <DwDesignToolbarQuestion item={quItem as any} />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </Col>
                </Row>
              </div>
            </Tabs.TabPane>
          </Tabs>
        )}
      </Spin>
    </Modal>
  );
});

export default DwAddNewQuDialog; 