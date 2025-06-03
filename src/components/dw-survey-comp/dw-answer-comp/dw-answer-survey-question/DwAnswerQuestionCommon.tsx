import React, { useState } from 'react';
import { Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import DwHtmlLabelCommon from '../dw-answer-survey-common/DwHtmlLabelCommon';
import { 
  dwResetQuestionRefreshValue, 
  dwSurveyQuAddOption 
} from '../../dw-utils/dw-survey-update-question';
import { 
  clickQuItem, 
  upAllItemClick 
} from '../../dw-utils/dw-survey-update-item-click';
import { 
  showPageByIndex 
} from '../../dw-utils/dw-survey-answer-data';
import { 
  validateQuestionsBoolBySurvey 
} from '../../dw-utils/dw-survey-answer-validate';
import '../../../../assets/css/dw-answer.css';

interface DwAnswerQuestionCommonProps {
  index: number;
  options?: {
    themeColor?: string;
  };
  survey: any;
  onSurveyChange?: (survey: any) => void;
}

const DwAnswerQuestionCommon: React.FC<DwAnswerQuestionCommonProps> = ({
  index,
  options = { themeColor: 'red' },
  survey,
  onSurveyChange
}) => {
  const [hover, setHover] = useState(false);
  const [itemHover, setItemHover] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);

  const quNum = React.useMemo(() => {
    if (survey?.surveyStyle) {
      const surveyStyle = survey.surveyStyle;
      if (surveyStyle && surveyStyle.showQuNum) {
        const questions = survey.questions;
        let quNum = 0;
        questions.forEach((item: any, idx: number) => {
          if (item.quType !== 'PAGETAG' && item.quType !== 'PARAGRAPH' && idx <= index && !item.logicIsHide) quNum++;
        });
        return quNum;
      }
    }
    return null;
  }, [survey, index]);

  const handleNextPage = (pageIndex: number, prevOrNext: string) => {
    if (pageIndex < survey.pageAttr.curPage || validateQuestionsBoolBySurvey(survey)) {
      const newSurvey = { ...survey };
      newSurvey.scrollToQuIndex = survey.pageAttr.begin;
      newSurvey.scrollToQuIndexWatchEvent = uuidv4();
      showPageByIndex(newSurvey, pageIndex, prevOrNext);
      onSurveyChange?.(newSurvey);
    }
  };

  const handleClickItem = () => {
    clickQuItem(survey, itemIndex, index, (newSurvey: any, newItemIndex: number) => {
      onSurveyChange?.(newSurvey);
      setItemIndex(newItemIndex);
    });
  };

  const handleAddQuItem = () => {
    const quOption = {
      id: null,
      optionTitleObj: {
        dwHtml: '',
        dwText: '',
        dwPlaceholder: '请输入内容',
        isRefreshValue: true
      },
      itemClick: true
    };
    const newSurvey = dwSurveyQuAddOption(survey, index, quOption);
    onSurveyChange?.(newSurvey);
    upAllItemClick(survey, [itemIndex], (newSurvey: any) => {
      onSurveyChange?.(newSurvey);
    });
  };

  const handleDeleteQu = () => {
    if (window.confirm('确认删除？')) {
      const newSurvey = { ...survey };
      newSurvey.questions.splice(index, 1);
      onSurveyChange?.(newSurvey);
    }
  };

  const handleCopyQu = () => {
    const newSurvey = { ...survey };
    const question = newSurvey.questions[index];
    const newQu = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(question)));
    newSurvey.questions.splice(index + 1, 0, newQu);
    onSurveyChange?.(newSurvey);
  };

  const handleUpQu = () => {
    const newSurvey = { ...survey };
    const curQuestion = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(newSurvey.questions[index])));
    const prevQuestion = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(newSurvey.questions[index - 1])));
    newSurvey.questions.splice(index - 1, 1, curQuestion);
    newSurvey.questions.splice(index, 1, prevQuestion);
    onSurveyChange?.(newSurvey);
  };

  const handleDownQu = () => {
    const newSurvey = { ...survey };
    const curQuestion = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(newSurvey.questions[index])));
    const nextQuestion = dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(newSurvey.questions[index + 1])));
    newSurvey.questions.splice(index + 1, 1, curQuestion);
    newSurvey.questions.splice(index, 1, nextQuestion);
    onSurveyChange?.(newSurvey);
  };

  return (
    <div>
      <div 
        className="dw-question-root" 
        onMouseOver={() => setHover(true)} 
        onMouseLeave={() => setHover(false)}
      >
        <div className="dw-question-body">
          <div className="dw-question-body-center">
            <div className="dw-question-body-center-body dw-color-333">
              <div className="dw-qu-content">
                <div className="dw-qu-title-body dw-display-flex dw-width-100bf" style={{ alignItems: 'baseline', flexWrap: 'wrap' }}>
                  {survey.questions[index].quType !== 'PAGETAG' ? (
                    <div className="dw-display-flex" style={{ alignItems: 'baseline' }}>
                      <div className="dw-display-flex" style={{ alignItems: 'baseline', flexWrap: 'wrap' }}>
                        {survey.questions[index].quType !== 'PARAGRAPH' && (
                          <div className="dw-qu-title">
                            <DwHtmlLabelCommon
                              value={survey.questions[index].quTitleObj}
                              itemClick={true}
                              btnSize="15px"
                              quNum={quNum}
                              isRequired={survey.questions[index].quAttr.isRequired}
                            />
                          </div>
                        )}
                        {survey.questions[index].quType === 'PARAGRAPH' && (
                          <div className="dw-qu-title dw-qu-paragraph">
                            <DwHtmlLabelCommon
                              value={survey.questions[index].quTitleObj}
                              isRequired={false}
                            />
                          </div>
                        )}
                        {survey.surveyStyle?.showQuTypeName && (
                          <div className="dw-qu-type-name">
                            <div className="dw-font-12 dw-color-grey-10">
                              【{survey.questions[index].quTypeName}】
                            </div>
                          </div>
                        )}
                        {survey.surveyStyle?.showQuScoreNum && (
                          <div style={{ marginLeft: '2px' }}>
                            <div className="dw-font-12 dw-color-grey-10">
                              满分{survey.questions[index].quAttr.scoreAttr.maxScore}分
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="dw-width-100bf">
                      {survey.pageAttr?.curPage && !survey.readonly && (
                        <>
                          <Button 
                            type="primary" 
                            className="dw-answer-button-style1"
                            onClick={() => handleNextPage(survey.pageAttr.curPage + 1, 'next')}
                          >
                            下一页（{survey.pageAttr.curPage}/{survey.pageAttr.pageSize}）
                          </Button>
                          {survey.pageAttr.curPage > 1 && (
                            <Button 
                              type="primary" 
                              className="dw-answer-button-style1"
                              onClick={() => handleNextPage(survey.pageAttr.curPage - 1, 'prev')}
                            >
                              上一页
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
                {survey.questions[index].quNoteObj.dwHtml && (
                  <div style={{ fontSize: '12px', color: 'grey', marginBottom: '5px' }}>
                    <DwHtmlLabelCommon
                      value={survey.questions[index].quNoteObj}
                      itemClick={true}
                      btnSize="15px"
                      quNum={quNum}
                      isRequired={survey.questions[index].quAttr.isRequired}
                    />
                  </div>
                )}
                <div className="dw-qu-content-body" style={{ paddingTop: '5px' }}>
                  <div className="dw-qu-content-body-content">
                    {/* 这里需要根据具体需求实现 editQuContent slot */}
                  </div>
                  <div className="dw-question-body-bottom">
                    <div>
                      {!survey.questions[index].validateObj.isOk && 
                       survey.questions[index].validateObj.errorText && (
                        <div className="dw-answer-question-error">
                          <i className="fa-solid fa-circle-exclamation"></i>
                          {survey.questions[index].validateObj.errorText}
                        </div>
                      )}
                      {survey.dwDebug && (
                        <div>{JSON.stringify(survey.questions[index].validateObj)}</div>
                      )}
                    </div>
                    {survey.isShowScore && 
                     survey.questions[index].anQuestion?.quAnScore !== undefined && (
                      <div className="dw-qu-answer-score">
                        本题得：
                        {survey.questions[index].quAttr.scoreAttr.maxScore === 
                         survey.questions[index].anQuestion.quAnScore ? (
                          <span style={{ color: 'green' }}>
                            满分{survey.questions[index].anQuestion.quAnScore}分 
                            <i className="fa-solid fa-check"></i>
                          </span>
                        ) : survey.questions[index].quAttr.scoreAttr.maxScore > 0 && 
                           survey.questions[index].anQuestion.quAnScore === 0 ? (
                          <span style={{ color: 'red' }}>
                            {survey.questions[index].anQuestion.quAnScore}分 
                            <i className="fa-solid fa-xmark"></i>
                          </span>
                        ) : (
                          <span style={{ color: 'red' }}>
                            {survey.questions[index].anQuestion.quAnScore}分
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DwAnswerQuestionCommon;
