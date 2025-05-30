import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, ButtonGroup, Slider } from 'element-react';
import DwRowOptionCommon2Item from './components/DwRowOptionCommon2Item';
import { generateNumbers } from '../../../../../../../dw-utils/dw-common/dw-common-utils';
import './DwQuMatrixOptionCommon2.scss';

interface Survey {
  questions: Array<{
    quType: string;
    quAttr: {
      scaleAttr?: {
        min?: number;
        max?: number;
        showLrText?: boolean;
      };
      sliderAttr?: {
        min?: number;
        max?: number;
        step?: number;
        showLrText?: boolean;
      };
    };
  }>;
}

interface Option {
  dwId: string;
  lr?: {
    left?: string;
    right?: string;
  };
  [key: string]: any;
}

interface Props {
  index: number;
  options: Option[];
  survey: Survey;
  quType: string;
  onChange?: (options: Option[]) => void;
}

const DwQuMatrixOptionCommon2: React.FC<Props> = ({
  index,
  options,
  survey,
  quType,
  onChange
}) => {
  const [dragOptions, setDragOptions] = useState<Option[]>(options);
  const [isDragging, setIsDragging] = useState(false);
  const [value1, setValue1] = useState(50);

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
    onChange?.(items);
  };

  const handleRefreshOptions = (focusIndex: number | null) => {
    onChange?.(dragOptions);
  };

  const renderScaleButtons = (min?: number, max?: number) => {
    if (min === undefined || max === undefined) return null;
    const numbers = generateNumbers(min, max);
    return (
      <ButtonGroup>
        {numbers.map(number => (
          <Button key={`scale_${number}`} disabled>{number}</Button>
        ))}
      </ButtonGroup>
    );
  };

  const renderSlider = (min?: number, max?: number, step?: number) => {
    if (min === undefined || max === undefined) return null;
    return (
      <Slider
        value={value1}
        min={min}
        max={max}
        step={step}
        disabled
        style={{ width: '600px', margin: 0 }}
      />
    );
  };

  const renderLrText = (rowOption: Option, rowOptionIndex: number) => {
    const showLrText = (survey.questions[index].quAttr.scaleAttr?.showLrText || 
                       survey.questions[index].quAttr.sliderAttr?.showLrText) && 
                       rowOption.hasOwnProperty('lr');

    if (!showLrText) return null;

    return (
      <tr style={{ fontSize: '13px' }}>
        <td>
          <div className="dw-display-flex" style={{ justifyContent: 'space-between', color: 'grey' }}>
            <div>
              <DwRowOptionCommon2Item
                value={dragOptions}
                survey={survey}
                quIndex={index}
                optionIndex={rowOptionIndex}
                quType={quType}
                valueType="left"
                onChange={(newValue) => {
                  setDragOptions(newValue);
                  onChange?.(newValue);
                }}
                onRefreshOptions={handleRefreshOptions}
              />
            </div>
            <div>
              <DwRowOptionCommon2Item
                value={dragOptions}
                survey={survey}
                quIndex={index}
                optionIndex={rowOptionIndex}
                quType={quType}
                valueType="right"
                onChange={(newValue) => {
                  setDragOptions(newValue);
                  onChange?.(newValue);
                }}
                onRefreshOptions={handleRefreshOptions}
              />
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="qu-option">
          {(provided) => (
            <table ref={provided.innerRef} {...provided.droppableProps}>
              <tbody>
                {dragOptions.map((rowOption, rowOptionIndex) => (
                  <React.Fragment key={`matrix-rowOption-${rowOption.dwId}`}>
                    <tr>
                      <td>
                        <DwRowOptionCommon2Item
                          value={dragOptions}
                          survey={survey}
                          quIndex={index}
                          optionIndex={rowOptionIndex}
                          quType={quType}
                          valueType="row"
                          onChange={(newValue) => {
                            setDragOptions(newValue);
                            onChange?.(newValue);
                          }}
                          onRefreshOptions={handleRefreshOptions}
                        />
                      </td>
                    </tr>
                    {quType === 'MATRIX_SCALE' && (
                      <tr className="dwMoveSortQuOption">
                        <td style={{ paddingRight: '40px' }}>
                          {renderScaleButtons(
                            survey.questions[index].quAttr.scaleAttr?.min,
                            survey.questions[index].quAttr.scaleAttr?.max
                          )}
                        </td>
                      </tr>
                    )}
                    {quType === 'MATRIX_SLIDER' && (
                      <tr className="dwMoveSortQuOption">
                        <td style={{ paddingRight: '40px' }}>
                          {renderSlider(
                            survey.questions[index].quAttr.sliderAttr?.min,
                            survey.questions[index].quAttr.sliderAttr?.max,
                            survey.questions[index].quAttr.sliderAttr?.step
                          )}
                        </td>
                      </tr>
                    )}
                    {renderLrText(rowOption, rowOptionIndex)}
                  </React.Fragment>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DwQuMatrixOptionCommon2; 