import React from 'react';
import { surveyPageUtils } from '../../../../../dw-utils/dw-survey-common';

interface Survey {
  [key: string]: any;
}

interface Props {
  index: number;
  survey: Survey;
  onChange?: (survey: Survey) => void;
}

const DwDesignQuPage: React.FC<Props> = ({
  index,
  survey
}) => {
  const pageSize = surveyPageUtils.pageSize(survey);
  const pageNum = surveyPageUtils.quInPageNum(survey, index);

  return (
    <div style={{ padding: 10, borderTop: '5px solid #efefef' }}>
      <div style={{ textAlign: 'right', color: 'grey', fontSize: 13 }}>
        下一页({pageNum}/{pageSize})
      </div>
    </div>
  );
};

export default DwDesignQuPage; 