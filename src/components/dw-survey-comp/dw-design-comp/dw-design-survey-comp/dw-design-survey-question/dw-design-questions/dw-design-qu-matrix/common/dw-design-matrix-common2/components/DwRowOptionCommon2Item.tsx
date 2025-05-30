import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import DwTextEditLabel from '../../../../../../dw-design-survey-common/DwTextEditLabel';
import './DwRowOptionCommon2Item.scss';

interface Survey {
  questions: Array<{
    quType: string;
    [key: string]: any;
  }>;
}

interface Option {
  dwId: string;
  optionTitleObj: {
    dwHtml: string;
    dwText: string;
    dwPlaceholder: string;
  };
  lr?: {
    left?: {
      optionTitleObj: {
        dwHtml: string;
        dwText: string;
        dwPlaceholder: string;
      };
    };
    right?: {
      optionTitleObj: {
        dwHtml: string;
        dwText: string;
        dwPlaceholder: string;
      };
    };
  };
  itemClick: boolean;
  [key: string]: any;
}

interface Props {
  quIndex: number;
  optionIndex: number;
  value: Option[];
  survey: Survey;
  quType: string;
  valueType: 'row' | 'left' | 'right';
  onChange?: (value: Option[]) => void;
  onRefreshOptions?: (focusIndex: number | null) => void;
}

const DwRowOptionCommon2Item: React.FC<Props> = ({
  quIndex,
  optionIndex,
  value,
  survey,
  quType,
  valueType,
  onChange,
  onRefreshOptions
}) => {
  const [itemStatus, setItemStatus] = useState({
    itemHover: false,
    itemClick: false
  });
  const dwEditLabelRef = useRef<any>(null);
  const dwEditLabelLeftRef = useRef<any>(null);
  const dwEditLabelRightRef = useRef<any>(null);

  useEffect(() => {
    if (value[optionIndex].itemClick) {
      handleUpItemClick(true);
      handleEditFocus();
      value[optionIndex].itemClick = false;
    }
  }, []);

  const itemBtnShow = itemStatus.itemHover || itemStatus.itemClick;

  const handleClickItem = () => {
    // 点击事件处理
  };

  const handleUpItemClick = (itemClick: boolean) => {
    setItemStatus(prev => ({ ...prev, itemClick }));
  };

  const handleMouseLeave = () => {
    setItemStatus(prev => ({ ...prev, itemHover: false }));
  };

  const handleMouseOver = () => {
    setItemStatus(prev => ({ ...prev, itemHover: true }));
  };

  const handleAddOptionBefore = () => {
    const quOption: Option = {
      dwId: uuidV4(),
      optionTitleObj: {
        dwHtml: '新行选项',
        dwText: '新行选项',
        dwPlaceholder: '请输入内容'
      },
      itemClick: false
    };
    const newValue = [...value];
    newValue.splice(optionIndex + 1, 0, quOption);
    onChange?.(newValue);
    onRefreshOptions?.(optionIndex + 1);
  };

  const handleUpValue = (html: any) => {
    const newValue = [...value];
    if (valueType === 'left') {
      newValue[optionIndex].lr!.left!.optionTitleObj = html;
    } else if (valueType === 'right') {
      newValue[optionIndex].lr!.right!.optionTitleObj = html;
    } else {
      newValue[optionIndex].optionTitleObj = html;
    }
    onChange?.(newValue);
  };

  const handleDragClick = (focusIndex: number | null) => {
    dwEditLabelRef.current?.upEditorText(value[optionIndex].optionTitleObj.dwHtml);
    if (focusIndex !== null && optionIndex === focusIndex) {
      handleUpItemClick(true);
      handleEditFocus();
    }
  };

  const handleEditFocus = () => {
    dwEditLabelRef.current?.editFocus();
  };

  const handleDeleteOption = () => {
    const newValue = [...value];
    newValue.splice(optionIndex, 1);
    onChange?.(newValue);
    onRefreshOptions?.(null);
  };

  const renderContent = () => {
    if (valueType === 'row') {
      return (
        <>
          {itemBtnShow && (
            <div className="dw-qu-item-toolbar">
              <div className="dw-display-grid">
                <div className="dw-question-toolbar">
                  <i className="dwMoveSortQuOption dw-cursor-pointer dw-event-color el-icon-rank" aria-hidden="true"></i>
                </div>
                <div className="dw-question-toolbar" onClick={handleAddOptionBefore}>
                  <i className="dw-cursor-pointer dw-event-color el-icon-circle-plus-outline" aria-hidden="true"></i>
                </div>
                <div className="dw-question-toolbar" onClick={handleDeleteOption}>
                  <i className="dw-cursor-pointer dw-event-color el-icon-remove-outline" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          )}
          <div className="dw-qu-item-body">
            <div className="dw-qu-item-el-checkbox-radio">
              <DwTextEditLabel
                ref={dwEditLabelRef}
                value={value[optionIndex].optionTitleObj}
                itemStatus={itemStatus}
                onUpItemClick={handleUpItemClick}
                onUpValue={handleUpValue}
              />
            </div>
          </div>
        </>
      );
    } else if (valueType === 'left') {
      return (
        <div className="dw-qu-item-body">
          <div className="dw-qu-item-el-checkbox-radio">
            <DwTextEditLabel
              ref={dwEditLabelLeftRef}
              value={value[optionIndex].lr!.left!.optionTitleObj}
              itemStatus={itemStatus}
              onUpItemClick={handleUpItemClick}
              onUpValue={handleUpValue}
            />
          </div>
        </div>
      );
    } else if (valueType === 'right') {
      return (
        <div className="dw-qu-item-body">
          <div className="dw-qu-item-el-checkbox-radio">
            <DwTextEditLabel
              ref={dwEditLabelRightRef}
              value={value[optionIndex].lr!.right!.optionTitleObj}
              itemStatus={itemStatus}
              onUpItemClick={handleUpItemClick}
              onUpValue={handleUpValue}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="dw-qu-item" 
      onClick={handleClickItem}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {renderContent()}
    </div>
  );
};

export default DwRowOptionCommon2Item; 