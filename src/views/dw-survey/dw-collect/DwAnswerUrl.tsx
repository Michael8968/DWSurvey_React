import React from 'react';
import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper';
import DwAnswerUrlMain from './DwAnswerUrlMain';

const DwAnswerUrl: React.FC = () => {
  return (
    <div>
      <DwSurveyDcsWrapper isAnswerUrl={true}>
        {({ survey }) => survey && <DwAnswerUrlMain survey={survey} />}
      </DwSurveyDcsWrapper>
    </div>
  );
};

export default DwAnswerUrl; 