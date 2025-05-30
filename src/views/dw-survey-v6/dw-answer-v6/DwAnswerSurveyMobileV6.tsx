import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col } from 'antd';

const DwAnswerSurveyMobileV6: React.FC = () => {
  const { sid } = useParams<{ sid: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (sid) {
      navigate(`/v6/diaowen/an/${sid}`);
    }
  }, [sid, navigate]);

  return (
    <div style={{ height: '100vh' }}>
      <Row>
        <Col span={24}>
          <div style={{ fontSize: 18, textAlign: 'center', padding: 30 }}>加载中...</div>
        </Col>
      </Row>
    </div>
  );
};

export default DwAnswerSurveyMobileV6; 