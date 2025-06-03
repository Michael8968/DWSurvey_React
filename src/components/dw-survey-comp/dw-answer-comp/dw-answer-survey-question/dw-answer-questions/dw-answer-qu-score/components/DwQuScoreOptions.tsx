import React from 'react';
import { Form } from 'antd';
import DwQuOptionCommon2 from '../../../dw-answer-options/dw-qu-option-common2/DwQuOptionCommon2.tsx';

interface QuScore {
  // Define your score option structure here
  [key: string]: any;
}

interface Question {
  quType: string;
  quScores: QuScore[];
  // Add other question properties as needed
}

interface Survey {
  questions: Question[];
  // Add other survey properties as needed
}

interface DwQuScoreOptionsProps {
  index?: number;
  survey: Survey;
  answer?: any;
  onUpdateOptions?: (options: any[]) => void;
}

const DwQuScoreOptions: React.FC<DwQuScoreOptionsProps> = ({
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
          options={survey.questions[index].quScores}
          survey={survey as any}
          quType={survey.questions[index].quType}
          onUpdateOptions={onUpdateOptions}
          answer={answer}
        />
      </div>
    </Form>
  );
};

export default DwQuScoreOptions;