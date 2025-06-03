import React from 'react';
import DwDesignQuestionModelCommon from '../../../../dw-design-survey-layouts/dw-tb-layout/dw-design-toolbar/components/DwDesignQuestionModelCommon';

interface Question {
  dwQuIcon?: string;
  quName: string;
  quTypeName: string;
  [key: string]: any;
}

interface Props {
  item: Question;
}

const DwDesignQuBankQuestion: React.FC<Props> = ({ item }) => {
  return (
    <div>
      <DwDesignQuestionModelCommon item={item as any}>
        <div className="dw-list-group-item-content qu-bank-question-content">
          {item.hasOwnProperty('dwQuIcon') && item.dwQuIcon !== null && item.dwQuIcon !== undefined ? (
            <div className="dw-list-group-item-in">
              <span dangerouslySetInnerHTML={{ __html: item.dwQuIcon }} />
              {item.quName}
              <span className="dw-list-group-item-in-type" />
            </div>
          ) : (
            <div className="dw-list-group-item-in">
              {item.quName}
              <span className="dw-list-group-item-in-type">[{item.quTypeName}]</span>
            </div>
          )}
        </div>
      </DwDesignQuestionModelCommon>
    </div>
  );
};

export default DwDesignQuBankQuestion; 