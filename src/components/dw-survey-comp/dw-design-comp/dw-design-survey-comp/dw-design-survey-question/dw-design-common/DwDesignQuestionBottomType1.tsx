import React from 'react';
import { Tooltip } from 'antd';

interface Survey {
  questions: Array<{
    quTitle: string;
  }>;
  surveyNode: string;
}

interface Props {
  index: number;
  survey: Survey;
  onUpdateQuestion: (survey: Survey) => void;
}

const DwDesignQuestionBottomType1: React.FC<Props> = ({ index, survey, onUpdateQuestion }) => {
  const dwAddQuItem = () => {
    const newSurvey = {
      ...survey,
      questions: survey.questions.map((q, i) => 
        i === index ? { ...q, quTitle: 'wooooooo' } : q
      ),
      surveyNode: '更新问卷副标题备注'
    };
    onUpdateQuestion(newSurvey);
  };

  return (
    <div className="dw-display-flex-left">
      <Tooltip title="添加选项" placement="left">
        <div className="dw-question-toolbar dw-margin-right-10" onClick={dwAddQuItem}>
          <i className="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-plus" aria-hidden="true"></i>
        </div>
      </Tooltip>
      <Tooltip title="批量添加选项" placement="right">
        <div className="dw-question-toolbar dw-margin-right-10">
          <i className="dwMoveSortQu dw-cursor-pointer dw-event-color fa fa-list-ul" aria-hidden="true"></i>
        </div>
      </Tooltip>
    </div>
  );
};

export default DwDesignQuestionBottomType1; 