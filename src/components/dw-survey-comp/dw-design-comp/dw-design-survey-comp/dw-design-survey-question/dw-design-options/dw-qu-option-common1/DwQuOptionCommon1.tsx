import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DwQuOptionCommon1Item from './DwQuOptionCommon1Item';

interface Option {
  optionTitleObj: any;
  [key: string]: any;
}

interface Question {
  cellCount: number;
}

interface Survey {
  questions: Question[];
  isRefreshAllQu?: boolean;
}

interface Props {
  index: number;
  options: Option[];
  survey: Survey;
  quType: string;
  onUpdateOptions: (options: Option[]) => void;
}

const DwQuOptionCommon1: React.FC<Props> = ({ index, options, survey, quType, onUpdateOptions }) => {
  const [dragOptions, setDragOptions] = useState<Option[]>(options);
  const [isDragging, setIsDragging] = useState(false);
  const itemRefs = useRef<any[]>([]);

  useEffect(() => {
    setDragOptions(options);
  }, [options]);

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = (result: any) => {
    setIsDragging(false);
    if (!result.destination) return;

    const items = Array.from(dragOptions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDragOptions(items);
    onUpdateOptions(items);
  };

  const refreshOptions = (focusIndex: number | null) => {
    onUpdateOptions(dragOptions);
    itemRefs.current.forEach((ref, i) => {
      if (ref && ref.dragClick) {
        ref.dragClick(focusIndex);
      }
    });
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${survey.questions[index].cellCount}, minmax(auto,1fr))`,
    alignItems: 'flex-start'
  } as React.CSSProperties;

  return (
    <div>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Droppable droppableId="options" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={gridStyle}
              className="dw-grid"
            >
              {dragOptions.map((item, optionIndex) => (
                <Draggable
                  key={`quOption-${optionIndex}`}
                  draggableId={`quOption-${optionIndex}`}
                  index={optionIndex}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{ ...provided.draggableProps.style, width: '100%' }}
                    >
                      <DwQuOptionCommon1Item
                        ref={(el) => (itemRefs.current[optionIndex] = el)}
                        value={dragOptions}
                        survey={survey}
                        quIndex={index}
                        optionIndex={optionIndex}
                        quType={quType}
                        onRefreshOptions={refreshOptions}
                      />
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
  );
};

export default DwQuOptionCommon1; 