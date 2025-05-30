import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Badge, Input } from 'element-react';
import DwTextEditLabel from '../../../dw-design-survey-common/DwTextEditLabel';

interface OptionTitleObj {
  dwHtml: string;
  dwText: string;
  dwPlaceholder: string;
}

interface Option {
  id: string | null;
  optionTitleObj: OptionTitleObj;
  itemClick: boolean;
  showOptionNote?: boolean;
  inputAttr?: {
    commonAttr: {
      inputRow: number;
      placeholder: string;
    };
  };
  scoreNum?: number;
}

interface Question {
  quAttr: {
    scoreAttr: {
      designShowScoreNum: boolean;
    };
  };
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
  quIndex: number;
  optionIndex: number;
  options: Option[];
  survey: Survey;
  quType: string;
  value: Option[];
  onUpdateOptions: (options: Option[]) => void;
  onRefreshOptions: (focusIndex: number | null) => void;
}

export interface DwQuOptionCommon1ItemRef {
  dragClick: (focusIndex: number | null) => void;
  editFocus: () => void;
}

const DwQuOptionCommon1Item = forwardRef<DwQuOptionCommon1ItemRef, Props>(({
  quIndex,
  optionIndex,
  options,
  survey,
  quType,
  value,
  onUpdateOptions,
  onRefreshOptions
}, ref) => {
  const [itemStatus, setItemStatus] = useState({
    itemHover: false,
    itemClick: false
  });
  const [inputText, setInputText] = useState<string | null>(null);
  const dwEditLabelRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    dragClick: (focusIndex: number | null) => {
      if (dwEditLabelRef.current) {
        dwEditLabelRef.current.upEditorText(options[optionIndex].optionTitleObj.dwHtml);
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

  const itemBtnShow = itemStatus.itemHover || itemStatus.itemClick;

  const clickItem = () => {
    // 实现点击逻辑
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
      optionTitleObj: {
        dwHtml: '',
        dwText: '',
        dwPlaceholder: '请输入内容'
      },
      itemClick: false
    };
    const newOptions = [...options];
    newOptions.splice(optionIndex + 1, 0, quOption);
    onUpdateOptions(newOptions);
    onRefreshOptions(optionIndex + 1);
  };

  const upValue = (html: OptionTitleObj) => {
    const newOptions = [...options];
    newOptions[optionIndex].optionTitleObj = html;
    onUpdateOptions(newOptions);
  };

  const deleteOption = () => {
    const newOptions = [...options];
    newOptions.splice(optionIndex, 1);
    onUpdateOptions(newOptions);
    onRefreshOptions(null);
  };

  const showScoreBadge = survey.questions[quIndex].quAttr.scoreAttr.designShowScoreNum && 
    survey.surveyAttrs.scoreAttr.enabled && 
    options[optionIndex].scoreNum !== undefined;

  return (
    <div 
      className="dw-qu-item" 
      onClick={clickItem}
      onMouseOver={mouseoverItem}
      onMouseLeave={mouseleaveItem}
    >
      {itemBtnShow && (
        <div className="dw-qu-item-toolbar">
          <div className="dw-display-grid">
            <div className="dw-question-toolbar">
              <i className="dwMoveSortQuOption dw-cursor-pointer dw-event-color el-icon-rank" aria-hidden="true"></i>
            </div>
            <div className="dw-question-toolbar" onClick={(e) => { e.stopPropagation(); addOptionBefore(); }}>
              <i className="dw-cursor-pointer dw-event-color el-icon-circle-plus-outline" aria-hidden="true"></i>
            </div>
            <div className="dw-question-toolbar" onClick={(e) => { e.stopPropagation(); deleteOption(); }}>
              <i className="dw-cursor-pointer dw-event-color el-icon-remove-outline" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      )}
      <div className="dw-qu-item-body">
        <div className="dw-qu-item-el-checkbox-radio">
          <Badge
            hidden={!showScoreBadge}
            value={`${options[optionIndex].scoreNum}分`}
            className="dw-el-badge-option-score"
            type="warning"
          >
            {quType === 'RADIO' && (
              <i className="dw-qu-item-el-checkbox-radio-icon far fa-circle"></i>
            )}
            {quType === 'CHECKBOX' && (
              <i className="dw-qu-item-el-checkbox-radio-icon far fa-square"></i>
            )}
          </Badge>
          <DwTextEditLabel
            ref={dwEditLabelRef}
            value={options[optionIndex].optionTitleObj}
            itemStatus={itemStatus}
            onUpItemClick={upItemClick}
            onUpValue={upValue}
          />
        </div>
        {((quType === 'RADIO' || quType === 'CHECKBOX') && options[optionIndex].showOptionNote) && (
          options[optionIndex].inputAttr?.commonAttr.inputRow > 1 ? (
            <Input
              type="textarea"
              value={inputText || ''}
              onChange={(value) => setInputText(value)}
              placeholder={options[optionIndex].inputAttr?.commonAttr.placeholder}
              autosize={{ minRows: options[optionIndex].inputAttr?.commonAttr.inputRow }}
            />
          ) : (
            <Input
              value={inputText || ''}
              onChange={(value) => setInputText(value)}
              placeholder={options[optionIndex].inputAttr?.commonAttr.placeholder}
            />
          )
        )}
      </div>
    </div>
  );
});

export default DwQuOptionCommon1Item; 