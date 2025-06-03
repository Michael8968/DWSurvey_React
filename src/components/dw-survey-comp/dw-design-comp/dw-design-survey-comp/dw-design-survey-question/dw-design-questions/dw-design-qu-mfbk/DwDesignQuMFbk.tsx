import React from 'react';
import DwQuMFbkOptions from './components/DwQuMFbkOptions';

interface Survey {
  questions: Array<{
    quType: string;
    quMultiFillblanks: any[];
  }>;
}

interface Props {
  index: number;
  survey: Survey;
  onChange?: (survey: Survey) => void;
}

const DwDesignQuMFbk: React.FC<Props> = ({
  index,
  survey,
  onChange
}) => {
  return (
    <DwQuMFbkOptions
      survey={survey as any}
      index={index}
      onSurveyChange={onChange as any}
    />
  );
};

export default DwDesignQuMFbk; 