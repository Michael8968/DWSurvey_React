import React, { ReactNode } from 'react';

interface Survey {
  answerUrl: string;
  answerUrlQR: string;
}

interface Props {
  isAnswerWx?: boolean;
  children: (props: { survey: Survey }) => ReactNode;
}

const DwSurveyDcsWrapper: React.FC<Props> = ({ isAnswerWx, children }) => {
  // 这里应该从 props 或 context 中获取 survey 数据
  const survey: Survey = {
    answerUrl: 'http://ent.surveyform.cn/#/diaowen/wdhl2uv6e9x',
    answerUrlQR: 'https://ent.surveyform.cn/api/dwsurvey/anon/response/answerTD.do?surveyId=465d3020-0880-4c37-ab09-cc40869758de'
  };

  return (
    <div>
      {children({ survey })}
    </div>
  );
};

export default DwSurveyDcsWrapper; 