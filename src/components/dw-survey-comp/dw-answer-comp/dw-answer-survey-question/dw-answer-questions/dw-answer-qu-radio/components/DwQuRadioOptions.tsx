import React from 'react';
import { Form } from 'antd';
import DwQuOptionCommon1 from '../../../dw-answer-options/dw-qu-option-common1/DwQuOptionCommon1.tsx';
import DwQuOptionCommon2 from '../../../dw-answer-options/dw-qu-option-common2/DwQuOptionCommon2.tsx';
import DwQuOptionCommon4 from '../../../dw-answer-options/dw-qu-option-common4/DwQuOptionCommon4.tsx';

interface QuRadio {
  optionTitleObj: {
    dwHtml: string;
  };
  [key: string]: any;
}

interface Question {
  hv: number;
  quType: string;
  quRadios: QuRadio[];
  [key: string]: any;
}

interface Survey {
  questions: Question[];
  [key: string]: any;
}

interface DwQuRadioOptionsProps {
  index?: number;
  survey: Survey;
  answer?: any;
  onUpdateOptions?: (options: any[]) => void;
}

const DwQuRadioOptions: React.FC<DwQuRadioOptionsProps> = ({
  index = 0,
  survey,
  answer,
  onUpdateOptions
}) => {
  const currentQuestion = survey.questions[index];

  return (
    <Form>
      <div>
        {/* Horizontal display */}
        {currentQuestion.hv === 1 && (
          <DwQuOptionCommon1
            index={index}
            options={currentQuestion.quRadios}
            survey={survey as any}
            quType={currentQuestion.quType}
            answer={answer as any}
            onUpdateOptions={onUpdateOptions}
          />
        )}

        {/* Vertical display */}
        {currentQuestion.hv === 2 && (
          <DwQuOptionCommon2
           index={index}
            options={currentQuestion.quRadios}
            survey={survey as any}
            quType={currentQuestion.quType}
            answer={answer as any}
            onUpdateOptions={onUpdateOptions}
          />
        )}

        {/* Select display */}
        {currentQuestion.hv === 4 && (
          <DwQuOptionCommon4
            index={index}
            options={currentQuestion.quRadios as any[]}
            survey={survey as any}
            quType={currentQuestion.quType}
          />
        )}

        {/* Debug view (commented out) */}
        {/* <div style={{ background: '#0AA5A0' }}>
          {currentQuestion.quRadios.map((item, optionIndex) => (
            <div key={`aaquOption-${optionIndex}`}>
              <div style={{ border: '1px solid red' }}>{item.optionTitleObj.dwHtml}</div>
            </div>
          ))}
        </div> */}
      </div>
    </Form>
  );
};

export default DwQuRadioOptions;