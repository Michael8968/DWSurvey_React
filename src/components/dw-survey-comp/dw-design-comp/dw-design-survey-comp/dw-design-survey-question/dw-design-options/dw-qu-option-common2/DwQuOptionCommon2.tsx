import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DwQuOptionCommon2Item from './DwQuOptionCommon2Item';

interface Option {
  optionTitleObj: {
    dwText: string;
    dwHtml: string;
  };
  itemClick?: boolean;
}

interface Question {
  options: Option[];
}

interface Survey {
  questions: Question[];
}

interface Props {
  index: number;
  options: Option[];
  survey: Survey;
  quType: string;
  onUpdateOptions: (options: Option[]) => void;
}

const DwQuOptionCommon2: React.FC<Props> = ({ index, options, survey, quType, onUpdateOptions }) => {
  const [dragOptions, setDragOptions] = useState<Option[]>(options);
  const [isDragging, setIsDragging] = useState(false);
  const quCommonItemRefs = useRef<any[]>([]);

  useEffect(() => {
    setDragOptions(options);
  }, [options]);

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
    onUpdateOptions(items);
    refreshOptions(null);
  };

  const refreshOptions = (focusIndex: number | null) => {
    onUpdateOptions(dragOptions);
    quCommonItemRefs.current.forEach((ref, i) => {
      if (ref && ref.dragClick) {
        ref.dragClick(focusIndex);
      }
    });
  };

  return (
    <div>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="qu-option" isDropDisabled={true}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {dragOptions.map((item, optionIndex) => (
                <Draggable
                  key={`quOption-${optionIndex}`}
                  draggableId={`quOption-${optionIndex}`}
                  index={optionIndex}
                  isDragDisabled={false}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={snapshot.isDragging ? 'dwDragClass' : ''}
                    >
                      <DwQuOptionCommon2Item
                        ref={(el) => (quCommonItemRefs.current[optionIndex] = el)}
                        survey={survey as any}
                        quIndex={index}
                        optionIndex={optionIndex}
                        quType={quType}
                        onRefreshOptions={refreshOptions}
                        value={dragOptions as any[]}
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

export default DwQuOptionCommon2; 