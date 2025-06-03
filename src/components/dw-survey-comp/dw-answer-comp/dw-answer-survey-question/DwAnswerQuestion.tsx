import React from 'react';
import { Collapse } from 'antd';
import DwAnswerQuestionCommon from './DwAnswerQuestionCommon';
import DwAnswerQuRadio from './dw-answer-questions/dw-answer-qu-radio/DwAnswerQuRadio';
import DwAnswerQuCheckbox from './dw-answer-questions/dw-answer-qu-checkbox/DwAnswerQuCheckbox';
import DwAnswerQuFbk from './dw-answer-questions/dw-answer-qu-fbk/DwAnswerQuFbk';
import DwAnswerQuScore from './dw-answer-questions/dw-answer-qu-score/DwAnswerQuScore';
import DwAnswerQuOrder from './dw-answer-questions/dw-answer-qu-orderby/DwAnswerQuOrder';
import DwAnswerQuMFbk from './dw-answer-questions/dw-answer-qu-mfbk/DwAnswerQuMFbk';
import DwAnswerQuUpload from './dw-answer-questions/dw-answer-qu-upload/DwAnswerQuUpload';
import DwAnswerQuMatrixRadio from './dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-radio/DwAnswerQuMatrixRadio';
import DwAnswerQuMatrixCheckbox from './dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-checkbox/DwAnswerQuMatrixCheckbox';
import DwAnswerQuMatrixInput from './dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-fbk/DwAnswerQuMatrixInput';
import DwAnswerQuMatrixScale from './dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-scale/DwAnswerQuMatrixScale';
import { quLogicIsHide } from '../dw-utils/dw-survey-answer-logic';

interface DwAnswerQuestionProps {
  index: number;
  item: any;
  survey: any;
  answer: any;
  onChange?: (survey: any) => void;
}

const DwAnswerQuestion: React.FC<DwAnswerQuestionProps> = ({
  index,
  item,
  survey,
  answer,
  onChange
}) => {
  const isLogicHide = quLogicIsHide(survey, item);

  const renderQuestionContent = () => {
    switch (item.quType) {
      case 'RADIO':
        return <DwAnswerQuRadio survey={survey} index={index} onChange={onChange} />;
      case 'CHECKBOX':
        return <DwAnswerQuCheckbox survey={survey} index={index} onChange={onChange} />;
      case 'FILLBLANK':
        return <DwAnswerQuFbk survey={survey} index={index} onChange={onChange} />;
      case 'SCORE':
        return <DwAnswerQuScore survey={survey} index={index} onChange={onChange} />;
      case 'ORDERQU':
        return <DwAnswerQuOrder survey={survey} index={index} onChange={onChange} />;
      case 'MULTIFILLBLANK':
        return <DwAnswerQuMFbk survey={survey} index={index} onChange={onChange} />;
      case 'UPLOADFILE':
        return <DwAnswerQuUpload survey={survey} index={index} onChange={onChange} />;
      case 'MATRIX_RADIO':
        return <DwAnswerQuMatrixRadio survey={survey} index={index} onChange={onChange} />;
      case 'MATRIX_CHECKBOX':
        return <DwAnswerQuMatrixCheckbox survey={survey} index={index} onChange={onChange} />;
      case 'MATRIX_INPUT':
        return <DwAnswerQuMatrixInput survey={survey} index={index} onChange={onChange} />;
      case 'MATRIX_SCALE':
      case 'MATRIX_SLIDER':
        return <DwAnswerQuMatrixScale survey={survey} index={index} onChange={onChange} />;
      default:
        return null;
    }
  };

  const shouldShow = (item.showQu && !item.logicIsHide) || survey.readonly;

  return (
    <div>
      <Collapse.Panel showArrow={false} style={{ display: shouldShow ? 'block' : 'none' }}>
        <DwAnswerQuestionCommon
          survey={survey}
          index={index}
          onChange={onChange}
        >
          {renderQuestionContent()}
        </DwAnswerQuestionCommon>
      </Collapse.Panel>
    </div>
  );
};

export default DwAnswerQuestion;
