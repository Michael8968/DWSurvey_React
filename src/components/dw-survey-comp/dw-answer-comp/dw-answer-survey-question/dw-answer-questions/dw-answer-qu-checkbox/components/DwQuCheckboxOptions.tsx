import React, { useState } from 'react';
import DwQuOptionCommon1 from '../../../dw-answer-options/dw-qu-option-common1/DwQuOptionCommon1';
import DwQuOptionCommon2 from '../../../dw-answer-options/dw-qu-option-common2/DwQuOptionCommon2';
import DwQuOptionCommon4 from '../../../dw-answer-options/dw-qu-option-common4/DwQuOptionCommon4';

interface DwQuCheckboxOptionsProps {
  index: number;
  survey: any;
  answer: any;
  onSurveyChange: (survey: any) => void;
}

const DwQuCheckboxOptions : React.FC<DwQuCheckboxOptionsProps> = ({ index = 0, survey = {}, answer = {}, onSurveyChange }) => {
  const currentQuestion = survey.questions?.[index] || {};
  
  return (
    <div>
      {/* Horizontal display */}
      {currentQuestion.hv === 1 && (
        <DwQuOptionCommon1
          survey={survey}
          onUpdateOptions={ onSurveyChange}
          options={currentQuestion.quCheckboxs}
          index={index}
          quType={currentQuestion.quType}
        />
      )}
      
      {/* Vertical display */}
      {currentQuestion.hv === 2 && (
        <DwQuOptionCommon2
          index={index}
          options={currentQuestion.quCheckboxs}
          survey={survey}
          quType={currentQuestion.quType}
          answer={answer}
          onUpdateOptions={ onSurveyChange}
        />
      )}
      
      {/* SELECT display */}
      {currentQuestion.hv === 4 && (
        <DwQuOptionCommon4
          index={index}
          options={currentQuestion.quCheckboxs}
          survey={survey}
          quType={currentQuestion.quType}
        />
      )}
    </div>
  );
};

export default DwQuCheckboxOptions;