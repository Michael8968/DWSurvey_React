import React from 'react';
import { Form } from 'antd';
import DwQuOptionCommon2 from '../../../dw-answer-options/dw-qu-option-common2/DwQuOptionCommon2.tsx';

interface QuMultiFillblank {
  // Define the structure of your quMultiFillblank objects
  [key: string]: any;
}

interface Question {
  quType: string;
  quMultiFillblanks: QuMultiFillblank[];
  // Add other question properties as needed
}

interface Survey {
  questions: Question[];
  // Add other survey properties as needed
}

interface Answer {
  // Define answer properties as needed
}

interface DwQuMFbkOptionsProps {
  index?: number;
  survey: Survey;
  answer?: Answer;
  onUpdateOptions?: (options: any[]) => void;
}

const DwQuMFbkOptions: React.FC<DwQuMFbkOptionsProps> = ({
  index = 0,
  survey,
  answer,
  onUpdateOptions
}) => {

  return (
    <Form>
      <div>
        <DwQuOptionCommon2
          index={index}
          options={survey.questions[index].quMultiFillblanks}
          survey={survey}
          quType={survey.questions[index].quType}
          answer={answer}
          onUpdateOptions={onUpdateOptions}
        />
      </div>
    </Form>
  );
};

export default DwQuMFbkOptions;