import React from 'react';
import DwAnswerQuMatrixOptionCommon1 from '../common/dw-answer-matrix-common1/DwAnswerQuMatrixOptionCommon1.tsx';

interface Question {
  quType: string;
  // Add other question properties as needed
}

interface Survey {
  questions: Question[];
  // Add other survey properties as needed
}

interface Answer {
  // Define answer properties as needed
}

interface DwAnswerQuMatrixInputProps {
  index?: number;
  survey: Survey;
  answer?: Answer;
  onUpdateSurvey?: (updatedSurvey: Survey) => void;
}

const DwAnswerQuMatrixInput: React.FC<DwAnswerQuMatrixInputProps> = ({
  index = 0,
  survey,
  answer,
  onUpdateSurvey
}) => {
  const handleSurveyChange = (updatedSurvey: Survey) => {
    if (onUpdateSurvey) {
      onUpdateSurvey(updatedSurvey);
    }
  };

  return (
    <DwAnswerQuMatrixOptionCommon1
      index={index}
      survey={survey}
      quType={survey.questions[index].quType}
      onSurveyChange={handleSurveyChange}
    />
  );
};

export default DwAnswerQuMatrixInput;