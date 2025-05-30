import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Badge, Input, Rate, Tooltip } from 'element-react';
import { v4 as uuidV4 } from 'uuid';
import { parseQuOptionType1Item } from '../../../../../../dw-utils/dw-survey-parse';
import DwTextEditLabel from '../../../dw-design-survey-common/DwTextEditLabel';

interface OptionTitleObj {
  dwText: string;
  dwHtml: string;
  dwPlaceholder?: string;
}

interface Option {
  id: string | null;
  dwId: string;
  optionTitleObj: OptionTitleObj;
  itemClick?: boolean;
  scoreNum?: number;
  showOptionNote?: boolean;
  answerInputRow?: number;
  inputAttr?: {
    commonAttr: {
      placeholder: string;
      inputRow: number;
    };
  };
}

interface Question {
  quAttr: {
    scoreAttr: {
      designShowScoreNum: boolean;
    };
  };
  paramInt02?: number;
}

interface Survey {
  questions: Question[];
  surveyAttrs: {
    scoreAttr: {
      enabled: boolean;
    };
  };
}

interface Props {
  value: Option[];
  survey: Survey;
  quIndex: number;
  optionIndex: number;
  quType: string;
  onRefreshOptions: (focusIndex: number | null) => void;
}

const DwQuOptionCommon2Item = forwardRef<any, Props>((props, ref) => {
  const { value, survey, quIndex, optionIndex, quType, onRefreshOptions } = props;
  const [itemStatus, setItemStatus] = useState({ itemHover: false, itemClick: false });
  const [inputText, setInputText] = useState('');
  const dwEditLabelRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    dragClick: (focusIndex: number | null) => {
      if (dwEditLabelRef.current) {
        dwEditLabelRef.current.upEditorText(value[optionIndex].optionTitleObj.dwHtml);
        if (focusIndex !== null && optionIndex === focusIndex) {
          upItemClick(true);
          editFocus();
        }
      }
    },
    editFocus: () => {
      if (dwEditLabelRef.current) {
        dwEditLabelRef.current.editFocus();
      }
    }
  }));

  const clickItem = () => {
    // Handle click event
  };

  const upItemClick = (itemClick: boolean) => {
    setItemStatus(prev => ({ ...prev, itemClick }));
  };

  const mouseleaveItem = () => {
    setItemStatus(prev => ({ ...prev, itemHover: false }));
  };

  const mouseoverItem = () => {
    setItemStatus(prev => ({ ...prev, itemHover: true }));
  };

  const addOptionBefore = () => {
    const quOption: Option = {
      id: null,
      dwId: uuidV4(),
      optionTitleObj: {
        dwHtml: '',
        dwText: '',
        dwPlaceholder: '请输入内容'
      },
      itemClick: false
    };
    parseQuOptionType1Item(quOption);
    const newOptions = [...value];
    newOptions.splice(optionIndex + 1, 0, quOption);
    onRefreshOptions(optionIndex + 1);
  };

  const upValue = (html: OptionTitleObj) => {
    const newOptions = [...value];
    newOptions[optionIndex].optionTitleObj = html;
    onRefreshOptions(null);
  };

  const deleteOption = () => {
    const newOptions = [...value];
    newOptions.splice(optionIndex, 1);
    onRefreshOptions(null);
  };

  const showScoreBadge = survey.questions[quIndex].quAttr.scoreAttr.designShowScoreNum && 
    survey.surveyAttrs.scoreAttr.enabled && 
    value[optionIndex].scoreNum !== undefined;

  return (
    <div onClick={clickItem} onMouseOver={mouseoverItem} onMouseLeave={mouseleaveItem}>
      <div className="dw-qu-item-body">
        <div className="dw-qu-item">
          <div className="dw-qu-item-el-checkbox-radio">
            <Badge
              hidden={!showScoreBadge}
              value={`${value[optionIndex].scoreNum}分`}
              className="dw-el-badge-option-score"
              type="warning"
            >
              {quType === 'RADIO' && <i className="dw-qu-item-el-checkbox-radio-icon far fa-circle" />}
              {quType === 'CHECKBOX' && <i className="dw-qu-item-el-checkbox-radio-icon far fa-square" />}
            </Badge>
            <DwTextEditLabel
              ref={dwEditLabelRef}
              value={value[optionIndex].optionTitleObj}
              itemStatus={itemStatus}
              onUpItemClick={upItemClick}
              onUpValue={upValue}
            />
          </div>
          {(itemStatus.itemHover || itemStatus.itemClick) && (
            <div className="dw-qu-item-toolbar dw-display-flex-right">
              <Tooltip content="排序选项" placement="top">
                <div className="dw-question-toolbar dw-margin-right-10">
                  <i className="dwMoveSortQuOption dw-cursor-pointer dw-event-color el-icon-rank" />
                </div>
              </Tooltip>
              <Tooltip content="在后添加选项" placement="top">
                <div className="dw-question-toolbar dw-margin-right-10" onClick={addOptionBefore}>
                  <i className="dw-cursor-pointer dw-event-color el-icon-circle-plus-outline" />
                </div>
              </Tooltip>
              <Tooltip content="删除当前选项" placement="top">
                <div className="dw-question-toolbar dw-margin-right-10" onClick={deleteOption}>
                  <i className="dw-cursor-pointer dw-event-color el-icon-remove-outline" />
                </div>
              </Tooltip>
            </div>
          )}
        </div>
        {(quType === 'MULTIFILLBLANK' || ((quType === 'RADIO' || quType === 'CHECKBOX') && value[optionIndex].showOptionNote)) && (
          value[optionIndex].answerInputRow > 1 ? (
            <Input
              type="textarea"
              value={inputText}
              placeholder={value[optionIndex].inputAttr?.commonAttr.placeholder}
              autosize={{ minRows: value[optionIndex].inputAttr?.commonAttr.inputRow }}
              onChange={(val) => setInputText(val)}
            />
          ) : (
            <Input
              value={inputText}
              placeholder={value[optionIndex].inputAttr?.commonAttr.placeholder}
              onChange={(val) => setInputText(val)}
            />
          )
        )}
        {quType === 'SCORE' && (
          <Rate max={survey.questions[quIndex].paramInt02} />
        )}
      </div>
    </div>
  );
});

export default DwQuOptionCommon2Item; 