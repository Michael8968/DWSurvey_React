import React from 'react';
import DwQuRadioOptions from './components/DwQuRadioOptions';

interface Survey {
  questions: any[];
}

interface Props {
  index: number;
  survey: Survey;
  onUpdateSurvey: (survey: Survey) => void;
}

const DwDesignQuRadio: React.FC<Props> = ({ index, survey, onUpdateSurvey }) => {
  return (
    <DwQuRadioOptions
      value={survey}
      index={index}
      onChange={onUpdateSurvey}
    />
  );
};

export default DwDesignQuRadio; 