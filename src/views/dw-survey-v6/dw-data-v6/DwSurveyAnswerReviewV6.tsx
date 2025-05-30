import React from 'react';
import DwSurveyAnswerReview from '@/components/dw-survey-comp/dw-data-comp/dw-answer-data-comp/DwSurveyAnswerReview';

const padPhoneAnBodySpan = {
  xs: { span: 24, offset: 0 },
  sm: { span: 24, offset: 0 },
  md: { span: 20, offset: 2 },
  lg: { span: 16, offset: 4 },
  xl: { span: 12, offset: 6 }
};

const DwSurveyAnswerReviewV6: React.FC = () => {
  return <DwSurveyAnswerReview padPhoneAnBodySpan={padPhoneAnBodySpan} />;
};

export default DwSurveyAnswerReviewV6; 