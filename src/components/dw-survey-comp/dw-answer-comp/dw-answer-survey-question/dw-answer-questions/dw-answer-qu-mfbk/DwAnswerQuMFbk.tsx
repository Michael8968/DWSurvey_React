import React from 'react';
import { Form } from 'antd';
import DwQuMFbkOptions from './components/DwQuMFbkOptions.tsx';

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

interface DwAnswerQuMFbkProps {
  index?: number;
  survey: Survey;
  answer?: Answer;
  onUpdateOptions?: (options: any[]) => void;
}

const DwAnswerQuMFbk: React.FC<DwAnswerQuMFbkProps> = ({
  index = 0,
  survey,
  answer,
  onUpdateOptions
}) => {

  return (
    <Form>
      <DwQuMFbkOptions
        index={index}
        survey={survey as any}
        answer={answer}
        onUpdateOptions={onUpdateOptions}
      />
    </Form>
  );
};

export default DwAnswerQuMFbk;