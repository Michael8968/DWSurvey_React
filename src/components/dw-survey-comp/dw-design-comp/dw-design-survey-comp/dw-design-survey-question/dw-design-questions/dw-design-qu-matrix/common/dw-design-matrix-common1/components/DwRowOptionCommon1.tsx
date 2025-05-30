import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Badge, Input } from 'element-react';
import DwRowOptionCommon1Item from './DwRowOptionCommon1Item';
import './DwRowOptionCommon1.scss';

interface Survey {
  questions: Array<{
    quType: string;
    quCols: Array<{
      tempEmptyOption?: boolean;
      scoreNum?: number;
    }>;
    quAttr: {
      scoreAttr: {
        designShowScoreNum: boolean;
      };
    };
  }>;
  surveyAttrs: {
    scoreAttr: {
      enabled: boolean;
    };
  };
}

interface Option {
  dwId: string;
  [key: string]: any;
}

interface Props {
  index: number;
  value: Option[];
  survey: Survey;
  quType: string;
  onChange?: (value: Option[]) => void;
}

const DwRowOptionCommon1: React.FC<Props> = ({
  index,
  value,
  survey,
  quType,
  onChange
}) => {
  const [dragOptions, setDragOptions] = useState<Option[]>(value);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setDragOptions(value);
  }, [value]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (result: any) => {
    setIsDragging(false);
    if (!result.destination) return;

    const items = Array.from(dragOptions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDragOptions(items);
    onChange?.(items);
  };

  const handleRefreshOptions = (focusIndex: number | null) => {
    onChange?.(dragOptions);
  };

  const renderOptionContent = (option: any, colIndex: number) => {
    if (option.tempEmptyOption) return null;

    const showScore = survey.questions[index].quAttr.scoreAttr.designShowScoreNum && 
                     survey.surveyAttrs.scoreAttr.enabled && 
                     option.scoreNum !== undefined;

    return (
      <td 
        key={`matrix-colOption-content-${colIndex}`}
        style={{ paddingRight: '40px' }}
        className="dwMoveSortQuOption"
      >
        {quType === 'MATRIX_RADIO' && (
          <Badge
            hidden={!showScore}
            value={`${option.scoreNum}分`}
            className="dw-el-badge-option-score"
            type="warning"
          >
            <i className="dw-qu-item-el-checkbox-radio-icon far fa-circle"></i>
          </Badge>
        )}
        {quType === 'MATRIX_CHECKBOX' && (
          <Badge
            hidden={!showScore}
            value={`${option.scoreNum}分`}
            className="dw-el-badge-option-score"
            type="warning"
          >
            <i className="dw-qu-item-el-checkbox-radio-icon far fa-square"></i>
          </Badge>
        )}
        {quType === 'MATRIX_INPUT' && (
          <Input />
        )}
      </td>
    );
  };

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Droppable droppableId="qu-option">
        {(provided) => (
          <tbody ref={provided.innerRef} {...provided.droppableProps}>
            {dragOptions.map((rowOption, rowOptionIndex) => (
              <Draggable
                key={`matrix-rowOption-${rowOption.dwId}`}
                draggableId={rowOption.dwId}
                index={rowOptionIndex}
              >
                {(provided, snapshot) => (
                  <tr
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <td style={{
                      textAlign: 'left',
                      minWidth: '200px',
                      position: 'sticky',
                      left: 0,
                      zIndex: 1,
                      paddingLeft: '5px'
                    }}>
                      <div style={{ paddingLeft: '10px' }}>
                        <DwRowOptionCommon1Item
                          value={dragOptions}
                          survey={survey}
                          quIndex={index}
                          optionIndex={rowOptionIndex}
                          quType={quType}
                          onChange={(newValue) => {
                            setDragOptions(newValue);
                            onChange?.(newValue);
                          }}
                          onRefreshOptions={handleRefreshOptions}
                        />
                      </div>
                    </td>
                    {survey.questions[index].quCols.map((option, colIndex) => 
                      renderOptionContent(option, colIndex)
                    )}
                  </tr>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DwRowOptionCommon1; 