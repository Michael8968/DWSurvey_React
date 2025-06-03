import React from 'react';
import { Form } from 'antd';
import DwQuOrderOptions from './components/DwQuOrderOptions';

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

interface DwAnswerQuOrderProps {
  index?: number;
  survey: Survey;
  answer?: Answer;
  onUpdateOptions?: (options: any[]) => void;
}

const DwAnswerQuOrder: React.FC<DwAnswerQuOrderProps> = ({
  index = 0,
  survey,
  answer,
  onUpdateOptions
}) => {

  return (
    <Form>
      <DwQuOrderOptions
        index={index}
        survey={survey as any}
        onUpdateOptions={onUpdateOptions}
      />
    </Form>
  );
};

export default DwAnswerQuOrder;