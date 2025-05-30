import React from 'react';
import DwDesignQuestionCommon from './DwDesignQuestionCommon';
import DwDesignQuRadio from './dw-design-questions/dw-design-qu-radio/DwDesignQuRadio';
import DwDesignQuCheckbox from './dw-design-questions/dw-design-qu-checkbox/DwDesignQuCheckbox';
import DwDesignQuFbk from './dw-design-questions/dw-design-qu-fbk/DwDesignQuFbk';
import DwDesignQuOderby from './dw-design-questions/dw-design-qu-orderby/DwDesignQuOderby';
import DwDesignQuMFbk from './dw-design-questions/dw-design-qu-mfbk/DwDesignQuMFbk';
import DwDesignQuUpload from './dw-design-questions/dw-design-qu-upload/DwDesignQuUpload';
import DwDesignQuScore from './dw-design-questions/dw-design-qu-score/DwDesignQuScore';
import DwDesignQuPage from './dw-design-questions/dw-design-qu-pagetag/DwDesignQuPage';
import DwDesignQuParagraph from './dw-design-questions/dw-design-paragraph/DwDesignQuParagraph';
import DwDesignQuMatrixRadio from './dw-design-questions/dw-design-qu-matrix/dw-design-qu-matrix-radio/DwDesignQuMatrixRadio';
import DwDesignQuMatrixCheckbox from './dw-design-questions/dw-design-qu-matrix/dw-design-qu-matrix-checkbox/DwDesignQuMatrixCheckbox';
import DwDesignQuMatrixFbk from './dw-design-questions/dw-design-qu-matrix/dw-design-qu-matrix-fbk/DwDesignQuMatrixFbk';
import DwDesignQuMatrixScale from './dw-design-questions/dw-design-qu-matrix/dw-design-qu-matrix-scale/DwDesignQuMatrixScale';
import DwDesignQuMatrixSlider from './dw-design-questions/dw-design-qu-matrix/dw-design-qu-matrix-slider/DwDesignQuMatrixSlider';

interface Question {
  quType: string;
  [key: string]: any;
}

interface Survey {
  questions: Question[];
  [key: string]: any;
}

interface Props {
  index: number;
  item: Question;
  survey: Survey;
}

const DwDesignQuestion: React.FC<Props> = ({ index, item, survey }) => {
  const renderQuestionContent = () => {
    switch (item.quType) {
      case 'RADIO':
        return <DwDesignQuRadio survey={survey} index={index} />;
      case 'CHECKBOX':
        return <DwDesignQuCheckbox survey={survey} index={index} />;
      case 'FILLBLANK':
        return <DwDesignQuFbk survey={survey} index={index} />;
      case 'SCORE':
        return <DwDesignQuScore survey={survey} index={index} />;
      case 'ORDERQU':
        return <DwDesignQuOderby survey={survey} index={index} />;
      case 'MULTIFILLBLANK':
        return <DwDesignQuMFbk survey={survey} index={index} />;
      case 'UPLOADFILE':
        return <DwDesignQuUpload survey={survey} index={index} />;
      case 'PAGETAG':
        return <DwDesignQuPage survey={survey} index={index} />;
      case 'PARAGRAPH':
        return <DwDesignQuParagraph survey={survey} index={index} />;
      case 'MATRIX_RADIO':
        return <DwDesignQuMatrixRadio survey={survey} index={index} />;
      case 'MATRIX_CHECKBOX':
        return <DwDesignQuMatrixCheckbox survey={survey} index={index} />;
      case 'MATRIX_INPUT':
        return <DwDesignQuMatrixFbk survey={survey} index={index} />;
      case 'MATRIX_SCALE':
        return <DwDesignQuMatrixScale survey={survey} index={index} />;
      case 'MATRIX_SLIDER':
        return <DwDesignQuMatrixSlider survey={survey} index={index} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <DwDesignQuestionCommon survey={survey} index={index}>
        <div className="editQuContent">
          {renderQuestionContent()}
        </div>
      </DwDesignQuestionCommon>
    </div>
  );
};

export default DwDesignQuestion; 