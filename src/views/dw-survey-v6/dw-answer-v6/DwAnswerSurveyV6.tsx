import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import DwAnswerSurvey from '@/components/dw-survey-comp/dw-answer-comp/DwAnswerSurvey';

const DwAnswerSurveyV6: React.FC = () => {
  const { sid, answerId } = useParams<{ sid?: string; answerId?: string }>();
  const [answerProps, setAnswerProps] = useState({ sid: null, answerId: null, anPwd: '' });

  useEffect(() => {
    setAnswerProps({
      sid: sid || null,
      answerId: answerId || null,
      anPwd: ''
    });
  }, [sid, answerId]);

  return (
    <div>
      <Row>
        <Col span={24}>
          <DwAnswerSurvey answerProps={answerProps} />
        </Col>
      </Row>
    </div>
  );
};

export default DwAnswerSurveyV6; 