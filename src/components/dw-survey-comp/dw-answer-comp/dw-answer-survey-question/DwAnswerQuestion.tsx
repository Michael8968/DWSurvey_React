import React from "react";
import { Collapse } from "antd";
import DwAnswerQuestionCommon from "./DwAnswerQuestionCommon";
import DwAnswerQuRadio from "./dw-answer-questions/dw-answer-qu-radio/DwAnswerQuRadio.tsx";
import DwAnswerQuCheckbox from "./dw-answer-questions/dw-answer-qu-checkbox/DwAnswerQuCheckbox.tsx";
import DwAnswerQuFbk from "./dw-answer-questions/dw-answer-qu-fbk/DwAnswerQuFbk.tsx";
import DwAnswerQuScore from "./dw-answer-questions/dw-answer-qu-score/DwAnswerQuScore.tsx";
import DwAnswerQuOrder from "./dw-answer-questions/dw-answer-qu-orderby/DwAnswerQuOrder.tsx";
import DwAnswerQuMFbk from "./dw-answer-questions/dw-answer-qu-mfbk/DwAnswerQuMFbk.tsx";
import DwAnswerQuUpload from "./dw-answer-questions/dw-answer-qu-upload/DwAnswerQuUpload.tsx";
import DwAnswerQuMatrixRadio from "./dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-radio/DwAnswerQuMatrixRadio.tsx";
import DwAnswerQuMatrixCheckbox from "./dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-checkbox/DwAnswerQuMatrixCheckbox.tsx";
import DwAnswerQuMatrixInput from "./dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-fbk/DwAnswerQuMatrixInput.tsx";
import DwAnswerQuMatrixScale from "./dw-answer-questions/dw-answer-qu-matrix/dw-answer-qu-matrix-scale/DwAnswerQuMatrixScale.tsx";
import { quLogicIsHide } from "../dw-utils/dw-survey-answer-logic";

interface DwAnswerQuestionProps {
  index: number;
  item: any;
  survey: any;
  answer: any;
  onChange: (survey: any) => void;
}

const DwAnswerQuestion: React.FC<DwAnswerQuestionProps> = ({
  index,
  item,
  survey,
  answer,
  onChange,
}) => {
  const isLogicHide = quLogicIsHide(survey, item);

  const renderQuestionContent = () => {
    switch (item.quType) {
      case "RADIO":
        return (
          <DwAnswerQuRadio
            survey={survey}
            index={index}
            onUpdateOptions={onChange}
          />
        );
      case "CHECKBOX":
        return (
          <DwAnswerQuCheckbox
            survey={survey}
            index={index}
            answer={answer}
            onUpdateOptions={onChange}
          />
        );
      case "FILLBLANK":
        return (
          <DwAnswerQuFbk
            index={index}
            survey={survey}
            answer={answer}
            onSurveyChange={onChange}
          />
        );
      case "SCORE":
        return (
          <DwAnswerQuScore
            survey={survey}
            index={index}
            onUpdateOptions={onChange}
          />
        );
      case "ORDERQU":
        return (
          <DwAnswerQuOrder
            survey={survey}
            index={index}
            onUpdateOptions={onChange}
          />
        );
      case "MULTIFILLBLANK":
        return (
          <DwAnswerQuMFbk
            survey={survey}
            index={index}
            onUpdateOptions={onChange}
          />
        );
      case "UPLOADFILE":
        return (
          <DwAnswerQuUpload
            survey={survey}
            index={index}
            onUpdateOptions={onChange}
          />
        );
      case "MATRIX_RADIO":
        return (
          <DwAnswerQuMatrixRadio
            survey={survey}
            index={index}
            onUpdateSurvey={onChange}
          />
        );
      case "MATRIX_CHECKBOX":
        return (
          <DwAnswerQuMatrixCheckbox
            survey={survey}
            index={index}
            onUpdateSurvey={onChange}
          />
        );
      case "MATRIX_INPUT":
        return (
          <DwAnswerQuMatrixInput
            survey={survey}
            index={index}
            onUpdateSurvey={onChange}
          />
        );
      case "MATRIX_SCALE":
      case "MATRIX_SLIDER":
        return (
          <DwAnswerQuMatrixScale
            survey={survey}
            index={index}
            onUpdateSurvey={onChange}
          />
        );
      default:
        return null;
    }
  };

  const shouldShow = (item.showQu && !item.logicIsHide) || survey.readonly;

  return (
    <div>
      <Collapse.Panel
        key={`question-${index}`}
        header={null}
        showArrow={false}
        style={{ display: shouldShow ? "block" : "none" }}
      >
        <div>
          <DwAnswerQuestionCommon
            index={index}
            options={{ themeColor: "red" }}
            survey={survey as any}
            answer={answer as any}
            onSurveyChange={onChange}
          >
            {renderQuestionContent()}
          </DwAnswerQuestionCommon>
        </div>
      </Collapse.Panel>
    </div>
  );
};

export default DwAnswerQuestion;
