import React, { useState, useEffect } from 'react';
import { Select, Input } from 'antd';
import { answerQuEventCommon } from '../../../dw-utils/dw-survey-answer-common';
import '../../../../../../assets/css/dw-answer.css';

const { Option } = Select;
const { TextArea } = Input;

interface DwQuOptionCommon4Props {
  index: number;
  options: Array<{
    optionTitleObj: {
      dwHtml: string;
    };
    checked: boolean;
    showOptionNote: boolean;
    otherText: string;
    inputAttr: {
      commonAttr: {
        inputRow: number;
        placeholder: string;
      };
    };
  }>;
  survey: {
    readonly: boolean;
    questions: Array<{
      quType: string;
      quRadios: any[];
      quCheckboxs: any[];
      minLimit: number;
      maxLimit: number;
    }>;
  };
  quType: string;
}

const DwQuOptionCommon4: React.FC<DwQuOptionCommon4Props> = ({
  index,
  options,
  survey,
  quType,
}) => {
  const [value, setValue] = useState<string | string[]>(quType === 'CHECKBOX' ? [] : '');
  const [maxLimit, setMaxLimit] = useState(0);

  useEffect(() => {
    const question = survey.questions[index];
    if (question.quType === 'RADIO') {
      const quOptions = survey.questions[index].quRadios;
      quOptions.forEach((quOption) => {
        if (quOption.checked) setValue(quOption.optionTitleObj.dwHtml);
      });
    }
    if (question.quType === 'CHECKBOX') {
      setMaxLimit(question.maxLimit);
      const quOptions = survey.questions[index].quCheckboxs;
      const selectedValues: string[] = [];
      quOptions.forEach((quOption) => {
        if (quOption.checked) selectedValues.push(quOption.optionTitleObj.dwHtml);
      });
      setValue(selectedValues);
    }
  }, [survey, index, quType]);

  const handleChange = (values: string | string[]) => {
    console.debug('onChange', values);
    console.debug('onChange Value', value);
    resetOptionChecked();
    const questionType = survey.questions[index].quType;
    if (questionType === 'RADIO') {
      const quOptions = survey.questions[index].quRadios;
      checkQuOptions(quOptions, [values as string]);
    } else if (questionType === 'CHECKBOX') {
      const quOptions = survey.questions[index].quCheckboxs;
      checkQuOptions(quOptions, values as string[]);
    }
    setValue(values);
    answerQuEventCommon(survey, index);
  };

  const checkQuOptions = (quOptions: any[], changeValue: string[]) => {
    quOptions.forEach((quOption) => {
      changeValue.forEach((valueItem) => {
        if (quOption.optionTitleObj.dwHtml === valueItem) {
          quOption.checked = true;
          return false;
        }
      });
    });
  };

  const resetOptionChecked = () => {
    const questionType = survey.questions[index].quType;
    if (questionType === 'RADIO') {
      const quRadios = survey.questions[index].quRadios;
      quRadios.forEach((item) => {
        item.checked = false;
      });
    } else if (questionType === 'CHECKBOX') {
      const quCheckboxs = survey.questions[index].quCheckboxs;
      quCheckboxs.forEach((item) => {
        item.checked = false;
      });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '5px' }}>
        <Select
          value={value}
          disabled={survey.readonly}
          mode={quType === 'CHECKBOX' ? 'multiple' : undefined}
          maxTagCount={maxLimit}
          style={{ width: '100%' }}
          placeholder="请选择"
          onChange={handleChange}
          popupClassName="dw-answer-custom-theme"
        >
          {options.map((item, optionIndex) => (
            <Option
              key={`fa_${optionIndex}`}
              value={item.optionTitleObj.dwHtml}
            >
              {item.optionTitleObj.dwHtml}
            </Option>
          ))}
        </Select>
        {options.map((item, optionIndex) => (
          <div key={`quOption4-${index}-${optionIndex}`}>
            {item.checked && (quType === 'RADIO' || quType === 'CHECKBOX') && item.showOptionNote && (
              <div style={{ padding: '10px 0' }}>
                {item.inputAttr.commonAttr.inputRow > 1 ? (
                  <TextArea
                    value={item.otherText}
                    placeholder={item.inputAttr.commonAttr.placeholder}
                    autoSize={{ minRows: item.inputAttr.commonAttr.inputRow }}
                  />
                ) : (
                  <Input
                    value={item.otherText}
                    placeholder={item.inputAttr.commonAttr.placeholder}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DwQuOptionCommon4;