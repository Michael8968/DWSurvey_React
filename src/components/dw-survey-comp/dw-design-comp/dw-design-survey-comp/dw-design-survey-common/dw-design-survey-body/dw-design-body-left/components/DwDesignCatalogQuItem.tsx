import React, { useMemo } from 'react';

interface Question {
  quType: string;
  quTitleObj: {
    dwText: string;
  };
}

interface Survey {
  questions: Question[];
}

interface Props {
  index: number;
  survey: Survey;
}

const DwDesignCatalogQuItem: React.FC<Props> = ({ index, survey }) => {
  const quNum = useMemo(() => {
    const questions = survey.questions;
    let num = 0;
    questions.forEach((item, idx) => {
      if (item.quType !== 'PAGETAG' && item.quType !== 'PARAGRAPH' && idx <= index) {
        num++;
      }
    });
    return num;
  }, [survey.questions, index]);

  const pageSize = useMemo(() => {
    const questions = survey.questions;
    let size = 1;
    questions.forEach((item) => {
      if (item.quType === 'PAGETAG') {
        size++;
      }
    });
    return size;
  }, [survey.questions]);

  const pageNum = useMemo(() => {
    const questions = survey.questions;
    let num = 0;
    questions.forEach((item, idx) => {
      if (item.quType === 'PAGETAG' && idx <= index) {
        num++;
      }
    });
    return num;
  }, [survey.questions, index]);

  const currentQuestion = survey.questions[index];

  if (currentQuestion.quType === 'PAGETAG') {
    return (
      <div className="qu-catalogue-item qu-catalogue-page">
        分页：下一页({pageNum}/{pageSize})
      </div>
    );
  }

  if (currentQuestion.quType === 'PARAGRAPH') {
    return (
      <div className="qu-catalogue-item qu-catalogue-paragraph">
        分段：{currentQuestion.quTitleObj.dwText}
      </div>
    );
  }

  return (
    <div className="qu-catalogue-item qu-catalogue-other">
      Q{quNum}、{currentQuestion.quTitleObj.dwText}
    </div>
  );
};

export default DwDesignCatalogQuItem; 