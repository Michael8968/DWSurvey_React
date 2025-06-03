import React from 'react';
import DwQuOptionCommon1 from '../../../dw-design-options/dw-qu-option-common1/DwQuOptionCommon1';
import DwQuOptionCommon2 from '../../../dw-design-options/dw-qu-option-common2/DwQuOptionCommon2';
import DwQuOptionCommon4 from '../../../dw-design-options/dw-qu-option-common4/DwQuOptionCommon4';

interface QuCheckbox {
  optionTitleObj?: { dwHtml: string };
  [key: string]: any;
}

interface Question {
  hv: number;
  quCheckboxs: QuCheckbox[];
  quType: string;
}

interface Survey {
  questions: Question[];
}

interface Props {
  index: number;
  survey: Survey;
  onSurveyChange: (newSurvey: Survey) => void;
}

const DwQuCheckboxOptions: React.FC<Props> = ({ index, survey, onSurveyChange }) => {
  const question = survey.questions[index];

  const handleCheckboxChange = (newCheckboxs: QuCheckbox[]) => {
    const updatedSurvey = { ...survey };
    updatedSurvey.questions[index] = {
      ...updatedSurvey.questions[index],
      quCheckboxs: newCheckboxs,
    };
    onSurveyChange(updatedSurvey);
  };

  return (
    <div>
      {question.hv === 1 && (
        <DwQuOptionCommon1
          onUpdateOptions={handleCheckboxChange}
          survey={survey as any}
          index={index}
          quType={question.quType}
          options={question.quCheckboxs as any}
        />
      )}
      {question.hv === 2 && (
        <DwQuOptionCommon2
          onUpdateOptions={handleCheckboxChange}
          survey={survey as any}
          index={index}
          quType={question.quType}
          options={question.quCheckboxs as any}
        />
      )}
      {question.hv === 4 && (
        <DwQuOptionCommon4
          onUpdateOptions={handleCheckboxChange}
          survey={survey as any}
          index={index}
          quType={question.quType}
          options={question.quCheckboxs as any}
        />
      )}
    </div>
  );
};

export default DwQuCheckboxOptions;
