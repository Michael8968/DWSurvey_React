import React, { useEffect, useState } from 'react';
import { TimePicker, DatePicker, Input } from 'antd';
import type { DatePickerProps } from 'antd';
import { answerQuEventCommonExt } from '../../../dw-utils/dw-survey-answer-common';
import '../../../../../../assets/css/dw-answer.css';

interface DwAnswerInput1Props {
  index: number;
  survey: any;
  inputAttr: any;
  optionIndex: number;
}

const DwAnswerInput1: React.FC<DwAnswerInput1Props> = ({ index, survey, inputAttr, optionIndex }) => {
  const [inputAnswer, setInputAnswer] = useState<any>(undefined);

  const loadInputAnswer = () => {
    const quType = survey.questions[index].quType;
    if (quType === 'FILLBLANK') {
      try {
        if (survey.questions[index].hasOwnProperty('answer') && survey.questions[index].answer !== undefined) {
          const answer = survey.questions[index].answer;
          if (/^-?\d+(\.\d+)?$/.test(answer)) {
            setInputAnswer(survey.questions[index].answer);
          } else {
            setInputAnswer(JSON.parse(survey.questions[index].answer));
          }
        }
      } catch (e) {
        if (survey.questions[index].hasOwnProperty('answer') && survey.questions[index].answer !== undefined) {
          setInputAnswer(survey.questions[index].answer);
        }
      }
    } else if (quType === 'MULTIFILLBLANK') {
      try {
        if (survey.questions[index].quMultiFillblanks[optionIndex].hasOwnProperty('inputText') && 
            survey.questions[index].quMultiFillblanks[optionIndex].inputText !== undefined) {
          setInputAnswer(JSON.parse(survey.questions[index].quMultiFillblanks[optionIndex].inputText));
        }
      } catch (e) {
        if (survey.questions[index].quMultiFillblanks[optionIndex].hasOwnProperty('inputText') && 
            survey.questions[index].quMultiFillblanks[optionIndex].inputText !== undefined) {
          setInputAnswer(survey.questions[index].quMultiFillblanks[optionIndex].inputText);
        }
      }
    } else if (quType === 'RADIO') {
      try {
        if (survey.questions[index].quRadios[optionIndex].hasOwnProperty('otherText') && 
            survey.questions[index].quRadios[optionIndex].otherText !== undefined) {
          setInputAnswer(JSON.parse(survey.questions[index].quRadios[optionIndex].otherText));
        }
      } catch (e) {
        if (survey.questions[index].quRadios[optionIndex].hasOwnProperty('otherText') && 
            survey.questions[index].quRadios[optionIndex].otherText !== undefined) {
          setInputAnswer(survey.questions[index].quRadios[optionIndex].otherText);
        }
      }
    } else if (quType === 'CHECKBOX') {
      try {
        if (survey.questions[index].quCheckboxs[optionIndex].hasOwnProperty('otherText') && 
            survey.questions[index].quCheckboxs[optionIndex].otherText !== undefined) {
          setInputAnswer(JSON.parse(survey.questions[index].quCheckboxs[optionIndex].otherText));
        }
      } catch (e) {
        if (survey.questions[index].quCheckboxs[optionIndex].hasOwnProperty('otherText') && 
            survey.questions[index].quCheckboxs[optionIndex].otherText !== undefined) {
          setInputAnswer(survey.questions[index].quCheckboxs[optionIndex].otherText);
        }
      }
    } else if (quType === 'ORDERQU') {
      try {
        if (survey.questions[index].quOrderbys[optionIndex].hasOwnProperty('otherText') && 
            survey.questions[index].quOrderbys[optionIndex].otherText !== undefined) {
          setInputAnswer(JSON.parse(survey.questions[index].quOrderbys[optionIndex].otherText));
        }
      } catch (e) {
        if (survey.questions[index].quOrderbys[optionIndex].hasOwnProperty('otherText') && 
            survey.questions[index].quOrderbys[optionIndex].otherText !== undefined) {
          setInputAnswer(survey.questions[index].quOrderbys[optionIndex].otherText);
        }
      }
    }
  };

  useEffect(() => {
    loadInputAnswer();
  }, [survey.watchEvent]);

  const onBlur = (value: any) => {
    const quType = survey.questions[index].quType;
    if (quType === 'FILLBLANK') {
      survey.questions[index].answer = value;
    } else if (quType === 'MULTIFILLBLANK') {
      survey.questions[index].quMultiFillblanks[optionIndex].inputText = value;
    } else if (quType === 'RADIO') {
      survey.questions[index].quRadios[optionIndex].otherText = value;
    } else if (quType === 'CHECKBOX') {
      survey.questions[index].quCheckboxs[optionIndex].otherText = value;
    }
    answerQuEventCommonExt(survey, index, true);
  };

  const renderTimeInput = () => {
    if (inputAttr.dateTimeAttr.dateFormat === 7) {
      if (inputAttr.dateTimeAttr.attrs.includes('range')) {
        return (
          <div>
            <TimePicker.RangePicker
              value={inputAnswer}
              onChange={(value) => {
                setInputAnswer(value);
                onBlur(value);
              }}
              disabled={survey.readonly}
              format={inputAttr.dateTimeAttr.dateFormat === 5 ? 'HH:mm:ss' : 'HH:mm'}
              placeholder={['起始时间', '结束时间']}
            />
          </div>
        );
      } else {
        return (
          <TimePicker
            value={inputAnswer}
            onChange={(value) => {
              setInputAnswer(value);
              onBlur(value);
            }}
            disabled={survey.readonly}
            format={inputAttr.dateTimeAttr.dateFormat === 5 ? 'HH:mm:ss' : 'HH:mm'}
            placeholder="请选择时间"
          />
        );
      }
    } else {
      if (inputAttr.dateTimeAttr.attrs.includes('range')) {
        return (
          <TimePicker.RangePicker
            value={inputAnswer}
            onChange={(value) => {
              setInputAnswer(value);
              onBlur(value);
            }}
            disabled={survey.readonly}
            format={inputAttr.dateTimeAttr.dateFormat === 5 ? 'HH:mm:ss' : 'HH:mm'}
            placeholder={['开始时间', '结束时间']}
          />
        );
      } else {
        return (
          <TimePicker
            value={inputAnswer}
            onChange={(value) => {
              setInputAnswer(value);
              onBlur(value);
            }}
            disabled={survey.readonly}
            format={inputAttr.dateTimeAttr.dateFormat === 5 ? 'HH:mm:ss' : 'HH:mm'}
            placeholder={inputAttr.commonAttr.placeholder}
          />
        );
      }
    }
  };

  const renderDateInput = () => {
    if (inputAttr.dateTimeAttr.attrs.includes('range')) {
      if (inputAttr.dateTimeAttr.dateFormat === 3) {
        return (
          <DatePicker.RangePicker
            value={inputAnswer}
            onChange={(value) => {
              setInputAnswer(value);
              onBlur(value);
            }}
            disabled={survey.readonly}
            placeholder={['开始日期', '结束日期']}
          />
        );
      } else if (inputAttr.dateTimeAttr.dateFormat === 2) {
        return (
          <DatePicker.RangePicker
            value={inputAnswer}
            onChange={(value) => {
              setInputAnswer(value);
              onBlur(value);
            }}
            disabled={survey.readonly}
            picker="month"
            placeholder={['开始月份', '结束月份']}
          />
        );
      } else if (inputAttr.dateTimeAttr.dateFormat === 1) {
        return (
          <DatePicker
            value={inputAnswer}
            onChange={(value) => {
              setInputAnswer(value);
              onBlur(value);
            }}
            disabled={survey.readonly}
            placeholder="选择日期"
          />
        );
      }
    } else {
      if (inputAttr.dateTimeAttr.dateFormat === 3) {
        return (
          <DatePicker
            value={inputAnswer}
            onChange={(value) => {
              setInputAnswer(value);
              onBlur(value);
            }}
            disabled={survey.readonly}
            picker={inputAttr.dateTimeAttr.attrs.includes('more') ? 'date' : 'date'}
            placeholder="选择日期"
          />
        );
      } else if (inputAttr.dateTimeAttr.dateFormat === 2) {
        return (
          <DatePicker
            value={inputAnswer}
            onChange={(value) => {
              setInputAnswer(value);
              onBlur(value);
            }}
            disabled={survey.readonly}
            picker={inputAttr.dateTimeAttr.attrs.includes('more') ? 'month' : 'month'}
            placeholder="选择月"
          />
        );
      } else if (inputAttr.dateTimeAttr.dateFormat === 1) {
        return (
          <DatePicker
            value={inputAnswer}
            onChange={(value) => {
              setInputAnswer(value);
              onBlur(value);
            }}
            disabled={survey.readonly}
            picker={inputAttr.dateTimeAttr.attrs.includes('more') ? 'year' : 'year'}
            placeholder="选择年"
          />
        );
      }
    }
  };

  const renderDateTimeInput = () => {
    if (inputAttr.dateTimeAttr.attrs.includes('range')) {
      return (
        <DatePicker.RangePicker
          value={inputAnswer}
          onChange={(value) => {
            setInputAnswer(value);
            onBlur(value);
          }}
          disabled={survey.readonly}
          showTime
          placeholder={['开始日期', '结束日期']}
        />
      );
    } else {
      return (
        <DatePicker
          value={inputAnswer}
          onChange={(value) => {
            setInputAnswer(value);
            onBlur(value);
          }}
          disabled={survey.readonly}
          showTime
          placeholder="选择日期"
        />
      );
    }
  };

  const renderInput = () => {
    switch (inputAttr.commonAttr.checkType) {
      case 'TIME':
        return renderTimeInput();
      case 'DATE':
        return renderDateInput();
      case 'DATETIME':
        return renderDateTimeInput();
      case 'NUM':
      case 'DIGITS':
        return (
          <Input
            value={inputAnswer}
            onChange={(e) => {
              setInputAnswer(e.target.value);
              onBlur(e.target.value);
            }}
            disabled={survey.readonly}
            placeholder={inputAttr.commonAttr.placeholder}
          />
        );
      default:
        if (inputAttr.commonAttr.inputRow > 1) {
          return (
            <Input.TextArea
              value={inputAnswer}
              onChange={(e) => {
                setInputAnswer(e.target.value);
                onBlur(e.target.value);
              }}
              disabled={survey.readonly}
              placeholder={inputAttr.commonAttr.placeholder}
              autoSize={{ minRows: inputAttr.commonAttr.inputRow }}
              maxLength={inputAttr.commonAttr.maxlength}
              showCount
            />
          );
        } else {
          return (
            <Input
              value={inputAnswer}
              onChange={(e) => {
                setInputAnswer(e.target.value);
                onBlur(e.target.value);
              }}
              disabled={survey.readonly}
              placeholder={inputAttr.commonAttr.placeholder}
              maxLength={inputAttr.commonAttr.maxlength}
              showCount
            />
          );
        }
    }
  };

  return (
    <div style={{ padding: 0, marginBottom: 5 }} className="dw-qu-item">
      {renderInput()}
    </div>
  );
};

export default DwAnswerInput1;
