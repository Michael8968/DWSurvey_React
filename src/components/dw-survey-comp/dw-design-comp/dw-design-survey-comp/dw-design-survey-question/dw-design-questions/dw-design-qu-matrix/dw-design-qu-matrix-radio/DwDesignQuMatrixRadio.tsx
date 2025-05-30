import React from 'react';
import DwQuMatrixRadioOptions from './components/DwQuMatrixRadioOptions';

interface Survey {
  questions: Array<{
    quType: string;
    [key: string]: any;
  }>;
}

interface Props {
  index: number;
  survey: Survey;
  onChange?: (survey: Survey) => void;
}

const DwDesignQuMatrixRadio: React.FC<Props> = ({
  index,
  survey,
  onChange
}) => {
  return (
    <div>
      <DwQuMatrixRadioOptions
        survey={survey}
        index={index}
        onChange={onChange}
      />
    </div>
  );
};

export default DwDesignQuMatrixRadio; 