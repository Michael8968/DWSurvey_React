import React, { useState, useEffect } from 'react';
import { Collapse, Alert } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { bankQuestions } from '../../../../api/dw-design-question-comps';
import { parseQuestions } from '../../../../../../dw-utils/dw-survey-parse';
import DwDesignQuBankQuestion from './DwDesignQuBankQuestion';

const { Panel } = Collapse;

interface Question {
  [key: string]: any;
}

interface TabQu {
  tabQuName: string;
  questions: Question[];
}

interface Survey {
  [key: string]: any;
}

interface Props {
  survey: Survey;
  onStartDragRight?: () => void;
  onEndDrag?: () => void;
}

const DwDesignQuBanks: React.FC<Props> = ({ survey, onStartDragRight, onEndDrag }) => {
  const [activeKey, setActiveKey] = useState<string[]>(['0']);
  const [quBanks, setQuBanks] = useState<TabQu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuBanks();
  }, []);

  const loadQuBanks = async () => {
    try {
      const response = await bankQuestions();
      const httpResult = response.data;
      if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
        const tabs = httpResult.data;
        tabs.forEach((item: TabQu) => {
          item.questions = parseQuestions(item.questions, false);
        });
        setQuBanks(tabs);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to load question banks:', error);
      setLoading(false);
    }
  };

  const onDragStart = () => {
    onStartDragRight?.();
  };

  const onDragEnd = () => {
    onEndDrag?.();
  };

  return (
    <div>
      <Collapse activeKey={activeKey} onChange={(keys) => setActiveKey(keys as string[])}>
        {quBanks.map((item: TabQu, index: number) => (
          <Panel header={item.tabQuName} key={index.toString()}>
            <div style={{ paddingBottom: '5px' }}>
              <Alert message="点击或拖动可加入到问卷中" type="info" showIcon />
            </div>
            <div className="quBanks">
              <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Droppable droppableId={`quBank-${index}`} isDropDisabled={true}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="toolbars-draggable">
                      <div className="dw-list-group dw-grid">
                        {item.questions.map((question, questionIndex) => (
                          <Draggable
                            key={`quBankQu_${questionIndex}`}
                            draggableId={`quBankQu_${questionIndex}`}
                            index={questionIndex}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="dw-list-group-item"
                              >
                                <DwDesignQuBankQuestion item={question as any} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default DwDesignQuBanks; 