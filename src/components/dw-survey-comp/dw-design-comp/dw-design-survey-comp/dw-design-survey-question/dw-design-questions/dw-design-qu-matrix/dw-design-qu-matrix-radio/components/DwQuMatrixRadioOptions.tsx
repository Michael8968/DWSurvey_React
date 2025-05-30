import React from 'react';
import DwQuMatrixOptionCommon1 from '../../common/dw-design-matrix-common1/DwQuMatrixOptionCommon1';
import './DwQuMatrixRadioOptions.scss';

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

const DwQuMatrixRadioOptions: React.FC<Props> = ({
  index,
  survey,
  onChange
}) => {
  return (
    <div>
      <DwQuMatrixOptionCommon1
        survey={survey}
        index={index}
        onChange={onChange}
      />
    </div>
  );
};

export default DwQuMatrixRadioOptions; 