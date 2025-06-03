import React, { useEffect, useState } from 'react';
import { Button, Container, Aside, Loading } from 'element-react';
import { useHistory, useParams } from 'react-router-dom';
import DwSurveyStyleDesignAside from './components/DwSurveyStyleDesignAside';
import DwAnswerDefaultLayout from '../../dw-answer-comp/dw-anaswer-survey-layouts/dw-answer-default-layout/DwAnswerDefaultLayout';
import { getDesignSurveyJsonBySurveyId } from '../../dw-utils/dw-survey-common';
import { initAnswerBySurvey, showPageByIndex } from '../../dw-utils/dw-survey-answer-data.ts';
import { initAnswerSurveyProgress } from '../../dw-answer-comp/dw-utils/dw-survey-answer-progress.ts';
import { getDefaultSurveyStyle } from '../../dw-utils/dw-common/dw-common-utils';
import { clearSurveyJson, getSaveSurveyJsonText, getSurveyJsonSimple } from '../../dw-utils/dw-survey-design';
import { clearSurveyAnswer } from '../../dw-answer-comp/dw-utils/dw-survey-answer-clear';
import { dwSurveyAnswerLogicLoad } from '../../dw-answer-comp/dw-utils/dw-survey-answer-logic';
import { surveyAnswerLocalStorage } from '../../dw-answer-comp/dw-utils/dw-survey-answer-utils.ts';
import { dwFooterUtils } from '../../dw-utils/dw-common/dw-footer-util.ts';
import { dwDevSurvey, dwSaveSurveyJson } from '../dw-design-survey-comp/api/dw-design-survey-api';

interface Survey {
  id: string;
  sid: string;
  surveyTypeSimpleName: string;
  surveyStyle: any;
  questions: any[];
  dwDebug: boolean;
  answerMsg: {
    showAnswerMsg: boolean;
    answerMsgInfo: any;
    noSurveyJson: boolean;
  };
}

const DwStyleSurveyMain: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [previewTypeClass, setPreviewTypeClass] = useState('dw-preview-pc');
  const [oldQuestions, setOldQuestions] = useState<string | null>(null);
  const [prevPath, setPrevPath] = useState('/v6');
  const [containerTop] = useState({
    lrFixedTop: 40,
    centerMarginTop: 40
  });

  const history = useHistory();
  const { dwSurveyId } = useParams<{ dwSurveyId: string }>();

  const padPhoneAnBodySpan = {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
    md: { span: 24, offset: 0 },
    lg: { span: 24, offset: 0 },
    xl: { span: 24, offset: 0 }
  };

  useEffect(() => {
    loadSurvey();
    dwFooterUtils.isLayoutLr((footerInfo) => {
      setPrevPath('/v6/lr');
    });
  }, []);

  const loadSurvey = () => {
    const params = { surveyId: dwSurveyId };
    getDesignSurveyJsonBySurveyId(params, (survey: Survey) => {
      if (!survey.surveyStyle?.pageThemeColor) {
        survey.surveyStyle = getDefaultSurveyStyle();
      }
      
      survey.dwDebug = false;
      survey.answerMsg = {
        showAnswerMsg: false,
        answerMsgInfo: null,
        noSurveyJson: false
      };

      initAnswerBySurvey(survey);
      dwSurveyAnswerLogicLoad(survey);
      initAnswerSurveyProgress(survey);
      showPageByIndex(survey, 1, 'next');
      
      setOldQuestions(JSON.stringify(survey.questions));
      setSurvey(survey);
      setLoading(false);
    });
  };

  const handlePush = (to: string) => {
    history.push(to);
  };

  const previewTabClick = (className: string) => {
    setPreviewTypeClass(className);
  };

  const designSurvey = () => {
    history.push(`/v6/diaowen/dw-design/survey/${dwSurveyId}`);
  };

  const devSurvey = async () => {
    try {
      const response = await dwDevSurvey({ surveyId: dwSurveyId });
      const httpResult = response.data;
      if (httpResult.resultCode === 200) {
        surveyAnswerLocalStorage.clearAnswerHistory(survey?.sid || '', null);
        history.push(`${prevPath}/dw/survey/c/url/${dwSurveyId}`);
      } else {
        // 使用 element-react 的 Message 组件
        // Message.error('发布失败，请重试或联系管理员！');
      }
    } catch (error) {
      console.error('发布失败:', error);
    }
  };

  const saveSurvey = async () => {
    if (!survey) return;

    const surveyId = survey.id;
    const sid = survey.sid;
    
    // 清理无效数据
    survey.questions = JSON.parse(oldQuestions || '[]');
    clearSurveyJson(survey);
    clearSurveyAnswer(survey);

    const surveyJsonText = JSON.stringify(getSaveSurveyJsonText(survey));
    const surveyJsonSimple = JSON.stringify(getSurveyJsonSimple(surveyJsonText));
    
    try {
      const response = await dwSaveSurveyJson({
        surveyId,
        sid,
        surveyJsonText,
        surveyJsonSimple
      });

      const httpResult = response.data;
      if (httpResult.resultCode === 200) {
        // Message.success('保存成功！');
      } else {
        // Message.error('保存样式失败！');
      }
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  if (!survey) return null;

  return (
    <div className="dw-preview-container">
      <div className="dw-preview-header">
        <div className="dw-preview-header-left">
          <label>
            <i className="dw-icon-button fa-solid fa-palette active"></i>
            {survey.surveyTypeSimpleName}样式配置
          </label>
        </div>
        <div className="dw-preview-header-center">
          <label>
            <i 
              className={`dw-icon-button fas fa-desktop ${previewTypeClass === 'dw-preview-pc' ? 'active' : ''}`}
              onClick={() => previewTabClick('dw-preview-pc')}
            ></i>
          </label>
          <label>
            <i 
              className={`dw-icon-button fas fa-tablet-alt ${previewTypeClass === 'dw-preview-pad' ? 'active' : ''}`}
              onClick={() => previewTabClick('dw-preview-pad')}
            ></i>
          </label>
          <label>
            <i 
              className={`dw-icon-button fas fa-mobile-alt ${previewTypeClass === 'dw-preview-phone' ? 'active' : ''}`}
              onClick={() => previewTabClick('dw-preview-phone')}
            ></i>
          </label>
        </div>
        <div className="dw-preview-header-right">
          <div className="dw-display-flex-right">
            <Button type="primary" size="small" onClick={devSurvey}>确认发布</Button>
            <Button type="primary" plain size="small" onClick={designSurvey}>返回编辑</Button>
            <Button size="small" onClick={() => handlePush(`${prevPath}/dw/survey/c/url/${survey.id}`)}>答卷地址</Button>
            <Button size="small" onClick={() => handlePush(prevPath)}>返回列表</Button>
          </div>
        </div>
      </div>

      <Container style={{ height: 'calc(100vh)' }}>
        <Aside style={{ width: '300px', borderRight: '1px solid rgb(230 228 228)' }}>
          <div style={{ position: 'fixed', width: '300px', top: `${containerTop.lrFixedTop}px` }}>
            <div className="dw-preview-left-aside">
              <DwSurveyStyleDesignAside 
                survey={survey}
                onChange={(newSurvey) => {
                  setSurvey(newSurvey);
                  saveSurvey();
                }}
              />
            </div>
          </div>
        </Aside>

        <Container loading={loading} style={{ flex: 'auto' }}>
          <div style={{ width: '100%' }}>
            {previewTypeClass === 'dw-preview-pc' && (
              <div className="dw-preview-main">
                <div className="dw-preview-answer-survey-container">
                  <div className="dw-preview-pc">
                    <div style={{ marginTop: `${containerTop.centerMarginTop}px` }} className="dw-preview-body">
                      <div className="dw-answer-custom-theme">
                        <DwAnswerDefaultLayout
                          survey={survey}
                          extProps={{
                            anBodyStyle: { minHeight: 'calc(100vh - 40px)', height: 'auto' },
                            isPreview: true
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {previewTypeClass === 'dw-preview-pad' && (
              <div className="dw-preview-main">
                <div className="dw-preview-answer-survey-container">
                  <div className="dw-preview-pad">
                    <div style={{ marginTop: `${containerTop.centerMarginTop}px` }} className="dw-preview-body">
                      <div className="dw-answer-custom-theme">
                        <DwAnswerDefaultLayout
                          survey={survey}
                          extProps={{
                            anBodySpan: padPhoneAnBodySpan,
                            anBodyStyle: { minHeight: '630px', height: 'auto' },
                            isPreview: true
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {previewTypeClass === 'dw-preview-phone' && (
              <div className="dw-preview-main">
                <div className="dw-preview-answer-survey-container">
                  <div className="dw-preview-phone">
                    <div style={{ marginTop: `${containerTop.centerMarginTop}px` }} className="dw-preview-body">
                      <div className="dw-answer-custom-theme">
                        <DwAnswerDefaultLayout
                          survey={survey}
                          extProps={{
                            anBodySpan: padPhoneAnBodySpan,
                            anBodyStyle: { minHeight: '861px', height: 'auto' },
                            isPreview: true
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default DwStyleSurveyMain; 