import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Main, Progress } from 'element-plus-react';
import DwAnswerSurveyBody from '../../dw-answer-survey-body/DwAnswerSurveyBody';
import DwFooterSm from '../../../../layouts/DwFooterSm';
import { surveyAnswerLocalStorage } from '../../dw-utils/dw-survey-answer-utils';
import './DwAnswerDefaultLayout.css';

interface Survey {
  showSurvey?: boolean;
  surveyStyle?: {
    showProgressbar?: boolean;
    progressColor?: string;
  };
  answerProgress?: {
    percentage: string;
  };
}

interface DwAnswerDefaultLayoutProps {
  survey: Survey;
  extProps?: {
    anBodySpan?: {
      xs?: { span: number; offset: number };
      sm?: { span: number; offset: number };
      md?: { span: number; offset: number };
      lg?: { span: number; offset: number };
      xl?: { span: number; offset: number };
    };
    anBodyStyle?: React.CSSProperties;
    isPreview?: boolean;
  };
}

const DwAnswerDefaultLayout: React.FC<DwAnswerDefaultLayoutProps> = ({ survey, extProps = {} }) => {
  const [anBodySpan, setAnBodySpan] = useState({
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
    md: { span: 20, offset: 2 },
    lg: { span: 16, offset: 4 },
    xl: { span: 12, offset: 6 }
  });
  const [anBodyStyle, setAnBodyStyle] = useState<React.CSSProperties>({});
  const [dwElProgressStyle, setDwElProgressStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    zIndex: 10000
  });

  useEffect(() => {
    if (extProps) {
      if (extProps.anBodySpan) {
        setAnBodySpan(prev => ({
          ...prev,
          ...extProps.anBodySpan
        }));
      }
      if (extProps.anBodyStyle) {
        setAnBodyStyle(extProps.anBodyStyle);
      }
      if (extProps.isPreview) {
        setDwElProgressStyle({});
      }
    }
    // 清理 localstorage
    surveyAnswerLocalStorage.clearAnswerByDate();
  }, [extProps]);

  return (
    <div style={anBodyStyle} className="dw-answer-container">
      <Row>
        <Col xs={anBodySpan.xs} sm={anBodySpan.sm} md={anBodySpan.md} lg={anBodySpan.lg} xl={anBodySpan.xl}>
          <Container>
            {survey?.showSurvey && (
              <Main style={{ padding: '10px' }}>
                <div>
                  <div>
                    <div className="dw-container-body">
                      {survey?.surveyStyle?.showProgressbar && (
                        <div style={dwElProgressStyle} className="dw-survey-answer-progress">
                          <Progress
                            showText={false}
                            strokeWidth={3}
                            percentage={survey?.answerProgress ? parseFloat(survey.answerProgress.percentage) : 0}
                            color={survey.surveyStyle.progressColor}
                            defineBackColor="#dcdfe6"
                          />
                        </div>
                      )}
                      <DwAnswerSurveyBody survey={survey} extProps={extProps} />
                    </div>
                  </div>
                </div>
                <div>
                  <DwFooterSm />
                </div>
              </Main>
            )}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default DwAnswerDefaultLayout;
