import React from 'react';
import DwQuCheckboxOptions from './components/DwQuCheckboxOptions';

interface DwAnswerQuCheckboxProps {
  index: number;
  survey: any;
  answer: any;
  onSurveyChange: (survey: any) => void;
}

const DwAnswerQuCheckbox: React.FC<DwAnswerQuCheckboxProps> = ({ index = 0, survey = {}, answer = {}, onSurveyChange }) => {

  return (
    <DwQuCheckboxOptions
      survey={survey}
      onSurveyChange={onSurveyChange}
      index={index}
      answer={answer}
    />
  );
};

export default DwAnswerQuCheckbox;