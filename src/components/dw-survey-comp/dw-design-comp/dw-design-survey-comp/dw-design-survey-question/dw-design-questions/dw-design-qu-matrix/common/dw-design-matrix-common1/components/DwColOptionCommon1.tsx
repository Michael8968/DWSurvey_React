import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DwColOptionCommon1Item from './DwColOptionCommon1Item';
import './DwColOptionCommon1.scss';

interface Survey {
  questions: Array<{
    quType: string;
    [key: string]: any;
  }>;
}

interface Option {
  dwId: string;
  tempEmptyOption?: boolean;
  [key: string]: any;
}

interface Props {
  index: number;
  value: Option[];
  survey: Survey;
  quType: string;
  onChange?: (value: Option[]) => void;
}

const DwColOptionCommon1: React.FC<Props> = ({
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

  return (
    <tbody>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="qu-option" direction="horizontal">
          {(provided) => (
            <tr
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {dragOptions.map((colOption, optionIndex) => (
                <Draggable
                  key={colOption.dwId}
                  draggableId={colOption.dwId}
                  index={optionIndex}
                  isDragDisabled={colOption.tempEmptyOption}
                >
                  {(provided, snapshot) => (
                    <td
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`matrix-title-td ${colOption.tempEmptyOption ? 'undrag dw-position-sticky' : 'sortMatrixTd'}`}
                      scope="col"
                    >
                      {optionIndex > 0 && (
                        <DwColOptionCommon1Item
                          value={dragOptions}
                          survey={survey}
                          quIndex={index}
                          optionIndex={optionIndex}
                          quType={quType}
                          onChange={(newValue) => {
                            setDragOptions(newValue);
                            onChange?.(newValue);
                          }}
                          onRefreshOptions={handleRefreshOptions}
                        />
                      )}
                    </td>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tr>
          )}
        </Droppable>
      </DragDropContext>
    </tbody>
  );
};

export default DwColOptionCommon1; 