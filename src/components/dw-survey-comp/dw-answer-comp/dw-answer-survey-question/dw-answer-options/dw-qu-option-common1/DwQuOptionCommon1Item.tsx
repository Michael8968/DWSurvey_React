import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import DwHtmlLabelCommon from '../../../dw-answer-survey-common/DwHtmlLabelCommon';
import DwAnswerInput1 from '../dw-qu-input-common1/DwAnswerInput1';
import { showReadNotify } from '../../../../dw-utils/dw-common/dw-msg-common';
import { answerQuEventCommon } from '../../../dw-utils/dw-survey-answer-common';
import '../../../../../../assets/css/dw-answer.css';

export interface Option {
  optionTitleObj: any;
  checked?: boolean;
  validateObj?: {
    isOk: boolean;
    errorText: string;
  };
  showOptionNote?: boolean;
  inputAttr?: any;
  otherText?: string;
  itemClick?: boolean;
}

interface Props {
  quIndex: number;
  optionIndex: number;
  options: Option[];
  option?: Option;
  survey: any;
  quType: string;
  value?: any;
  answer?: any;
  onRefreshOptions?: (focusIndex: number | null) => void;
}

const DwQuOptionCommon1Item = forwardRef<any, Props>(({
  quIndex,
  optionIndex,
  options,
  survey,
  quType,
  onRefreshOptions
}, ref) => {
  const [itemHover, setItemHover] = useState(false);
  const [itemClick, setItemClick] = useState(false);
  const [inputText, setInputText] = useState('');
  const themeColor = survey.surveyStyle.themeColor;
  const rateColors = [
    survey.surveyStyle.themeColor,
    survey.surveyStyle.themeColor,
    survey.surveyStyle.themeColor,
  ];

  useEffect(() => {
    if (options[optionIndex].itemClick) {
      upItemClick();
      editFocus();
      options[optionIndex].itemClick = false;
    }
  }, []);

  const clickItem = () => {
    if (survey.readonly) return showReadNotify(survey);

    if (quType === 'RADIO') {
      survey.questions[quIndex].quRadios[optionIndex].checked = true;
      resetOtherRadio();
    } else if (quType === 'CHECKBOX') {
      survey.questions[quIndex].quCheckboxs[optionIndex].checked = 
        !survey.questions[quIndex].quCheckboxs[optionIndex].checked;
    }

    answerQuEventCommon(survey, quIndex);
  };

  const resetOtherRadio = () => {
    const quRadios = survey.questions[quIndex].quRadios;
    quRadios.forEach((item: any, index: number) => {
      if (index !== optionIndex) item.checked = false;
    });
  };

  const upItemClick = () => {
    setItemClick(true);
  };

  const editFocus = () => {
    // 实现编辑焦点逻辑
  };

  const renderRadioOption = () => (
    <div
      className={`dw-qu-item-el-checkbox-radio ${
        survey.questions[quIndex].quRadios[optionIndex].checked ? 'dw-item-checked' : ''
      }`}
    >
      {survey.questions[quIndex].quRadios[optionIndex].checked ? (
        <i className="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-solid fa-circle-dot animate__animated animate__tada dw-checked" />
      ) : (
        <i className="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-regular fa-circle" />
      )}
      <div className="dw-qu-item-option-title">
        <DwHtmlLabelCommon value={options[optionIndex].optionTitleObj} />
      </div>
      {survey.dwDebug && (
        <span>{survey.questions[quIndex].quRadios[optionIndex].checked}</span>
      )}
    </div>
  );

  const renderCheckboxOption = () => (
    <div
      className={`dw-qu-item-el-checkbox-radio ${
        survey.questions[quIndex].quCheckboxs[optionIndex].checked ? 'dw-item-checked' : ''
      }`}
    >
      {survey.questions[quIndex].quCheckboxs[optionIndex].checked ? (
        <i className="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-solid fa-square-check animate__animated animate__tada dw-checked" style={{ fontSize: '22px' }} />
      ) : (
        <i className="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-regular fa-square" style={{ fontSize: '22px' }} />
      )}
      <div className="dw-qu-item-option-title">
        <DwHtmlLabelCommon value={options[optionIndex].optionTitleObj} />
      </div>
      {survey.dwDebug && (
        <span>{survey.questions[quIndex].quCheckboxs[optionIndex].checked}</span>
      )}
    </div>
  );

  useImperativeHandle(ref, () => ({
    dragClick: (focusIndex: number | null) => {
      if (focusIndex === optionIndex) {
        upItemClick();
        editFocus();
      }
    }
  }));

  return (
    <div className="dw-qu-item" onClick={(e) => { e.stopPropagation(); clickItem(); }}>
      <div className="dw-qu-item-toolbar">
        <div className="dw-display-grid" />
      </div>
      <div className="dw-qu-item-body">
        {quType === 'RADIO' && renderRadioOption()}
        {quType === 'CHECKBOX' && renderCheckboxOption()}
        {quType !== 'RADIO' && quType !== 'CHECKBOX' && (
          <DwHtmlLabelCommon value={options[optionIndex].optionTitleObj} />
        )}
        {options[optionIndex].validateObj && !options[optionIndex].validateObj.isOk && (
          <div className="dw-answer-question-error dw-answer-question-option-error animate__animated animate__flipInX">
            <i className="fa-solid fa-circle-exclamation" />
            {options[optionIndex].validateObj.errorText}
          </div>
        )}
      </div>
      {options[optionIndex].checked && (quType === 'RADIO' || quType === 'CHECKBOX') && options[optionIndex].showOptionNote && (
        <DwAnswerInput1
          survey={survey}
          index={quIndex}
          optionIndex={optionIndex}
          inputAttr={options[optionIndex].inputAttr}
        />
      )}
    </div>
  );
});

export default DwQuOptionCommon1Item;
