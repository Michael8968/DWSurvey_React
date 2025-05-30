import React, { useState, useEffect, forwardRef } from 'react';
import { Rate, Input } from 'antd';
import { showReadNotify } from '../../../../dw-utils/dw-common/dw-msg-common';
import { answerQuEventCommon } from '../../../dw-utils/dw-survey-answer-common';
import DwHtmlLabelCommon from '../../../dw-answer-survey-common/DwHtmlLabelCommon';
import DwAnswerInput1 from '../dw-qu-input-common1/DwAnswerInput1';
import './DwQuOptionCommon2Item.css';

interface DwQuOptionCommon2ItemProps {
  quIndex: number;
  optionIndex: number;
  options: any[];
  option?: any;
  survey: any;
  quType: string;
  value?: any;
  answer?: any;
  onRefreshOptions?: (focusIndex: number | null) => void;
}

const DwQuOptionCommon2Item = forwardRef<any, DwQuOptionCommon2ItemProps>(({
  quIndex,
  optionIndex,
  options,
  option,
  survey,
  quType,
  value,
  answer,
  onRefreshOptions
}, ref) => {
  const [itemHover, setItemHover] = useState(false);
  const [itemClick, setItemClick] = useState(false);
  const [inputText, setInputText] = useState('');
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(0);

  useEffect(() => {
    if (survey.questions[quIndex].quType === 'CHECKBOX') {
      setMinLimit(survey.questions[quIndex].minLimit);
      setMaxLimit(survey.questions[quIndex].maxLimit);
    }
  }, [survey, quIndex]);

  const isAnswer = () => {
    const question = survey.questions[quIndex];
    if (question.quType === 'MULTIFILLBLANK') {
      const answer = question.quMultiFillblanks[optionIndex].inputText;
      return answer !== null && answer !== undefined && answer !== '';
    }
    return false;
  };

  const clickItem = () => {
    if (survey.readonly) return showReadNotify(survey);

    if (quType === 'RADIO') {
      survey.questions[quIndex].quRadios[optionIndex].checked = true;
      resetOtherRadio();
    } else if (quType === 'CHECKBOX') {
      survey.questions[quIndex].quCheckboxs[optionIndex].checked = 
        !survey.questions[quIndex].quCheckboxs[optionIndex].checked;
    } else if (quType === 'SCORE') {
      survey.questions[quIndex].quScores[optionIndex].checked = true;
    }
    onBlur();
  };

  const resetOtherRadio = () => {
    const quRadios = survey.questions[quIndex].quRadios;
    quRadios.forEach((item: any, index: number) => {
      if (index !== optionIndex) item.checked = false;
    });
  };

  const onBlur = () => {
    answerQuEventCommon(survey, quIndex);
  };

  const renderRadioOption = () => (
    <div 
      className={`dw-qu-item-el-checkbox-radio ${
        survey.questions[quIndex].quRadios[optionIndex].checked ? 'dw-item-checked' : ''
      }`}
      onClick={clickItem}
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
      onClick={clickItem}
    >
      {survey.questions[quIndex].quCheckboxs[optionIndex].checked ? (
        <i className="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-solid fa-square-check animate__animated animate__tada dw-checked" />
      ) : (
        <i className="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-regular fa-square" />
      )}
      <div className="dw-qu-item-option-title">
        <DwHtmlLabelCommon value={options[optionIndex].optionTitleObj} />
      </div>
      {survey.dwDebug && (
        <span>{survey.questions[quIndex].quCheckboxs[optionIndex].checked}</span>
      )}
    </div>
  );

  const renderOtherOptions = () => (
    <div style={{ marginBottom: '5px' }}>
      <div className="dw-qu-item-option-title">
        <DwHtmlLabelCommon value={options[optionIndex].optionTitleObj} />
      </div>
      {quType === 'MULTIFILLBLANK' && (
        <DwAnswerInput1
          survey={survey}
          index={quIndex}
          optionIndex={optionIndex}
          inputAttr={survey.questions[quIndex].quMultiFillblanks[optionIndex].inputAttr}
        />
      )}
      {quType === 'SCORE' && (
        <Rate
          value={survey.questions[quIndex].quScores[optionIndex].answerScore}
          count={survey.questions[quIndex].paramInt02}
          disabled={survey.readonly}
          onChange={clickItem}
          style={{ color: survey.surveyStyle.pageThemeColor }}
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="dw-qu-item" onClick={(e) => e.stopPropagation()}>
        <div className="dw-qu-item-body">
          {quType === 'RADIO' && renderRadioOption()}
          {quType === 'CHECKBOX' && renderCheckboxOption()}
          {quType !== 'RADIO' && quType !== 'CHECKBOX' && renderOtherOptions()}
          
          {options[optionIndex].validateObj && !options[optionIndex].validateObj.isOk && (
            <div className="dw-answer-question-error dw-answer-question-option-error animate__animated animate__flipInX">
              <i className="fa-solid fa-circle-exclamation" />
              {options[optionIndex].validateObj.errorText}
            </div>
          )}
        </div>
        <div className="dw-qu-item-toolbar dw-display-flex-right" />
      </div>
      
      {options[optionIndex].checked && 
       (quType === 'RADIO' || quType === 'CHECKBOX') && 
       options[optionIndex].showOptionNote && (
        <div style={{ marginBottom: '5px' }}>
          <DwAnswerInput1
            survey={survey}
            index={quIndex}
            optionIndex={optionIndex}
            inputAttr={options[optionIndex].inputAttr}
          />
        </div>
      )}
    </div>
  );
});

export default DwQuOptionCommon2Item;
