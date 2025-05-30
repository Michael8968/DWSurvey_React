import React, { useEffect, useState } from 'react';
import { Descriptions, Row, Col } from 'antd';
import { KeyOutlined, UserOutlined, CalendarOutlined, EnvironmentOutlined, BankOutlined, StarOutlined } from '@ant-design/icons';
import DwAnswerSurvey from '../../dw-answer-comp/DwAnswerSurvey';
import { useParams } from 'react-router-dom';

interface PadPhoneAnBodySpan {
  xs: { span: number; offset: number };
  sm: { span: number; offset: number };
  md: { span: number; offset: number };
  lg: { span: number; offset: number };
  xl: { span: number; offset: number };
}

interface AnswerCommon {
  sid: string;
  surveyId: string;
  answerId: string;
  anUser: {
    userName: string;
  };
  anTime: {
    endAnDate: string;
  };
  anIp: {
    ip: string;
    addr: string;
  };
  sumScore: number;
}

interface DwEsSurveyAnswer {
  answerCommon: AnswerCommon;
  esId: string;
  anPwd: string;
}

interface Props {
  dwEsSurveyAnswer?: DwEsSurveyAnswer | null;
  padPhoneAnBodySpan?: PadPhoneAnBodySpan;
}

const DwSurveyAnswerReview: React.FC<Props> = ({ dwEsSurveyAnswer, padPhoneAnBodySpan }) => {
  const params = useParams();
  const [answerProps, setAnswerProps] = useState({
    surveyId: null as string | null,
    sid: null as string | null,
    answerId: null as string | null,
    anPwd: ''
  });

  useEffect(() => {
    if (params.sid && params.answerId) {
      setAnswerProps({
        sid: params.sid,
        answerId: params.answerId,
        surveyId: null,
        anPwd: ''
      });
    } else if (dwEsSurveyAnswer) {
      setAnswerProps({
        surveyId: dwEsSurveyAnswer.answerCommon.surveyId,
        sid: dwEsSurveyAnswer.answerCommon.sid,
        answerId: dwEsSurveyAnswer.answerCommon.answerId,
        anPwd: dwEsSurveyAnswer.anPwd
      });
    }
  }, [dwEsSurveyAnswer, params]);

  return (
    <div className="answerReviewRoot">
      <Row>
        <Col>
          <div style={{ backgroundColor: '#dfdfe0' }}>
            {dwEsSurveyAnswer && (
              <div style={{ padding: 10 }}>
                <Descriptions
                  title="答卷基本信息"
                  bordered
                  column={2}
                  extra={null}
                >
                  <Descriptions.Item label={<><KeyOutlined />&nbsp;&nbsp;ID</>}>
                    {dwEsSurveyAnswer.answerCommon.sid}/{dwEsSurveyAnswer.esId}
                  </Descriptions.Item>
                  <Descriptions.Item label={<><UserOutlined />&nbsp;&nbsp;用户</>}>
                    {dwEsSurveyAnswer.answerCommon.anUser.userName}
                  </Descriptions.Item>
                  <Descriptions.Item label={<><CalendarOutlined />&nbsp;&nbsp;时间</>}>
                    {dwEsSurveyAnswer.answerCommon.anTime.endAnDate}
                  </Descriptions.Item>
                  <Descriptions.Item label={<><EnvironmentOutlined />&nbsp;&nbsp;IP</>}>
                    {dwEsSurveyAnswer.answerCommon.anIp.ip}
                  </Descriptions.Item>
                  <Descriptions.Item label={<><BankOutlined />&nbsp;&nbsp;IP地址</>}>
                    {dwEsSurveyAnswer.answerCommon.anIp.addr}
                  </Descriptions.Item>
                  <Descriptions.Item label={<><StarOutlined />&nbsp;&nbsp;总分</>}>
                    {dwEsSurveyAnswer.answerCommon.sumScore}
                  </Descriptions.Item>
                  <Descriptions.Item label={<><UserOutlined />&nbsp;&nbsp;密码</>}>
                    {dwEsSurveyAnswer.anPwd}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            )}
            <div style={{ marginTop: 0 }}>
              <DwAnswerSurvey
                answerProps={answerProps}
                extProps={{
                  anBodySpan: padPhoneAnBodySpan,
                  anBodyStyle: { minHeight: '630px', height: 'auto' },
                  isPreview: true,
                  readonly: true,
                  isShowScore: true
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DwSurveyAnswerReview; 