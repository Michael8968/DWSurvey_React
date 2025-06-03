import React, { useState } from 'react';
import { Form, Radio, Select, InputNumber, Input } from 'antd';
import type { RadioChangeEvent } from 'antd';
import DwInputProps from '../DwInputProps';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

interface QuAttr {
  isRequired: boolean;
  showQuNote: boolean;
  inputAttr?: any;
}

interface OptionTitleObj {
  dwText: string;
}

interface Option {
  optionTitleObj: OptionTitleObj;
  showOptionNote: number;
  inputAttr?: any;
}

interface Question {
  quType: string;
  quAttr: QuAttr;
  hv: number;
  cellCount: number;
  minLimit: number;
  maxLimit: number;
  paramInt01: number;
  paramInt02: number;
  fileAccept: number;
  customFileAccept: string;
  fileLimit: number;
  fileSize: number;
  quRadios?: Option[];
  quCheckboxs?: Option[];
  quMultiFillblanks?: Option[];
}

interface Survey {
  questions: Question[];
}

interface Props {
  index: number;
  survey: Survey;
  popoverTitle?: string;
  onChange: (survey: Survey) => void;
}

const DwQuAttrs: React.FC<Props> = ({
  index,
  survey,
  popoverTitle = '题目属性',
  onChange,
}) => {
  const [selectOptionIndex, setSelectOptionIndex] = useState(0);
  const question = survey.questions[index];

  const handleChange = (updateFn: (survey: Survey) => void) => {
    const newSurvey = { ...survey };
    updateFn(newSurvey);
    onChange(newSurvey);
  };

  const renderRadioCheckboxAttrs = () => {
    const options = question.quType === 'RADIO' ? question.quRadios : question.quCheckboxs;
    const selectedOption = options?.[selectOptionIndex];

    return (
      <>
        <FormItem label="显示风格">
          <Select
            value={question.hv}
            placeholder="请选择显示风格"
            style={{ marginRight: 10 }}
            onChange={(val: number) => handleChange(survey => {
              survey.questions[index].hv = val;
            })}
          >
            <Option value={1}>横向</Option>
            <Option value={2}>竖向</Option>
            <Option value={4}>下拉</Option>
          </Select>
        </FormItem>
        {question.hv === 1 && (
          <FormItem label="每行显示">
            <span>
              <InputNumber
                value={question.cellCount}
                style={{ marginRight: 10 }}
                onChange={(val: number | null) => handleChange(survey => {
                  if (val !== null) {
                    survey.questions[index].cellCount = val;
                  }
                })}
              />
              列
            </span>
          </FormItem>
        )}
        {question.quType === 'CHECKBOX' && (
          <FormItem label="选择个数">
            <div>
              最少
              <InputNumber
                value={question.minLimit}
                style={{ marginRight: 10 }}
                onChange={(val: number | null) => handleChange(survey => {
                  if (val !== null) {
                    survey.questions[index].minLimit = val;
                  }
                })}
              />
            </div>
            <div>
              最多
              <InputNumber
                value={question.maxLimit}
                onChange={(val: number | null) => handleChange(survey => {
                  if (val !== null) {
                    survey.questions[index].maxLimit = val;
                  }
                })}
              />
            </div>
          </FormItem>
        )}
        <div style={{ border: '1px solid rgb(212 225 237)', borderRadius: 4, padding: 5 }}>
          <div style={{ padding: 10, color: 'gray' }}>选择属性设置</div>
          <div style={{ padding: '8px 0' }}>
            <FormItem label="配置选项" style={{ marginBottom: 0 }}>
              <Select
                value={selectOptionIndex}
                placeholder="请选择选项"
                onChange={(val: number) => setSelectOptionIndex(val)}
              >
                {options?.map((item, optionIndex) => (
                  <Option
                    key={`quOption_${optionIndex}`}
                    value={optionIndex}
                  >
                    {item.optionTitleObj.dwText}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </div>
          {selectedOption && (
            <div style={{ paddingTop: 8, paddingRight: 8 }}>
              <FormItem label="选项说明">
                <RadioGroup
                  value={selectedOption.showOptionNote}
                  onChange={(e: RadioChangeEvent) => handleChange(survey => {
                    if (question.quType === 'RADIO') {
                      survey.questions[index].quRadios![selectOptionIndex].showOptionNote = e.target.value;
                    } else {
                      survey.questions[index].quCheckboxs![selectOptionIndex].showOptionNote = e.target.value;
                    }
                  })}
                >
                  <Radio value={1}>显示</Radio>
                  <Radio value={0}>不显示</Radio>
                </RadioGroup>
              </FormItem>
              {selectedOption.showOptionNote === 1 && (
                <DwInputProps
                  value={selectedOption.inputAttr}
                  survey={survey}
                  index={index}
                  onChange={inputAttr => handleChange(survey => {
                    if (question.quType === 'RADIO') {
                      survey.questions[index].quRadios![selectOptionIndex].inputAttr = inputAttr;
                    } else {
                      survey.questions[index].quCheckboxs![selectOptionIndex].inputAttr = inputAttr;
                    }
                  })}
                />
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  const renderScoreAttrs = () => (
    <FormItem label="分值区间">
      从
      <InputNumber
        value={question.paramInt01}
        style={{ marginRight: 10 }}
        onChange={(val: number | null) => handleChange(survey => {
          if (val !== null) {
            survey.questions[index].paramInt01 = val;
          }
        })}
      />
      到
      <InputNumber
        value={question.paramInt02}
        onChange={(val: number | null) => handleChange(survey => {
          if (val !== null) {
            survey.questions[index].paramInt02 = val;
          }
        })}
      />
    </FormItem>
  );

  const renderMultiFillblankAttrs = () => {
    const selectedOption = question.quMultiFillblanks?.[selectOptionIndex];

    return (
      <>
        <FormItem label="最少回答">
          <InputNumber
            value={question.paramInt01}
            style={{ marginRight: 10 }}
            onChange={(val: number | null) => handleChange(survey => {
              if (val !== null) {
                survey.questions[index].paramInt01 = val;
              }
            })}
          />
          项
        </FormItem>
        <div style={{ border: '2px solid rgb(212 225 237)', borderRadius: 4 }}>
          <div style={{ background: 'rgb(212 225 237)', padding: '8px 0' }}>
            <FormItem label="选项属性" style={{ marginBottom: 0 }}>
              配置选项
              <Select
                value={selectOptionIndex}
                placeholder="请选择选项"
                onChange={(val: number) => setSelectOptionIndex(val)}
              >
                {question.quMultiFillblanks?.map((item, optionIndex) => (
                  <Option
                    key={`quMFbk${optionIndex}`}
                    value={optionIndex}
                  >
                    {item.optionTitleObj.dwText}
                  </Option>
                ))}
              </Select>
              的属性规则如下
            </FormItem>
          </div>
          {selectedOption && (
            <div style={{ paddingTop: 8, paddingRight: 8 }}>
              <DwInputProps
                value={selectedOption.inputAttr}
                survey={survey}
                index={index}
                onChange={inputAttr => handleChange(survey => {
                  survey.questions[index].quMultiFillblanks![selectOptionIndex].inputAttr = inputAttr;
                })}
              />
            </div>
          )}
        </div>
      </>
    );
  };

  const renderUploadFileAttrs = () => (
    <>
      <FormItem label="文件类型">
        <Select
          value={question.fileAccept}
          placeholder="请选择文件类型"
          style={{ width: 290 }}
          onChange={(val: number) => handleChange(survey => {
            survey.questions[index].fileAccept = val;
          })}
        >
          <Option value={0}>不限</Option>
          <Option value={1}>图片(.jpg,.jpeg,.png,.gif,.bmp)</Option>
          <Option value={2}>文档(.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx)</Option>
          <Option value={100}>自定义</Option>
        </Select>
        {question.fileAccept === 100 && (
          <Input
            value={question.customFileAccept}
            style={{ width: 160 }}
            onChange={(e) => handleChange(survey => {
              survey.questions[index].customFileAccept = e.target.value;
            })}
          />
        )}
      </FormItem>
      <FormItem label="文件参数">
        上传附件数
        <InputNumber
          value={question.fileLimit}
          style={{ marginRight: 15 }}
          onChange={(val: number | null) => handleChange(survey => {
            if (val !== null) {
              survey.questions[index].fileLimit = val;
            }
          })}
        />
        单个文件最大支持
        <InputNumber
          value={question.fileSize}
          onChange={(val: number | null) => handleChange(survey => {
            if (val !== null) {
              survey.questions[index].fileSize = val;
            }
          })}
        />
        M
        <div style={{ color: '#c0c4cc', fontSize: 12 }}>(空或0表示限制)</div>
      </FormItem>
    </>
  );

  return (
    <div>
      <div style={{ fontSize: 14, paddingBottom: 5 }}>
        <div className="dw-qu-item">
          <div style={{ fontWeight: 'bold' }}>{popoverTitle}</div>
          <div className="dw-display-flex-right" />
        </div>
      </div>
      <div style={{ padding: 5 }}>
        <div style={{ minHeight: 50 }}>
          <Form size="small">
            <FormItem label="是否必答">
              <RadioGroup
                value={question.quAttr.isRequired}
                onChange={(e: RadioChangeEvent) => handleChange(survey => {
                  survey.questions[index].quAttr.isRequired = e.target.value;
                })}
              >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="副标题">
              <RadioGroup
                value={question.quAttr.showQuNote}
                onChange={(e: RadioChangeEvent) => handleChange(survey => {
                  survey.questions[index].quAttr.showQuNote = e.target.value;
                })}
              >
                <Radio value={true}>显示</Radio>
                <Radio value={false}>隐藏</Radio>
              </RadioGroup>
            </FormItem>
            {(question.quType === 'RADIO' || question.quType === 'CHECKBOX') && renderRadioCheckboxAttrs()}
            {question.quType === 'FILLBLANK' && (
              <DwInputProps
                value={question.quAttr.inputAttr}
                survey={survey}
                index={index}
                onChange={inputAttr => handleChange(survey => {
                  survey.questions[index].quAttr.inputAttr = inputAttr;
                })}
              />
            )}
            {question.quType === 'SCORE' && renderScoreAttrs()}
            {question.quType === 'MULTIFILLBLANK' && renderMultiFillblankAttrs()}
            {question.quType === 'UPLOADFILE' && renderUploadFileAttrs()}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DwQuAttrs; 