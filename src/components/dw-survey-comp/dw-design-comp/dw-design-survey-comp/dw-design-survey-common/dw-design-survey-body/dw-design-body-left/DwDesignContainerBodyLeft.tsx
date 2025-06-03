import React from 'react';
import { Tabs, Alert } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DwDesignCatalogQuItem from './components/DwDesignCatalogQuItem';
import DwDesignToolbarLeft from './components/DwDesignToolbarLeft';
import DwDesignQuBanks from '../dw-design-body-right/components/DwDesignQuBanks';
import { dwResetQuestionRefreshValue } from '../../../../../dw-utils/dw-survey-update-question';

const { TabPane } = Tabs;

interface Survey {
  designLayout?: string;
  questions: any[];
  [key: string]: any;
}

interface Props {
  survey: Survey;
  lrContentHeight: number;
}

const DwDesignContainerBodyLeft: React.FC<Props> = ({ survey, lrContentHeight }) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newIndex = result.destination.index;
    const oldIndex = result.source.index;

    if (newIndex > oldIndex) {
      refreshData(oldIndex);
    } else {
      refreshData(newIndex);
    }
  };

  const refreshData = (quIndex: number) => {
    const questions = survey.questions;
    questions.forEach((item, index) => {
      if (index >= quIndex) {
        survey.questions.splice(index, 1, dwResetQuestionRefreshValue(JSON.parse(JSON.stringify(item))));
      }
    });
  };

  return (
    <div>
      <Tabs type="card">
        {survey.designLayout === 'LR' && (
          <TabPane tab="题型" key="questionTypes">
            <div style={{ height: `${lrContentHeight}px`, overflowY: 'scroll' }} className="scrollable-hidden scrollable-y">
              <DwDesignToolbarLeft survey={survey as any} />
            </div>
          </TabPane>
        )}
        <TabPane tab="大纲" key="outline">
          <div style={{ height: `${lrContentHeight}px`, overflowY: 'scroll' }} className="scrollable-hidden scrollable-y">
            <div className="dw_left_ul">
              <div style={{ paddingBottom: '5px' }}>
                <Alert message="拖动目录可修改题目排序" type="info" showIcon />
              </div>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="questions">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {survey.questions.map((item, index) => (
                        <Draggable
                          key={`surveyQu${index}`}
                          draggableId={`surveyQu${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <DwDesignCatalogQuItem survey={survey} index={index} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </TabPane>
        <TabPane tab="题库" key="questionBank">
          <div style={{ height: `${lrContentHeight}px` }} className="scrollable-hidden scrollable-y">
            <DwDesignQuBanks survey={survey} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DwDesignContainerBodyLeft; 