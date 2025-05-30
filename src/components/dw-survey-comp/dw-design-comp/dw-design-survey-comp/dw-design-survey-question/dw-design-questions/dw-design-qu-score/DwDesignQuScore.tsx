import React from 'react';
import DwQuScoreOptions from './components/DwQuScoreOptions';

interface Survey {
  questions: Array<{
    quType: string;
    quScores: any[];
  }>;
}

interface Props {
  index: number;
  survey: Survey;
  onChange?: (survey: Survey) => void;
}

const DwDesignQuScore: React.FC<Props> = ({
  index,
  survey,
  onChange
}) => {
  return (
    <DwQuScoreOptions
      survey={survey}
      index={index}
      onChange={onChange}
    />
  );
};

export default DwDesignQuScore; 