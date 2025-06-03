import React, { useState, useEffect } from 'react';
import { Form, Tag, Card } from 'antd';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DwHtmlLabelCommon from '../../../../dw-answer-survey-common/DwHtmlLabelCommon.tsx';
import { showReadNotify } from '../../../../../dw-utils/dw-common/dw-msg-common';
import { answerQuEventCommon } from '../../../../dw-utils/dw-survey-answer-common';
import '../../../../../../../assets/css/dw-answer.css';
import './DwQuOrderOptions.css'; // Import the converted CSS

interface QuOrderby {
  dwId?: string;
  checked: boolean;
  orderIndex: number;
  optionTitleObj: any;
  [key: string]: any;
}

interface Question {
  quOrderbys: QuOrderby[];
  [key: string]: any;
}

interface Survey {
  questions: Question[];
  surveyStyle: {
    themeColor: string;
  };
  readonly?: boolean;
  tempDataType?: string;
  [key: string]: any;
}

interface DwQuOrderOptionsProps {
  index?: number;
  survey: Survey;
  onUpdateOptions?: (options: any[]) => void;
}

const DwQuOrderOptions: React.FC<DwQuOrderOptionsProps> = ({
  index = 0,
  survey,
  onUpdateOptions
}) => {
  const [dataNum, setDataNum] = useState(0);
  const [drag, setDrag] = useState(false);
  const themeColor = survey.surveyStyle.themeColor;

  useEffect(() => {
    let maxNum = 0;
    survey.questions[index].quOrderbys.forEach((option) => {
      if (maxNum < option.orderIndex) maxNum = option.orderIndex;
    });
    setDataNum(maxNum);
  }, [index, survey]);

  const clickItem = (item: QuOrderby) => {
    if (!survey.questions[index].hasOwnProperty('anQuestion')) setDataNum(0);
    if (survey.readonly) return showReadNotify(survey);

    const updatedSurvey = { ...survey };
    const quOrderbys = [...updatedSurvey.questions[index].quOrderbys];
    const itemIndex = quOrderbys.findIndex(opt => opt.dwId === item.dwId);
    
    if (itemIndex === -1) return;

    quOrderbys[itemIndex].checked = !quOrderbys[itemIndex].checked;
    const length = quOrderbys.length;

    if (quOrderbys[itemIndex].orderIndex > 0) {
      const itemOrderIndex = quOrderbys[itemIndex].orderIndex;
      quOrderbys.forEach((option) => {
        if (itemOrderIndex < option.orderIndex) {
          option.orderIndex -= 1;
        }
      });
      quOrderbys[itemIndex].orderIndex = 0;
      const newNum = dataNum - 1;
      if (newNum >= 0) setDataNum(newNum);
    } else {
      const newNum = dataNum + 1;
      if (newNum <= length) {
        quOrderbys[itemIndex].orderIndex = newNum;
        setDataNum(newNum);
      }
    }

    quOrderbys.sort((a, b) => {
      const x = a.orderIndex === 0 ? length + 1 : a.orderIndex;
      const y = b.orderIndex === 0 ? length + 1 : b.orderIndex;
      return x < y ? -1 : x > y ? 1 : 0;
    });

    updatedSurvey.questions[index].quOrderbys = quOrderbys;
    if (onUpdateOptions) onUpdateOptions(updatedSurvey.questions[index].quOrderbys);
    answerQuEventCommon(updatedSurvey, index);
  };

  return (
    <Form>
      <div className="dw-qu-order-group">
        <TransitionGroup component={null}>
          {survey.questions[index].quOrderbys.map((item, optionIndex) => {
            const key = survey.tempDataType === 'modelComponents' 
              ? `orderBy-${optionIndex}` 
              : item.dwId || optionIndex;

            return (
              <CSSTransition
                key={key}
                timeout={500}
                classNames="flip-list"
              >
                <Card
                  className="dw-qu-order-group-item dwMoveSortQuOption"
                  style={{ marginBottom: 5, borderRadius: 2 }}
                  hoverable
                  onClick={() => clickItem(item)}
                >
                  <div className="dw-qu-item">
                    <div className="dw-qu-item-body">
                      <div className={`dw-qu-item-body-order-option ${item.checked ? 'dw-item-checked' : ''}`}>
                        {item.orderIndex > 0 ? (
                          <Tag
                            className="dw-qu-order-num dw-num-order animate__animated animate__tada"
                            style={{ 
                              background: themeColor, 
                              borderColor: themeColor,
                              marginRight: 5
                            }}
                          >
                            {item.orderIndex}
                          </Tag>
                        ) : (
                          <Tag className="dw-qu-order-num dw-num-empty">
                            {item.orderIndex}
                          </Tag>
                        )}
                        <div className="dw-qu-item-option-title">
                          <DwHtmlLabelCommon value={item.optionTitleObj} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    </Form>
  );
};

export default DwQuOrderOptions;