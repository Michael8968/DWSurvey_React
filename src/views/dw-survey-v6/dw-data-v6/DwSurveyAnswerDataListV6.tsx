import React, { useEffect, useState } from 'react';
import DwSurveyAnswerDataList from '@/components/dw-survey-comp/dw-data-comp/dw-answer-data-comp/DwSurveyAnswerDataList';
import DwSurveyDcsWrapperV6 from '@/components/common/DwSurveyDcsWrapperV6';
import { getDesignSurveyJsonBySurveyId } from '@/components/dw-survey-comp/dw-utils/dw-survey-common';
import { useParams } from 'react-router-dom';

const DwSurveyAnswerDataListV6: React.FC = () => {
  const { dwSurveyId } = useParams<{ dwSurveyId: string }>();
  const [thSurvey, setThSurvey] = useState<any>(null);

  useEffect(() => {
    getSurveyInfoV6();
    // eslint-disable-next-line
  }, [dwSurveyId]);

  const getSurveyInfoV6 = () => {
    const params = { surveyId: dwSurveyId };
    getDesignSurveyJsonBySurveyId(params, (survey: any) => {
      setThSurvey(survey);
    });
  };

  return (
    <DwSurveyDcsWrapperV6 isAnswerData={true} id={'dw-survey-answer-data-list-v6'}>
      {() => (
        <div>
          {thSurvey && <DwSurveyAnswerDataList survey={thSurvey} />}
        </div>
      )}
    </DwSurveyDcsWrapperV6>
  );
};

export default DwSurveyAnswerDataListV6; 