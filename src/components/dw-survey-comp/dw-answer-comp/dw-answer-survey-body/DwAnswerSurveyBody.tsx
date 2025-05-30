import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button, Form, Input, Image, message } from 'antd';
import DwAnswerQuestion from '../dw-answer-survey-question/DwAnswerQuestion';
import DwHtmlLabelCommon from '../dw-answer-survey-common/DwHtmlLabelCommon';
import { getSurveyAnswerData } from '../../dw-utils/dw-survey-answer.ts';
import { validateQuestionsBool, validateQuestionsBoolBySurvey } from '../../dw-utils/dw-survey-answer-validate.ts';
import { dwSaveSurveyAnswerJson, dwSurveyAnswerCheckPwd } from '../api/dw-survey-answer.ts';
import { getEsId, surveyAnswerLocalStorage } from '../dw-utils/dw-survey-answer-utils.ts';
import { dwUpSurveyStyle } from '../dw-utils/dw-survey-answer-style.ts';
import { showPageByIndex } from '../../dw-utils/dw-survey-answer-data.ts';

interface DwAnswerSurveyBodyProps {
  survey: any;
  extProps?: any;
}

const DwAnswerSurveyBody: React.FC<DwAnswerSurveyBodyProps> = ({ survey, extProps }) => {
  const [fullscreenLoading, setFullscreenLoading] = useState(false);
  const [answer, setAnswer] = useState({});
  const [isReAnswer, setIsReAnswer] = useState(false);
  const [anPwd, setAnPwd] = useState('');
  const [anRandomCode, setAnRandomCode] = useState('');
  const [indexResponseId, setIndexResponseId] = useState(null);
  const [dbAnswerId, setDbAnswerId] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const pwd = searchParams.get('anPwd');
    if (pwd) {
      setAnPwd(pwd);
    }
    dwUpSurveyStyle.dwUpSurveyStyleMain(survey);
  }, [survey, searchParams]);

  useEffect(() => {
    if (survey?.watchEventScrollToId) {
      dwScrollIntoView();
    }
  }, [survey?.watchEventScrollToId]);

  const nextPage = (pageIndex: number, prevOrNext: string) => {
    if (pageIndex < survey.pageAttr.curPage || validateQuestionsBool(survey.questions)) {
      showPageByIndex(survey, pageIndex, prevOrNext);
    }
  };

  const backReAnswer = () => {
    survey.answerMsg.showAnswerMsg = false;
    survey.answerMsg.answerMsgInfo = null;
    setAnswer({});
  };

  const configCheckAnswerPwdButton = () => {
    setFullscreenLoading(true);
    setTimeout(() => {
      checkAnPwd();
    }, 200);
  };

  const checkAnPwd = async () => {
    const params = { sid: survey.sid, anPwd };
    try {
      const response = await dwSurveyAnswerCheckPwd(params);
      const httpResult = response.data;
      if (httpResult?.resultCode === 200) {
        message.success('验证通过，请开始答卷');
        survey.answerMsg.showAnswerMsg = false;
        survey.answerMsg.showAnswerPwd = false;
      } else {
        message.warning('密码错误！');
      }
    } catch (error) {
      message.error('验证失败');
    } finally {
      setFullscreenLoading(false);
    }
  };

  const submitAnswer = () => {
    if (validateQuestionsBoolBySurvey(survey)) {
      if (extProps?.isPreview) {
        message.warning('当前预览状态，不可以提交答卷！');
      } else {
        submitAnswerPost();
      }
    } else {
      message.warning('请根据提示完成表单！');
    }
  };

  const submitAnswerPost = async () => {
    const sid = survey.sid;
    const answerId = getEsId(survey);
    const answerData = getSurveyAnswerData(survey);
    answerData.anPwd = anPwd;
    answerData.answerCommon.sid = sid;
    setAnswer(answerData);

    const surveyAnswerJsonText = JSON.stringify(answerData);
    const data = {
      surveyId: answerData.answerCommon.surveyId,
      sid,
      jsonVersion: 6,
      answerJson: surveyAnswerJsonText,
      anRandomCode
    };

    setFullscreenLoading(true);
    try {
      const response = await dwSaveSurveyAnswerJson(data);
      const httpResult = response.data;
      
      if (httpResult?.resultCode === 200) {
        const resultData = httpResult.data;
        if (resultData?.anCheckIsPass && resultData?.anCheckResultCode === 201 && resultData?.dbAnswerId) {
          survey.answerMsg.showAnswerMsg = true;
          survey.answerMsg.answerMsgInfo = '答卷提交成功';
          survey.answerMsg.answerCheckResult = resultData;
          setIsReAnswer(false);
          surveyAnswerLocalStorage.clearAnswerHistory(sid, answerId);
          
          setIndexResponseId(resultData.indexResponseId);
          setDbAnswerId(resultData.dbAnswerId);

          if (survey.surveyAttrs.scoreAttr.enabled && 
              survey.surveyAttrs.scoreAttr.showSumScore.enabled && 
              survey.surveyAttrs.scoreAttr.showSumScore.showContent === 'sumAndDetail') {
            message.success('提交成功，即将显示答卷结果...');
            setTimeout(() => {
              navigate(`/v6/diaowen/an/review/${sid}/${resultData.dbAnswerId}`);
            }, 1500);
          }
        } else {
          if (resultData?.anCheckResultMsg) {
            survey.answerMsg.showAnswerMsg = true;
            survey.answerMsg.answerMsgInfo = resultData.anCheckResultMsg;
            survey.answerMsg.answerCheckResult = resultData;
            
            if (resultData.anCheckResultCode === 410) {
              setIsReAnswer(true);
            }
          } else {
            message.warning('数据未保存，请确认！');
            setIsReAnswer(true);
          }
        }
      } else {
        message.error('保存失败！');
        survey.answerMsg.showAnswerMsg = true;
        survey.answerMsg.answerMsgInfo = '答卷保存失败，请重试!';
        setIsReAnswer(true);
      }
    } catch (error) {
      message.error('提交失败');
    } finally {
      setFullscreenLoading(false);
    }
  };

  const showAnswerDetail = () => {
    const sid = survey.sid;
    navigate(`/v6/diaowen/an/review/${sid}/${dbAnswerId}`);
  };

  const dwScrollIntoView = () => {
    const scrollToQuIndex = survey.scrollToQuIndex;
    if (scrollToQuIndex !== null && scrollToQuIndex >= 0) {
      const element = document.querySelector(`[data-question-index="${scrollToQuIndex}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!survey || !survey.hasOwnProperty('answerMsg')) {
    return null;
  }

  return (
    <div>
      {!survey.answerMsg.showAnswerMsg ? (
        <div className="dw-container-body-center" style={{ paddingBottom: '30px' }}>
          <div>
            {survey.surveyStyle.pageTopImg.enabled && survey.surveyStyle.pageTopImg.httpSrc && (
              <div style={{ position: 'relative' }}>
                <Image
                  src={survey.surveyStyle.pageTopImg.httpSrc}
                  style={{ width: '100%', height: '200px', display: 'block' }}
                  fit="cover"
                />
                {survey.surveyStyle.logoImg.enabled && survey.surveyStyle.logoImg.httpSrc && (
                  <div style={{
                    position: 'absolute',
                    [survey.surveyStyle.logoImg.position === 'pageTopImgLeft' ? 'left' : 'right']: '10px',
                    top: '10px'
                  }}>
                    <Image
                      src={survey.surveyStyle.logoImg.httpSrc}
                      style={{ height: '40px', display: 'block' }}
                      fit="cover"
                    />
                  </div>
                )}
              </div>
            )}

            {survey.surveyStyle.logoImg.enabled && survey.surveyStyle.logoImg.httpSrc && (
              <div className={`dw-display-flex-${survey.surveyStyle.logoImg.position.replace('topLogo', '').toLowerCase()} dw-answer-logo-bg-color`}>
                <div style={{ padding: '10px' }}>
                  <Image
                    src={survey.surveyStyle.logoImg.httpSrc}
                    style={{ height: '40px', display: 'block' }}
                    fit="cover"
                  />
                </div>
              </div>
            )}

            {survey.isShowScore && survey.dwEsSurveyAnswer && (
              <div style={{ padding: '10px', fontSize: '16px', color: 'var(--dw-answer-primary-color)', borderBottom: '1px dashed var(--dw-answer-primary-color)' }}>
                答卷得分：<strong style={{ color: 'red', fontSize: '20px' }}>{survey.dwEsSurveyAnswer.answerCommon.sumScore}分</strong>
              </div>
            )}

            {survey.surveyStyle.showPageHeader && (
              <div style={{ padding: '20px 20px 0 20px' }}>
                {survey.surveyStyle.showSurveyTitle && (
                  <div style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px 0' }}>
                    <DwHtmlLabelCommon value={survey.surveyNameObj} survey={survey} />
                  </div>
                )}
                {survey.surveyStyle.showSurveyNote && survey.surveyDetail && (
                  <div style={{ fontSize: '13px', color: '#7b7b7b', lineHeight: '20px', paddingTop: '15px' }}>
                    <DwHtmlLabelCommon value={survey.surveyDetail.surveyNodeObj} survey={survey} />
                  </div>
                )}
              </div>
            )}

            <div className="dw-survey-answer-body" style={{ paddingTop: '20px' }}>
              <div>
                {survey.questions.map((item: any, index: number) => (
                  <div key={`surveyQu${index}`} data-question-index={index}>
                    <DwAnswerQuestion
                      value={survey}
                      index={index}
                      item={item}
                    />
                  </div>
                ))}
              </div>

              {!survey.readonly && survey.pageAttr.curPage >= survey.pageAttr.pageSize && (
                <div style={{ textAlign: 'left' }} className="dw-width-100bf">
                  {survey.answerCheckResult?.showCaptcha && (
                    <div className="dw-display-flex" style={{ marginBottom: '10px' }}>
                      <div style={{ width: '160px' }}>
                        <Input
                          value={anRandomCode}
                          onChange={(e) => setAnRandomCode(e.target.value)}
                          placeholder="请输入右侧验证码"
                        />
                      </div>
                      <div style={{ marginLeft: '5px' }}>
                        <Image src="/api/dwsurvey/anon/jcap/jcaptcha.do" />
                      </div>
                    </div>
                  )}
                  
                  {!survey.answerMsg.noSurveyJson && (
                    <Button
                      type="primary"
                      className="dw-answer-button-style1"
                      loading={fullscreenLoading}
                      onClick={submitAnswer}
                    >
                      提交答卷
                    </Button>
                  )}
                  
                  {survey.pageAttr.curPage > 1 && (
                    <Button
                      type="primary"
                      plain
                      className="dw-answer-button-style1"
                      onClick={() => nextPage(survey.pageAttr.curPage - 1, 'prev')}
                    >
                      上一页
                    </Button>
                  )}
                </div>
              )}
            </div>

            {survey.dwDebug && <div className="dw-debug">{JSON.stringify(answer)}</div>}
          </div>
        </div>
      ) : (
        <div style={{ padding: '50px 20px', textAlign: 'center', background: 'white' }}>
          <div style={{ paddingBottom: '20px' }}>
            {!survey.answerMsg.noSurveyJson && (
              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                <DwHtmlLabelCommon value={survey.surveyNameObj} survey={survey} />
              </div>
            )}
          </div>

          {survey.answerMsg.showAnswerPwd && (
            <div style={{ textAlign: 'left' }}>
              <Form layout="vertical">
                <Form.Item label="此问卷需要答卷密码，请输入答卷密码">
                  <Input
                    value={anPwd}
                    onChange={(e) => setAnPwd(e.target.value)}
                    placeholder="请输入答卷密码"
                    allowClear
                  />
                  <div style={{ color: 'red' }}>{survey.answerMsg.answerPwdError}</div>
                </Form.Item>
              </Form>
              <div className="dw-width-100bf" style={{ textAlign: 'left' }}>
                <Button
                  type="primary"
                  className="dw-answer-button-style1"
                  loading={fullscreenLoading}
                  onClick={configCheckAnswerPwdButton}
                >
                  开始答卷
                </Button>
              </div>
            </div>
          )}

          <div>
            {survey.answerMsg.answerCheckResult?.anCheckResultCode >= 400 ? (
              <div style={{ color: 'red' }}>{survey.answerMsg.answerCheckResult.anCheckResultMsg}</div>
            ) : (
              <>
                <div style={{ color: 'dodgerblue' }}>{survey.answerMsg.answerMsgInfo}</div>
                {survey.surveyAttrs.scoreAttr.enabled && survey.surveyAttrs.scoreAttr.showSumScore.enabled && (
                  <div style={{ padding: '5px' }}>
                    <div style={{ color: '#097ef3', padding: '5px' }}>
                      总得分：<strong style={{ color: 'red' }}>{survey.answerMsg.answerCheckResult.sumScore}分</strong>
                    </div>
                    {survey.surveyAttrs.scoreAttr.showSumScore.showContent === 'sumAfterDetail' && (
                      <div style={{ padding: '5px' }}>
                        <Button onClick={showAnswerDetail}>查看详情</Button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
            {isReAnswer && (
              <div style={{ paddingTop: '15px' }}>
                <Button onClick={backReAnswer}>重新填写</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DwAnswerSurveyBody;
