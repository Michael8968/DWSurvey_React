import React, { useState } from 'react';
import { Input } from 'antd';
import './DwDesignQuFbk.scss';

interface Question {
  answerInputRow: number;
  placeholder: string;
}

interface Survey {
  questions: Question[];
}

interface Props {
  index: number;
  survey: Survey;
  onUpdateSurvey: (survey: Survey) => void;
}

const DwDesignQuFbk: React.FC<Props> = ({ index, survey, onUpdateSurvey }) => {
  const [inputText, setInputText] = useState('');
  const question = survey.questions[index];

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  return (
    <div style={{ padding: '10px 0' }} className="dw-qu-item">
      {question.answerInputRow > 1 ? (
        <Input.TextArea
          value={inputText}
          placeholder={question.placeholder}
          autoSize={{ minRows: question.answerInputRow }}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      ) : (
        <Input
          value={inputText}
          placeholder={question.placeholder}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default DwDesignQuFbk; 