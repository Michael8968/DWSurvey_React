import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DwTextEditLabelCommon from '../DwTextEditLabelCommon';
import DwDesignQuestion from '../../dw-design-survey-question/DwDesignQuestion';
import DwAddNewQuDialog from '../../dw-design-survey-layouts/dw-tb-layout/dw-design-toolbar/components/DwAddNewQuDialog';
import { dwResetQuestionRefreshValue } from '../../../../dw-utils/dw-survey-update-question';

interface Survey {
  surveyAttrs?: {
    scoreAttr?: {
      enabled: boolean;
      maxScore: number;
    };
  };
  surveyNameObj: any;
  surveyDetail: {
    surveyNodeObj: any;
  };
  questions: any[];
  clientBrowser?: {
    windowWidth: number;
    matrixWidth: number;
  };
  [key: string]: any;
}

interface Props {
  survey: Survey;
  onStartDragContainer?: () => void;
  onEndDrag?: () => void;
}

const DwDesignContainerBodyCenter: React.FC<Props> = ({ survey, onStartDragContainer, onEndDrag }) => {
  const addNewQuDialogRef = useRef<any>(null);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (survey.clientBrowser) {
      survey.clientBrowser.windowWidth = windowWidth;
      survey.clientBrowser.matrixWidth = windowWidth * 0.66 - 130;
    }
  };

  const onDragStart = () => {
    onStartDragContainer?.();
  };

  const onDragEnd = (result: any) => {
    onEndDrag?.();
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

  const addNewQu = () => {
    addNewQuDialogRef.current?.openDialog();
  };

  return (
    <div className="dw-container-body-center">
      <div style={{ minHeight: '600px' }}>
        {survey.surveyAttrs?.scoreAttr?.enabled && (
          <div style={{ fontSize: '12px', color: '#014ab6', padding: '20px 20px 0 20px' }}>
            本卷最大总分：<strong>{survey.surveyAttrs.scoreAttr.maxScore}</strong> 分
          </div>
        )}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <DwTextEditLabelCommon value={survey.surveyNameObj} survey={survey as any} index={0} onUpdateInput={() => {}} />
        </div>
        <div style={{ padding: '0 40px' }}>
          <DwTextEditLabelCommon value={survey.surveyDetail.surveyNodeObj} survey={survey as any} index={0} onUpdateInput={() => {}} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <div>
            <div style={{ textAlign: 'center', fontSize: '13px', color: 'grey', lineHeight: '30px' }}>
              拖动上方工具栏题目控件到下方区域，可以增加新题目
            </div>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
              <Droppable droppableId="questions">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="dwDraggable">
                    {survey.questions.map((item, index) => (
                      <Draggable
                        key={item.dwId ? `quDwId_${item.dwId}` : `Qu_${index}`}
                        draggableId={item.dwId ? `quDwId_${item.dwId}` : `Qu_${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <DwDesignQuestion survey={survey} index={index} item={item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '40px' }}>
              <Button type="primary" size="small" onClick={addNewQu}>
                <PlusOutlined /> 增加新题
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DwAddNewQuDialog ref={(ref: any) => (addNewQuDialogRef.current = ref)} survey={survey as any} />
    </div>
  );
};

export default DwDesignContainerBodyCenter; 