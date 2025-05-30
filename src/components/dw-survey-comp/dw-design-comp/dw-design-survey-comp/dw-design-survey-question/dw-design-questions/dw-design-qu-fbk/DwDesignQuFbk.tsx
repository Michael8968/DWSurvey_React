import React, { useState } from 'react';
import { Input } from 'element-react';
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
        <Input
          type="textarea"
          value={inputText}
          placeholder={question.placeholder}
          autosize={{ minRows: question.answerInputRow }}
          onChange={handleInputChange}
        />
      ) : (
        <Input
          value={inputText}
          placeholder={question.placeholder}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default DwDesignQuFbk; 