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

const DwDesignQuMatrixSlider: React.FC<Props> = ({
  index,
  survey,
  onChange
}) => {
  return (
    <div>
    </div>
  );
};

export default DwDesignQuMatrixSlider; 