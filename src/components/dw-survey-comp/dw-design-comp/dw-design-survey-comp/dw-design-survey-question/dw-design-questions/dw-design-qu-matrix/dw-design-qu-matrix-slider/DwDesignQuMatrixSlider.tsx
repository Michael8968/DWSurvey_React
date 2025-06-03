import React from 'react';

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

const DwDesignQuMatrixSlider: React.FC<Props> = () => {
  return (
    <div>
    </div>
  );
};

export default DwDesignQuMatrixSlider; 