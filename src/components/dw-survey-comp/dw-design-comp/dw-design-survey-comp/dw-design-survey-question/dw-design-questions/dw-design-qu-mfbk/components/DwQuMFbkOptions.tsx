import React from 'react';
import DwQuOptionCommon1 from '../../../dw-design-options/dw-qu-option-common2/DwQuOptionCommon2';

interface Props {
  index: number;
  survey: any; // 建议替换为更具体的 Survey 类型
  onSurveyChange: (newSurvey: any) => void;
}

const DwQuMFbkOptions: React.FC<Props> = ({ index, survey, onSurveyChange }) => {
  const question = survey.questions[index];

  const handleChange = (newValue: any) => {
    const updatedSurvey = { ...survey };
    updatedSurvey.questions[index] = {
      ...updatedSurvey.questions[index],
      quMultiFillblanks: newValue,
    };
    onSurveyChange(updatedSurvey);
  };

  return (
    <div>
      <DwQuOptionCommon1
        options={question.quMultiFillblanks as any}
        onUpdateOptions={handleChange}
        survey={survey as any}
        index={index}
        quType={question.quType}
      />
    </div>
  );
};

export default DwQuMFbkOptions;
