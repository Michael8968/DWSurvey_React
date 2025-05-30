import React, { ReactNode } from 'react';
import DwAnswerQuestion from '../../../../../../dw-answer-comp/dw-answer-survey-question/DwAnswerQuestion';

interface Question {
  quType: string;
  hv?: number;
  answerInputRow?: number;
  dwsurveyfont?: string | null;
  [key: string]: any;
}

interface Survey {
  surveyNameObj: {
    dwHtml: string;
    dwText: string;
    dwPlaceholder: string;
  };
  questions: Question[];
  surveyTest: string;
  curEditObj: Array<{ itemClick: boolean }>;
  surveyStyle: {
    themeColor: string;
  };
  tempDataType: string;
}

interface Props {
  item: Question;
  children?: ReactNode;
  quModelTagDwsurveyfont?: ReactNode;
  quModelTagXialati?: ReactNode;
  quModelTagDanxuan?: ReactNode;
  quModelTagDuoxuan?: ReactNode;
  quModelTagDuoxiangwenben?: ReactNode;
  quModelTagTiankong?: ReactNode;
  quModelTagPingfen?: ReactNode;
  quModelTagPaixu?: ReactNode;
  quModelTagDuoxiangtiankong?: ReactNode;
  quModelTagShangchuan?: ReactNode;
  quModelTagFenye?: ReactNode;
  quModelTagFenduan?: ReactNode;
}

const DwDesignQuestionModelCommon: React.FC<Props> = ({
  item,
  children,
  quModelTagDwsurveyfont,
  quModelTagXialati,
  quModelTagDanxuan,
  quModelTagDuoxuan,
  quModelTagDuoxiangwenben,
  quModelTagTiankong,
  quModelTagPingfen,
  quModelTagPaixu,
  quModelTagDuoxiangtiankong,
  quModelTagShangchuan,
  quModelTagFenye,
  quModelTagFenduan
}) => {
  const survey: Survey = {
    surveyNameObj: {
      dwHtml: 'survey.surveyName',
      dwText: 'survey.surveyNameText',
      dwPlaceholder: '请输入问卷标题'
    },
    questions: [item],
    surveyTest: '',
    curEditObj: [{ itemClick: false }],
    surveyStyle: { themeColor: 'red' },
    tempDataType: 'modelComponents'
  };

  const renderQuestionContent = () => {
    if (item.dwsurveyfont !== null) {
      return (
        <>
          {quModelTagDwsurveyfont}
          <div className="cloneQuRoot">
            <div>
              <DwAnswerQuestion survey={survey} index={0} item={item} />
            </div>
          </div>
        </>
      );
    }

    switch (item.quType) {
      case 'RADIO':
        return item.hv === 4 ? (
          <>
            {quModelTagXialati}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        ) : (
          <>
            {quModelTagDanxuan}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        );
      case 'CHECKBOX':
        return (
          <>
            {quModelTagDuoxuan}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        );
      case 'FILLBLANK':
        return item.answerInputRow && item.answerInputRow > 1 ? (
          <>
            {quModelTagDuoxiangwenben}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        ) : (
          <>
            {quModelTagTiankong}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        );
      case 'SCORE':
        return (
          <>
            {quModelTagPingfen}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        );
      case 'ORDERQU':
        return (
          <>
            {quModelTagPaixu}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        );
      case 'MULTIFILLBLANK':
        return (
          <>
            {quModelTagDuoxiangtiankong}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        );
      case 'UPLOADFILE':
        return (
          <>
            {quModelTagShangchuan}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        );
      case 'PAGETAG':
        return (
          <>
            {quModelTagFenye}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        );
      case 'PARAGRAPH':
        return (
          <>
            {quModelTagFenduan}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            {children || (
              <div className="toolbar-item-content">
                <div className="dwToolbar_icon dwsurveyfont icon-dwsurvey-duoxiangtiankong" />
              </div>
            )}
            <div className="cloneQuRoot">
              <div>
                <DwAnswerQuestion survey={survey} index={0} item={item} />
              </div>
            </div>
          </>
        );
    }
  };

  return <div className="dw-answer-custom-theme">{renderQuestionContent()}</div>;
};

export default DwDesignQuestionModelCommon; 