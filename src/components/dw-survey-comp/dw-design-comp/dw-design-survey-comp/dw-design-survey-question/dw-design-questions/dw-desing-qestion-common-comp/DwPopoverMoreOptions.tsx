import React, { useState } from 'react';
import { Popover, Input, Button } from 'element-react';
import { v4 as uuidV4 } from 'uuid';
import {
  dwOption2Texts,
  dwResetQuOptions,
  dwSurveyQuAddMatrixColOption,
  dwSurveyQuAddOption
} from '../../../../../dw-utils/dw-survey-update-question';
import { parseQuOptionTypeByQu } from '../../../../../dw-utils/dw-survey-parse';

interface QuFocusObj {
  quFocus: boolean;
  quSetShow: boolean;
  quLogicShow: boolean;
  quMoreOptionShow: boolean;
  quMoreOptionShowEdit: boolean;
  quScorePopoverShow: boolean;
  quScaleTextPopoverShow: boolean;
  quMoreOptionColShow: boolean;
}

interface Question {
  quFocusObj: QuFocusObj;
}

interface Survey {
  questions: Question[];
}

interface Props {
  value: Survey;
  index: number;
  popoverTitle?: string;
  textPlaceholder?: string;
  addOrEdit?: 'add' | 'edit' | 'addCol';
  onClickItem?: () => void;
  onChange: (survey: Survey) => void;
  children: React.ReactNode;
}

const DwPopoverMoreOptions: React.FC<Props> = ({
  value,
  index,
  popoverTitle = '批量增加选项',
  textPlaceholder = '请输入批量新增加的选项，每行一个。',
  addOrEdit = 'add',
  onClickItem,
  onChange,
  children
}) => {
  const [moreOptionText, setMoreOptionText] = useState('');
  const [popoverVisible, setPopoverVisible] = useState(false);

  const showPopoverLoad = () => {
    if (addOrEdit === 'edit') {
      setMoreOptionText(dwOption2Texts(value, index));
    }
  };

  const clickShowPopoverEvent = () => {
    onClickItem?.();
    const newSurvey = { ...value };
    if (addOrEdit === 'add') {
      newSurvey.questions[index].quFocusObj.quMoreOptionShow = true;
    } else if (addOrEdit === 'edit') {
      newSurvey.questions[index].quFocusObj.quMoreOptionShowEdit = true;
    } else if (addOrEdit === 'addCol') {
      newSurvey.questions[index].quFocusObj.quMoreOptionColShow = true;
    }
    onChange(newSurvey);
  };

  const addMoreOptionEvent = () => {
    if (moreOptionText.length > 0) {
      const options = moreOptionText.split(/\r\n|[\r\n]/);
      if (options !== undefined && options.length > 0) {
        const newSurvey = { ...value };
        if (addOrEdit === 'edit') {
          dwResetQuOptions(newSurvey, index, (survey) => {
            onChange(survey);
          });
          newSurvey.questions[index].quFocusObj.quMoreOptionShowEdit = false;
        }

        if (addOrEdit === 'addCol') {
          for (let i = 0; i < options.length; i++) {
            const quOption = {
              id: null,
              optionTitleObj: {
                dwHtml: options[i],
                dwText: options[i],
                dwPlaceholder: '请输入内容'
              },
              itemClick: false,
              tempEmptyOption: false,
              dwId: uuidV4()
            };
            dwAddQuItem(quOption);
          }
          newSurvey.questions[index].quFocusObj.quMoreOptionColShow = false;
        } else {
          for (let i = 0; i < options.length; i++) {
            const quOption = {
              id: null,
              optionTitleObj: {
                dwHtml: options[i],
                dwText: options[i],
                dwPlaceholder: '请输入内容'
              },
              itemClick: false,
              dwId: uuidV4()
            };
            parseQuOptionTypeByQu(newSurvey.questions[index], quOption);
            dwAddQuItem(quOption);
          }
          newSurvey.questions[index].quFocusObj.quMoreOptionShow = false;
        }
        setMoreOptionText('');
        onChange(newSurvey);
      }
    }
  };

  const dwAddQuItem = (quOption: any) => {
    if (addOrEdit === 'addCol') {
      const newSurvey = dwSurveyQuAddMatrixColOption(value, index, quOption);
      onChange(newSurvey);
    } else {
      const newSurvey = dwSurveyQuAddOption(value, index, quOption);
      onChange(newSurvey);
    }
  };

  const getPopoverVisible = () => {
    if (addOrEdit === 'add') {
      return value.questions[index].quFocusObj.quMoreOptionShow;
    } else if (addOrEdit === 'edit') {
      return value.questions[index].quFocusObj.quMoreOptionShowEdit;
    } else {
      return value.questions[index].quFocusObj.quMoreOptionColShow;
    }
  };

  return (
    <Popover
      value={getPopoverVisible()}
      trigger="manual"
      placement="bottom-start"
      width={300}
      popperClass="dw-popover-more-options"
      onShow={showPopoverLoad}
    >
      <div>
        <div style={{ fontSize: '14px', paddingBottom: '5px' }}>{popoverTitle}</div>
        <Input
          type="textarea"
          value={moreOptionText}
          placeholder={textPlaceholder}
          rows={10}
          onChange={(val) => setMoreOptionText(val)}
        />
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '13px', marginRight: '5px', color: 'darkgrey' }}>
            提示：点击框外任意区域关闭当前弹出框
          </span>
          <Button type="primary" size="small" style={{ marginTop: '5px' }} onClick={addMoreOptionEvent}>
            添加
          </Button>
        </div>
      </div>
      <div onClick={clickShowPopoverEvent}>{children}</div>
    </Popover>
  );
};

export default DwPopoverMoreOptions; 