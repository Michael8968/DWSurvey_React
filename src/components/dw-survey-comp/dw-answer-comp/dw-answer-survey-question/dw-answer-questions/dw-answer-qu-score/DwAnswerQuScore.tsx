import React from 'react';
import { Form } from 'antd';
import DwQuScoreOptions from './components/DwQuScoreOptions.tsx';

interface Question {
  // Define your question structure here
  [key: string]: any;
}

interface Survey {
  questions: Question[];
  // Add other survey properties as needed
}

interface Answer {
  // Define answer properties as needed
}

interface DwAnswerQuScoreProps {
  index?: number;
  survey: Survey;
  answer?: Answer;
  onUpdateOptions?: (options: any[]) => void;
}

const DwAnswerQuScore: React.FC<DwAnswerQuScoreProps> = ({
  index = 0,
  survey,
  answer,
  onUpdateOptions
}) => {

  return (
    <Form>
      <DwQuScoreOptions
        index={index}
        survey={survey as any}
        answer={answer as any}
        onUpdateOptions={onUpdateOptions}
      />
    </Form>
  );
};

export default DwAnswerQuScore;