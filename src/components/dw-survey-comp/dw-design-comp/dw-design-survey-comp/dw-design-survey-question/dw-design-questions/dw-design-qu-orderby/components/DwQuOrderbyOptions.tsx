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
        survey={survey as any}
        index={index}
        quType={survey.questions[index].quType}
        onUpdateOptions={onChange as any}
        options={survey.questions[index].quOrderbys as any}
      />
    </div>
  );
};

export default DwQuOrderbyOptions; 