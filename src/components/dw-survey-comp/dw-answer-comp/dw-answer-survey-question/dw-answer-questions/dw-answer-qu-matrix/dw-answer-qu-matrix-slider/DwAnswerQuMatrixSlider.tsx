import React from 'react';
import DwAnswerQuMatrixOptionCommon1 from '../common/dw-answer-matrix-common1/DwAnswerQuMatrixOptionCommon1.tsx';
import DwAnswerQuMatrixOptionCommon2 from '../common/dw-answer-matrix-common2/DwAnswerQuMatrixOptionCommon2.tsx';

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

interface DwAnswerQuMatrixSliderProps {
  index?: number;
  survey: Survey;
  answer?: Answer;
  'onUpdate-survey'?: (updatedSurvey: Survey) => void;
}

const DwAnswerQuMatrixSlider: React.FC<DwAnswerQuMatrixSliderProps> = ({
  index = 0,
  survey,
  answer,
  'onUpdate-survey': onUpdateSurvey
}) => {
  const handleSurveyUpdate = (updatedSurvey: Survey) => {
    if (onUpdateSurvey) {
      onUpdateSurvey(updatedSurvey);
    }
  };

  return (
    <DwAnswerQuMatrixOptionCommon2
      index={index}
      survey={survey}
      quType={survey.questions[index].quType}
      onSurveyChange={handleSurveyUpdate}
    />
  );
};

export default DwAnswerQuMatrixSlider;