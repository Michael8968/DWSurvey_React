import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import DwAnswerSurveyMain from './DwAnswerSurveyMain.tsx';
import '../../../assets/css/dw-answer.css';

interface AnswerProps {
  sid?: string | null;
  surveyId?: string | null;
  answerId?: string | null;
  anPwd?: string | null;
  [key: string]: any;
}

interface ExtProps {
  [key: string]: any;
}

interface DwAnswerSurveyProps {
  extProps?: ExtProps;
  answerProps?: AnswerProps;
}

const DwAnswerSurvey: React.FC<DwAnswerSurveyProps> = ({
  extProps = {},
  answerProps = { sid: null, answerId: null, anPwd: null }
}) => {
  useEffect(() => {
    // Set CSS variables or perform other mount operations
    document.documentElement.style.setProperty('--custom-color', 'blue');
    
    if (!answerProps?.sid) {
      // Handle route params if needed
      // const sid = useParams().id;
      // const answerId = useParams().answerId;
    }
  }, [answerProps]);

  return (
    <div className="dw-answer-custom-theme">
      <Row>
        {(answerProps.sid || answerProps.surveyId) && (
          <Col span={24}>
            <DwAnswerSurveyMain 
              answerProps={answerProps} 
              extProps={extProps} 
            />
          </Col>
        )}
      </Row>

      {/* <style jsx global>{`
        :root {
          --custom-color: blue;
        }
        .custom-element p {
          color: var(--custom-color);
        }
      `}</style> */}
    </div>
  );
};

export default DwAnswerSurvey;