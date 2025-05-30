import React, { useEffect, useState } from 'react';
import { Row, Col, Descriptions, PageHeader } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, DesktopOutlined, TagOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { dwSurveyAnswerInfo } from '@/api/survey';
import DwSurveyAnswerQuCommon from './DwSurveyAnswerQuCommon';

interface Question {
  id: string;
  quType: string;
  quTypeName: string;
  quCheckboxs?: any[];
  quRadios?: any[];
  quScores?: any[];
  quOrderbys?: any[];
  quMultiFillblanks?: any[];
  anCheckboxs?: any[];
  anScores?: any[];
  anOrders?: any[];
  anDFillblanks?: any[];
}

interface SurveyAnswer {
  id: string;
  ipAddr: string;
  endAnDate: string;
  completeItemNum: number;
}

interface Survey {
  surveyAnswer: SurveyAnswer;
  questions: Question[];
}

const DwSurveyAnswerInfo: React.FC = () => {
  const navigate = useNavigate();
  const { answerId } = useParams<{ answerId: string }>();
  const [survey, setSurvey] = useState<Survey>({
    surveyAnswer: {
      id: '',
      ipAddr: '',
      endAnDate: '',
      completeItemNum: 0
    },
    questions: []
  });

  useEffect(() => {
    querySurveyAnswer();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const querySurveyAnswer = async () => {
    try {
      const response = await dwSurveyAnswerInfo(answerId);
      const resultData = response.data.data;
      const processedSurvey = { ...resultData };

      for (let i = 0; i < processedSurvey.questions.length; i++) {
        const questionData = processedSurvey.questions[i];
        const quType = questionData.quType;
        let quOptionsObj;

        switch (quType) {
          case 'CHECKBOX':
            questionData.quTypeName = '多选题';
            quOptionsObj = questionData.quCheckboxs;
            break;
          case 'RADIO':
            questionData.quTypeName = '单选题';
            quOptionsObj = questionData.quRadios;
            break;
          case 'FILLBLANK':
            questionData.quTypeName = '填空题';
            break;
          case 'SCORE':
            questionData.quTypeName = '评分题';
            quOptionsObj = questionData.quScores;
            break;
          case 'ORDERQU':
            questionData.quTypeName = '排序题';
            quOptionsObj = questionData.quOrderbys;
            break;
          case 'MULTIFILLBLANK':
            questionData.quTypeName = '多项填空题';
            quOptionsObj = questionData.quMultiFillblanks;
            break;
          case 'UPLOADFILE':
            questionData.quTypeName = '文件上传题';
            break;
          default:
            questionData.quTypeName = quType;
        }

        if (['CHECKBOX', 'SCORE', 'ORDERQU', 'MULTIFILLBLANK'].includes(quType)) {
          for (let j = 0; j < quOptionsObj.length; j++) {
            const item = quOptionsObj[j];

            switch (quType) {
              case 'CHECKBOX':
                const anCheckboxs = questionData.anCheckboxs;
                for (let k = 0; k < anCheckboxs.length; k++) {
                  if (anCheckboxs[k].quItemId === item.id) {
                    item.answer = true;
                    break;
                  }
                }
                break;
              case 'SCORE':
                const anScores = questionData.anScores;
                for (let k = 0; k < anScores.length; k++) {
                  if (anScores[k].quRowId === item.id) {
                    if (anScores[k].answserScore != null) {
                      item.answer = parseInt(anScores[k].answserScore);
                      break;
                    }
                  }
                }
                break;
              case 'ORDERQU':
                const anOrders = questionData.anOrders;
                for (let k = 0; k < anOrders.length; k++) {
                  if (anOrders[k].quRowId === item.id) {
                    item.answer = anOrders[k].orderyNum;
                    break;
                  }
                }
                break;
              case 'MULTIFILLBLANK':
                const anDFillblanks = questionData.anDFillblanks;
                for (let k = 0; k < anDFillblanks.length; k++) {
                  if (anDFillblanks[k].quItemId === item.id) {
                    item.answer = anDFillblanks[k].answer;
                    break;
                  }
                }
                break;
            }
          }
        }
      }

      setSurvey(processedSurvey);
    } catch (error) {
      console.error('Failed to fetch survey answer info:', error);
    }
  };

  return (
    <div>
      <PageHeader
        title="答卷详情"
        onBack={goBack}
        className="dw-page-header"
      />
      <div className="dw-answer-content">
        <Row justify="center">
          <Col span={16}>
            <div style={{ background: 'white' }}>
              <Descriptions bordered column={3}>
                <Descriptions.Item
                  label={
                    <span>
                      <EnvironmentOutlined /> 答卷IP
                    </span>
                  }
                >
                  {survey.surveyAnswer.ipAddr}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span>
                      <ClockCircleOutlined /> 答卷时间
                    </span>
                  }
                >
                  {survey.surveyAnswer.endAnDate}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span>
                      <DesktopOutlined /> 答题数
                    </span>
                  }
                >
                  {survey.surveyAnswer.completeItemNum}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span>
                      <TagOutlined /> 答卷ID
                    </span>
                  }
                >
                  {survey.surveyAnswer.id}
                </Descriptions.Item>
              </Descriptions>
              <div className="dw-answer-title" style={{ paddingTop: '30px', paddingBottom: '0px' }}>
                答卷结果信息
              </div>
              <div style={{ padding: '0px 20px 30px 20px' }}>
                {survey.questions.map((item, index) => (
                  <DwSurveyAnswerQuCommon
                    key={item.id}
                    id={item.id}
                    index={index}
                    question={item}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DwSurveyAnswerInfo; 