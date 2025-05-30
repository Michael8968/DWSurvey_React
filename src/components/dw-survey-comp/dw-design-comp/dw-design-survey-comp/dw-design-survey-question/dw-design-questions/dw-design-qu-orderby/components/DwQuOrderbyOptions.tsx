import React from 'react';
import DwQuOptionCommon2 from '../../../dw-design-options/dw-qu-option-common2/DwQuOptionCommon2';

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

const DwQuOrderbyOptions: React.FC<Props> = ({
  index,
  survey,
  onChange
}) => {
  return (
    <div>
      <DwQuOptionCommon2
        survey={survey}
        index={index}
        quType={survey.questions[index].quType}
        onChange={onChange}
      />
    </div>
  );
};

export default DwQuOrderbyOptions; 