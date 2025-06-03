import React from 'react';
import DwQuCheckboxOptions from './components/DwQuCheckboxOptions';

interface DwAnswerQuCheckboxProps {
  index: number;
  survey: any;
  answer: any;
  onUpdateOptions: (survey: any) => void;
}

const DwAnswerQuCheckbox: React.FC<DwAnswerQuCheckboxProps> = ({ index = 0, survey = {}, answer = {}, onUpdateOptions }) => {

  return (
    <DwQuCheckboxOptions
      survey={survey}
      onSurveyChange={onUpdateOptions}
      index={index}
      answer={answer}
    />
  );
};

export default DwAnswerQuCheckbox;