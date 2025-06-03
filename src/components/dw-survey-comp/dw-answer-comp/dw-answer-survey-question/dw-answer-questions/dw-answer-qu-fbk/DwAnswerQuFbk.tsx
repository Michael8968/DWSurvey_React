import React, { useState, useEffect } from 'react';
import DwAnswerInput1 from '../../dw-answer-options/dw-qu-input-common1/DwAnswerInput1';
import { answerQuEventCommon } from '../../../dw-utils/dw-survey-answer-common';
import '../../../../../../assets/css/dw-answer.css';
import './DwAnswerQuFbk.css'; // Import the CSS file

interface DwAnswerQuFbkProps {
  index: number;
  survey: any;
  answer: any;
  onSurveyChange: (survey: any) => void;
}

const DwAnswerQuFbk: React.FC<DwAnswerQuFbkProps> = ({ index = 0, survey = {}, answer = {}, onSurveyChange }) => {
  const [inputText, setInputText] = useState('');
  
  // Computed property equivalent
  const isAnswer = () => {
    if (survey.questions?.[index]?.hasOwnProperty('answer')) {
      const answer = survey.questions[index].answer;
      return answer !== null && answer !== undefined && answer !== '';
    }
    return false;
  };

  // Mounted equivalent
  useEffect(() => {
    try {
      if (survey.questions?.[index]?.hasOwnProperty('answer') && 
          survey.questions[index].answer !== undefined) {
        const updatedQuestions = [...survey.questions];
        updatedQuestions[index].answer = JSON.parse(updatedQuestions[index].answer);
        onSurveyChange({ ...survey, questions: updatedQuestions });
      }
    } catch (e) {
      console.debug('e', e);
    }
  }, []);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    answerQuEventCommon(survey, index);
  };

  return (
    <div className="dw-qu-item">
      <DwAnswerInput1
        index={index}
        survey={survey}
        inputAttr={survey.questions[index].quAttr.inputAttr}
        optionIndex={index}
      />
    </div>
  );
};

export default DwAnswerQuFbk;