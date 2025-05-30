import React, { useEffect, useState } from 'react';
import { Form, Radio, Checkbox, Input, Rate, Row, Col } from 'antd';

interface QuestionOption {
  id: string;
  optionName: string;
  answer?: any;
}

interface Question {
  id: string;
  quType: string;
  quTypeName: string;
  quTitle: string;
  quRadios?: QuestionOption[];
  quCheckboxs?: QuestionOption[];
  quScores?: QuestionOption[];
  quOrderbys?: QuestionOption[];
  quMultiFillblanks?: QuestionOption[];
  anRadio?: {
    quItemId: string;
    otherText: string;
  };
  anFillblank?: {
    answer: string;
  };
  anUplodFiles?: {
    id: string;
    fileName: string;
    filePath: string;
  }[];
}

interface Props {
  question: Question;
  index: number;
}

const DwSurveyAnswerQuCommon: React.FC<Props> = ({ question, index }) => {
  const [dwResourceUrl, setDwResourceUrl] = useState('');

  useEffect(() => {
    setDwResourceUrl(process.env.DW_RESOURCE_URL || '');
  }, []);

  const renderQuestionContent = () => {
    switch (question.quType) {
      case 'RADIO':
        return (
          <div>
            <Radio.Group value={question.anRadio?.quItemId}>
              {question.quRadios?.map((item) => (
                <Radio key={item.id} value={item.id}>
                  {item.optionName}
                </Radio>
              ))}
            </Radio.Group>
            {question.anRadio?.otherText && (
              <div>
                <span>{question.anRadio.otherText}</span>
              </div>
            )}
          </div>
        );

      case 'CHECKBOX':
        return (
          <div>
            {question.quCheckboxs?.map((item) => (
              <Checkbox key={item.id} checked={item.answer}>
                {item.optionName}
              </Checkbox>
            ))}
          </div>
        );

      case 'FILLBLANK':
        return (
          <Row>
            <Col span={12}>
              <Input value={question.anFillblank?.answer} readOnly />
            </Col>
          </Row>
        );

      case 'MULTIFILLBLANK':
        return (
          <>
            {question.quMultiFillblanks?.map((item) => (
              <Form.Item key={item.id} label={<div dangerouslySetInnerHTML={{ __html: item.optionName }} />}>
                <Input value={item.answer} style={{ width: 360 }} readOnly />
              </Form.Item>
            ))}
          </>
        );

      case 'SCORE':
        return (
          <>
            {question.quScores?.map((item) => (
              <Form.Item key={item.id} label={<div dangerouslySetInnerHTML={{ __html: item.optionName }} />}>
                <Rate
                  value={item.answer}
                  disabled
                  allowHalf
                  count={5}
                  tooltips={['很差', '较差', '一般', '较好', '很好']}
                />
              </Form.Item>
            ))}
          </>
        );

      case 'ORDERQU':
        return (
          <>
            {question.quOrderbys?.map((item) => (
              <Form.Item key={item.id} label={<div dangerouslySetInnerHTML={{ __html: item.optionName }} />}>
                <Input value={item.answer} style={{ width: 360 }} readOnly />
              </Form.Item>
            ))}
          </>
        );

      case 'UPLOADFILE':
        return (
          <div>
            {question.anUplodFiles?.map((item) => (
              <div key={item.id}>
                <a href={`${dwResourceUrl}${item.filePath}`} target="_blank" rel="noopener noreferrer">
                  {item.fileName}
                </a>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Form layout="vertical">
      <div className="dw-qu-item">
        <div className="dw-qu-item-title">
          <span>{index + 1}、</span>
          <span dangerouslySetInnerHTML={{ __html: question.quTitle }} />
          <span>【{question.quTypeName}】</span>
        </div>
        <div className="dw-qu-item-body">
          {renderQuestionContent()}
        </div>
      </div>
    </Form>
  );
};

export default DwSurveyAnswerQuCommon; 