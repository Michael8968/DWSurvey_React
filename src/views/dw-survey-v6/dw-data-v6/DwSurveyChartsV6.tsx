import React from 'react';
import DwSurveyAnswerCharts from '@/components/dw-survey-comp/dw-data-comp/dw-answer-charts-comp/DwSurveyAnswerCharts';
import DwSurveyDcsWrapperV6 from '@/components/common/DwSurveyDcsWrapperV6';

const DwSurveyChartsV6: React.FC = () => {
  return (
    <div>
      <DwSurveyDcsWrapperV6 isSurveyChart={true}>
        {() => <DwSurveyAnswerCharts />}
      </DwSurveyDcsWrapperV6>
    </div>
  );
};

export default DwSurveyChartsV6; 