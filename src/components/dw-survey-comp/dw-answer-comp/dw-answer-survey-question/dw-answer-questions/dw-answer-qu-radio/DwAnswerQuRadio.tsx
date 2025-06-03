import React from 'react';
import { Form } from 'antd';
import DwQuRadioOptions from './components/DwQuRadioOptions';

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

interface DwAnswerQuRadioProps {
  index?: number;
  survey: Survey;
  answer?: Answer;
  onUpdateOptions?: (options: any[]) => void;
}

const DwAnswerQuRadio: React.FC<DwAnswerQuRadioProps> = ({
  index = 0,
  survey,
  answer,
  onUpdateOptions
}) => {

  return (
    <Form>
      <DwQuRadioOptions
        index={index}
        survey={survey as any}
        answer={answer as any}
        onUpdateOptions={onUpdateOptions}
      />
    </Form>
  );
};

export default DwAnswerQuRadio;