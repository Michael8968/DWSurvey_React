import React, { useState, useEffect } from 'react';
import { Popover, Input, Button } from 'antd';
import {dwOption2Texts, dwResetQuOptions, dwSurveyQuAddOption} from '../../../../dw-utils/dw-survey-update-question'
import {clickItem, upAllItemClick} from '../../../../dw-utils/dw-survey-update-item-click'

interface DwPopoverMoreOptionsProps {
  index: number;
  survey: any;
  popoverTitle?: string;
  textPlaceholder?: string;
  addOrEdit?: 'add' | 'edit';
  onUpdateSurvey?: (survey: any) => void;
  onClickItem?: () => void;
  children?: React.ReactNode;
}

const DwPopoverMoreOptions: React.FC<DwPopoverMoreOptionsProps> = ({
  index,
  survey,
  popoverTitle = '批量增加选项',
  textPlaceholder = '请输入需要批量新增加的选项内容，每行一个。',
  addOrEdit = 'add',
  onUpdateSurvey,
  onClickItem,
  children
}) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [moreOptionText, setMoreOptionText] = useState('');
  const [visible, setVisible] = useState(false);

  const showPopoverLoad = () => {
    if (addOrEdit === 'edit') {
      setMoreOptionText(dwOption2Texts(survey, index));
    }
  };

  const clickShowPopoverEvent = () => {
    onClickItem?.();
    clickItem(survey, itemIndex, (newSurvey: any, newItemIndex: number) => {
      onUpdateSurvey?.(newSurvey);
      setItemIndex(newItemIndex);
    });
  };

  const cancelAddOptionEvent = () => {
    upAllItemClick(survey, [], (newSurvey: any) => {
      onUpdateSurvey?.(newSurvey);
    });
    setVisible(false);
  };

  const addMoreOptionEvent = () => {
    if (moreOptionText.length > 0) {
      const options = moreOptionText.split(/\r\n|[\r\n]/);
      if (options && options.length > 0) {
        if (addOrEdit === 'edit') {
          dwResetQuOptions(survey, index, (newSurvey: any) => {
            onUpdateSurvey?.(newSurvey);
          });
        }
        
        options.forEach(option => {
          const quOption = {
            id: null,
            optionTitleObj: {
              dwHtml: option,
              dwText: option,
              dwPlaceholder: '请输入内容'
            },
            itemClick: false
          };
          const newSurvey = dwSurveyQuAddOption(survey, index, quOption);
          onUpdateSurvey?.(newSurvey);
        });
        
        setMoreOptionText('');
        setVisible(false);
      }
    }
  };

  return (
    <Popover
      open={visible}
      placement="bottomLeft"
      title={popoverTitle}
      content={
        <div>
          <Input.TextArea
            value={moreOptionText}
            onChange={(e) => setMoreOptionText(e.target.value)}
            placeholder={textPlaceholder}
            rows={10}
          />
          <div style={{ textAlign: 'right', marginTop: '5px' }}>
            <Button type="link" onClick={cancelAddOptionEvent}>
              取消
            </Button>
            <Button type="primary" onClick={addMoreOptionEvent}>
              确认
            </Button>
          </div>
        </div>
      }
      trigger="click"
      onOpenChange={(newVisible) => {
        setVisible(newVisible);
        if (newVisible) {
          showPopoverLoad();
        }
      }}
    >
      <div onClick={(e) => {
        e.stopPropagation();
        clickShowPopoverEvent();
        setVisible(true);
      }}>
        {children}
      </div>
    </Popover>
  );
};

export default DwPopoverMoreOptions;