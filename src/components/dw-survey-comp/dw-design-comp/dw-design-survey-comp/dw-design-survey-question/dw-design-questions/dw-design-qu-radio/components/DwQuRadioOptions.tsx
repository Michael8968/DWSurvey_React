import React from 'react';
import DwQuOptionCommon1 from '../../../dw-design-options/dw-qu-option-common1/DwQuOptionCommon1';
import DwQuOptionCommon2 from '../../../dw-design-options/dw-qu-option-common2/DwQuOptionCommon2';
import DwQuOptionCommon4 from '../../../dw-design-options/dw-qu-option-common4/DwQuOptionCommon4';

interface Question {
  hv: number;
  quType: string;
  quRadios: any[];
}

interface Survey {
  questions: Question[];
}

interface Props {
  value: Survey;
  index: number;
  onChange: (survey: Survey) => void;
}

const DwQuRadioOptions: React.FC<Props> = ({ value, index, onChange }) => {
  const updateOptions = (options: any[]) => {
    const newSurvey = { ...value };
    newSurvey.questions[index].quRadios = options;
    onChange(newSurvey);
  };

  const question = value.questions[index];

  return (
    <div>
      {question.hv === 1 && (
        <DwQuOptionCommon1
          options={question.quRadios}
          survey={value}
          index={index}
          quType={question.quType}
          onUpdateOptions={updateOptions}
        />
      )}
      {question.hv === 2 && (
        <DwQuOptionCommon2
          options={question.quRadios}
          survey={value}
          index={index}
          quType={question.quType}
          onUpdateOptions={updateOptions}
        />
      )}
      {question.hv === 4 && (
        <DwQuOptionCommon4
          options={question.quRadios}
          survey={value}
          index={index}
          quType={question.quType}
          onUpdateOptions={updateOptions}
        />
      )}
    </div>
  );
};

export default DwQuRadioOptions; 