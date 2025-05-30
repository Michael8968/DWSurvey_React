import React from 'react';
import DwQuOrderbyOptions from './components/DwQuOrderbyOptions';

interface Survey {
  questions: Array<{
    quType: string;
    quOrderbys: any[];
  }>;
}

interface Props {
  index: number;
  survey: Survey;
  onChange?: (survey: Survey) => void;
}

const DwDesignQuOrderby: React.FC<Props> = ({
  index,
  survey,
  onChange
}) => {
  return (
    <DwQuOrderbyOptions
      survey={survey}
      index={index}
      onChange={onChange}
    />
  );
};

export default DwDesignQuOrderby; 