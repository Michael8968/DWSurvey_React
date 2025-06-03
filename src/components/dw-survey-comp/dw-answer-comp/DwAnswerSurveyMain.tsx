import React, { useState, useEffect } from 'react';
import { Spin, message, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import DwAnswerDefaultLayout from './dw-anaswer-survey-layouts/dw-answer-default-layout/DwAnswerDefaultLayout.tsx';
import { dwSurveyAnswerById } from './api/dw-survey-answer';
import { initAnswerBySurvey, parseAnswerData, showPageByIndex } from '../dw-utils/dw-survey-answer-data';
import { getSurveyAnswerJsonBySurveyId } from './dw-utils/dw-survey-answer-common';
import { getEsId, surveyAnswerLocalStorage } from './dw-utils/dw-survey-answer-utils';
import { getSurveyAnswerData } from '../dw-utils/dw-survey-answer';
import { initAnswerSurveyProgress } from './dw-utils/dw-survey-answer-progress';
import { dwSurveyAnswerLogicLoad } from './dw-utils/dw-survey-answer-logic';
import { useParams, useLocation } from 'react-router-dom';
import './DwAnswerSurveyMain.css';

interface AnswerProps {
  sid?: string | null;
  surveyId?: string | null;
  answerId?: string | null;
  anPwd?: string | null;
  relateContactEsId?: string;
  [key: string]: any;
}

interface ExtProps {
  readonly?: boolean;
  isShowScore?: boolean;
  [key: string]: any;
}

interface Survey {
  surveyNameObj?: { dwHtml: string; dwText: string };
  surveyDetail?: {
    surveyNodeObj: { dwHtml: string; dwText: string };
  };
  answer?: { questions: any[] };
  surveyStyle?: {
    themeColor: string;
  };
  dwDebug?: boolean;
  readonly?: boolean;
  isShowScore?: boolean;
  surveyAttrs?: any;
  surveyType?: string;
  answerMsg?: any;
  answerCheckResult?: any;
  dwEsSurveyAnswer?: any;
  dwVersion?: string;
  firstLoadAnswer?: boolean;
  dwParams?: any;
  [key: string]: any;
}

interface AnswerCheckResult {
  anCheckIsPass?: boolean;
  anCheckResultMsg?: string;
  anCheckResultCode?: number;
  [key: string]: any;
}

interface DwAnswerSurveyMainProps {
  extProps?: ExtProps;
  answerProps?: AnswerProps;
}

const DwAnswerSurveyMain: React.FC<DwAnswerSurveyMainProps> = ({
  extProps = {},
  answerProps = { sid: null, answerId: null, anPwd: null }
}) => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);
  const [answerData, setAnswerData] = useState<any>(null);
  const [answerCheckResult, setAnswerCheckResult] = useState<AnswerCheckResult | null>(null);
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    loadSurvey();
  }, [answerProps, location]);

  const loadSurvey = async () => {
    setLoading(true);
    setSurvey(null);
    setAnswerData(null);
    setAnswerCheckResult(null);

    const loadingInstance = message.loading({
      content: '数据加载中...',
      duration: 0,
      className: 'dw-loading dw-answer-custom-theme',
    });

    const { surveyId, sid, answerId, anPwd } = answerProps;
    const requestParams = { surveyId, sid, answerId, anPwd };

    try {
      await new Promise<void>((resolve, reject) => {
        getSurveyAnswerJsonBySurveyId(
          requestParams,
          (survey: Survey, answerCheckResult: AnswerCheckResult) => {
            survey.dwDebug = false;
            if (extProps) {
              if (extProps.readonly !== undefined) survey.readonly = extProps.readonly;
              if (extProps.isShowScore !== undefined) {
                survey.isShowScore = extProps.isShowScore;
                if (survey.surveyAttrs?.scoreAttr?.enabled) {
                  survey.isShowScore = survey.isShowScore && extProps.isShowScore;
                }
                if (survey.surveyType === 'exam') {
                  survey.isShowScore = true;
                }
              }
            }

            setAnswerCheckResult(answerCheckResult);

            if (answerCheckResult?.anCheckIsPass === false && 
                answerCheckResult.anCheckResultCode !== 403 && 
                answerCheckResult.anCheckResultCode !== 409) {
              setSurvey({
                answerMsg: {
                  showAnswerMsg: true,
                  answerMsgInfo: answerCheckResult.anCheckResultMsg,
                  noSurveyJson: false,
                  answerCheckResult
                }
              });
            } else {
              survey.answerCheckResult = answerCheckResult;
              initAnswerBySurvey(survey);
              loadAnswerData(survey);
            }

            document.title = `${survey.surveyNameObj?.dwText || ''} - 调问网`;
            resolve();
          },
          (answerCheckResult: AnswerCheckResult) => {
            if (answerCheckResult?.anCheckIsPass === false) {
              setSurvey({
                answerMsg: {
                  showAnswerMsg: true,
                  answerMsgInfo: answerCheckResult.anCheckResultMsg,
                  noSurveyJson: true,
                  answerCheckResult
                },
                showSurvey: true
              });
              if (answerCheckResult.anCheckResultCode && answerCheckResult.anCheckResultCode >= 500) {
                message.error(answerCheckResult.anCheckResultMsg);
              }
            }
            resolve();
          }
        );
      });
    } catch (error) {
      console.error('Error loading survey:', error);
    } finally {
      message.destroy(loadingInstance as any);
      setLoading(false);
    }
  };

  const loadAnswerData = async (survey: Survey) => {
    if (answerProps.answerId) {
      try {
        const response = await dwSurveyAnswerById({ surveyId: survey.surveyId, answerId: answerProps.answerId });
        if (response.data.resultCode === 200) {
          setAnswerData(response.data.data);
        } else {
          message.warning('未找到对应的答卷记录！');
        }
        answerData2Survey(survey);
      } catch (error) {
        console.error('Error loading answer data:', error);
      }
    } else {
      answerData2Survey(survey);
    }
  };

  const answerData2Survey = (survey: Survey) => {
    if (answerData) {
      parseAnswerData(survey, answerData);
    }
    survey.answerMsg = { showAnswerMsg: false, answerMsgInfo: null, noSurveyJson: false };
    setSurveyData(survey);
  };

  const setSurveyData = (survey: Survey) => {
    if (answerProps.answerId && survey.dwEsSurveyAnswer) {
      const endAnDate = survey.dwEsSurveyAnswer.answerCommon?.anTime?.endAnDate;
      if (endAnDate && 
          (!extProps || !extProps.readonly) && 
          new Date(endAnDate).getTime() < surveyAnswerLocalStorage.getSurveyAnswerActionTime(survey)) {
        Modal.confirm({
          title: '提示',
          content: '检测到当前加载的答卷数据在本地有过修改，是否使用本地最新修改。',
          okText: '是，使用本地最新数据',
          cancelText: '否，使用原始提交数据',
          onOk: () => {
            localStorage2Survey(survey);
            lastSetSurvey();
          },
          onCancel: () => {
            setSurvey(survey);
            lastSetSurvey();
          }
        });
      } else {
        setSurvey(survey);
        lastSetSurvey();
      }
    } else {
      localStorage2Survey(survey);
      lastSetSurvey();
    }
  };

  const localStorage2Survey = (survey: Survey) => {
    const localStorageSurveyObj = getLocalStorage(survey);
    if (localStorageSurveyObj) {
      localSurveyInitParams(localStorageSurveyObj);
      setSurvey(localStorageSurveyObj);
    } else {
      showPageByIndex(survey, 1, 'next');
      setSurvey(survey);
    }
  };

  const getLocalStorage = (survey: Survey): Survey | null => {
    const sid = survey.sid;
    const answerId = getEsId(survey);
    const localStorageSurveyObj = surveyAnswerLocalStorage.getSurveyAnswerObjByLocalStorage(sid, answerId);
    
    if (localStorageSurveyObj && survey.dwVersion && localStorageSurveyObj.dwVersion) {
      if (survey.dwVersion === localStorageSurveyObj.dwVersion) {
        return localStorageSurveyObj;
      } else {
        const localAnswer = getSurveyAnswerData(localStorageSurveyObj);
        parseAnswerData(survey, localAnswer);
        showPageByIndex(survey, 1, 'next');
        return survey;
      }
    }
    return null;
  };

  const checkAnswerPwd = () => {
    if (survey?.surveyAttrs?.anPwdAttr?.enabled && !answerCheckResult?.anCheckIsPass) {
      setSurvey(prev => ({
        ...prev!,
        answerMsg: {
          ...prev!.answerMsg,
          showAnswerMsg: true,
          showAnswerPwd: true,
          answerPwdError: '请输入正确密码'
        }
      }));
    }
  };

  const lastSetSurvey = () => {
    if (!survey) return;

    initAnswerSurveyProgress(survey);
    showPageByIndex(survey, 1, 'next');
    dwSurveyAnswerLogicLoad(survey);
    checkAnswerPwd();

    setSurvey(prev => ({
      ...prev!,
      firstLoadAnswer: false,
      dwParams: { relateContactEsId: answerProps.relateContactEsId }
    }));
  };

  const localSurveyInitParams = (survey: Survey) => {
    survey.watchEvent = 'oooww';
    survey.watchEventScrollToId = 'aa22';
    survey.scrollToQuIndex = null;
  };

  if (loading) {
    return (
      <div className="dw-answer-custom-theme">
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
          tip="数据加载中..."
        />
      </div>
    );
  }

  return (
    <div className="dw-answer-custom-theme">
      {survey && (
        <DwAnswerDefaultLayout 
          survey={survey as any} 
          extProps={extProps as any} 
        />
      )}
    </div>
  );
};

export default DwAnswerSurveyMain;