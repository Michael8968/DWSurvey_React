import React, { useRef } from 'react';
import DwQuCheckboxOptions from './components/DwQuCheckboxOptions';

interface Survey {
  questions: any[];
}

interface Props {
  index: number;
  survey: Survey;
  onUpdateSurvey: (survey: Survey) => void;
}

const DwDesignQuCheckbox: React.FC<Props> = ({ index, survey, onUpdateSurvey }) => {
  const dwQuestionRef = useRef<any>(null);

  return (
    <DwQuCheckboxOptions
      ref={dwQuestionRef}
      value={survey}
      index={index}
      onChange={onUpdateSurvey}
    />
  );
};

export default DwDesignQuCheckbox; 