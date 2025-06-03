import React from 'react';
import DwAnswerQuMatrixOptionCommon1 from '../common/dw-answer-matrix-common1/DwAnswerQuMatrixOptionCommon1.tsx';

interface Survey {
  questions: Array<{
    quType: string;
    // Add other question properties as needed
  }>;
  // Add other survey properties as needed
}

interface Answer {
  // Define answer properties as needed
}

interface DwAnswerQuMatrixCheckboxProps {
  index?: number;
  survey: Survey;
  answer?: Answer;
  onUpdateSurvey?: (survey: Survey) => void;
}

const DwAnswerQuMatrixCheckbox: React.FC<DwAnswerQuMatrixCheckboxProps> = (props) => {
  const { index = 0, survey, answer, onUpdateSurvey } = props;

  const handleChange = (updatedSurvey: Survey) => {
    if (onUpdateSurvey) {
      onUpdateSurvey(updatedSurvey);
    }
  };

  return (
    <DwAnswerQuMatrixOptionCommon1
      index={index}
      survey={survey}
      quType={survey.questions[index].quType}
      onSurveyChange={handleChange}
    />
  );
};

export default DwAnswerQuMatrixCheckbox;