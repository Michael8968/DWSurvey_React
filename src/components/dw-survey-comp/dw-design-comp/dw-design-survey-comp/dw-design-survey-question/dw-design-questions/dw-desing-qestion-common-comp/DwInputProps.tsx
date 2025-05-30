import React, { useState } from 'react';
import { Form, FormItem, Radio, RadioGroup, Select, Option, Input, InputNumber, CheckboxGroup, Checkbox, TimePicker } from 'element-react';

interface CommonAttr {
  isRequired: number;
  checkType: string;
  placeholder: string;
  defaultValue: string;
  inputRow: number;
  minlength: number;
  maxlength: number;
}

interface DateTimeAttr {
  dateFormat: number;
  attrs: string[];
  timeRange: {
    range: [string, string];
    step: string;
  };
}

interface NumAttr {
  min: number;
  max: number;
  precision: number;
}

interface InputProp {
  commonAttr: CommonAttr;
  dateTimeAttr: DateTimeAttr;
  numAttr: NumAttr;
}

interface Question {
  quType: string;
}

interface Survey {
  questions: Question[];
}

interface Props {
  index: number;
  value: InputProp;
  survey: Survey;
  onChange: (inputProp: InputProp) => void;
}

const DwInputProps: React.FC<Props> = ({ index, value, survey, onChange }) => {
  const [checkType] = useState([
    { value: 'NO', label: '无验证' },
    { value: 'EMAIL', label: 'Email' },
    { value: 'NUM', label: '数字' },
    { value: 'DIGITS', label: '整数' },
    { value: 'TEL_PHONE', label: '手机或电话' },
    { value: 'TIME', label: '时间' },
    { value: 'DATE', label: '日期' },
    { value: 'DATETIME', label: '日期时间' },
    { value: 'ZIPCODE', label: '邮政编码' },
    { value: 'TEL', label: '电话号码' },
    { value: 'PHONE', label: '手机号码' },
    { value: 'IDENT_CODE', label: '身份证号' },
    { value: 'URL', label: '网址' },
    { value: 'UNSTRCN', label: '禁止中文' },
    { value: 'STRCN', label: '仅许中文' }
  ]);

  const changeCheckType = () => {
    const newValue = { ...value };
    const checkType = newValue.commonAttr.checkType;
    const dateFormat = newValue.dateTimeAttr.dateFormat;

    if (checkType === 'TIME' && dateFormat !== 5 && dateFormat !== 6) {
      newValue.dateTimeAttr.dateFormat = 5;
    } else if (checkType === 'DATE' && dateFormat !== 1 && dateFormat !== 2 && dateFormat !== 3) {
      newValue.dateTimeAttr.dateFormat = 3;
    } else if (checkType === 'DATETIME') {
      newValue.dateTimeAttr.dateFormat = 4;
    }

    onChange(newValue);
  };

  const changeDateAttrs = (val: string[]) => {
    const newValue = { ...value };
    if (val) {
      const temp = val.filter(item => item === 'more' || item === 'range');
      const newVal = val.filter(item => !(item === 'more' || item === 'range'));
      if (temp.length > 0) newVal.push(temp[temp.length - 1]);
      newValue.dateTimeAttr.attrs = newVal;
    }
    onChange(newValue);
  };

  const question = survey.questions[index];

  return (
    <Form labelWidth="80px" size="mini">
      {question.quType !== 'FILLBLANK' && (
        <FormItem label="是否必填">
          <RadioGroup value={value.commonAttr.isRequired} onChange={(val) => {
            const newValue = { ...value };
            newValue.commonAttr.isRequired = val;
            onChange(newValue);
          }}>
            <Radio label={1}>是</Radio>
            <Radio label={0}>否</Radio>
          </RadioGroup>
        </FormItem>
      )}

      <FormItem label="校验规则">
        <Select
          value={value.commonAttr.checkType}
          placeholder="请选择数据校验规则"
          onChange={(val) => {
            const newValue = { ...value };
            newValue.commonAttr.checkType = val;
            changeCheckType();
          }}
        >
          {checkType.map(item => (
            <Option key={item.value} label={item.label} value={item.value} />
          ))}
        </Select>

        {value.commonAttr.checkType === 'TIME' && (
          <Select
            value={value.dateTimeAttr.dateFormat}
            placeholder="日期格式"
            onChange={(val) => {
              const newValue = { ...value };
              newValue.dateTimeAttr.dateFormat = val;
              onChange(newValue);
            }}
          >
            <Option value={5} label="时分秒（HH:mm:ss）" />
            <Option value={6} label="时分（HH:mm）" />
            <Option value={7} label="时分下拉控件（HH:mm）" />
          </Select>
        )}

        {value.commonAttr.checkType === 'DATE' && (
          <Select
            value={value.dateTimeAttr.dateFormat}
            placeholder="日期格式"
            onChange={(val) => {
              const newValue = { ...value };
              newValue.dateTimeAttr.dateFormat = val;
              onChange(newValue);
            }}
          >
            <Option value={3} label="年月日（YYYY-MM-DD）" />
            <Option value={2} label="年月（YYYY-MM）" />
            <Option value={1} label="年（YYYY）" />
          </Select>
        )}

        {value.commonAttr.checkType === 'DATETIME' && (
          <Select
            value={value.dateTimeAttr.dateFormat}
            placeholder="日期格式"
            onChange={(val) => {
              const newValue = { ...value };
              newValue.dateTimeAttr.dateFormat = val;
              onChange(newValue);
            }}
          >
            <Option value={4} label="年月日时分秒（YYYY-MM-DD HH:mm:ss）" />
          </Select>
        )}
      </FormItem>

      <FormItem label="输入提示">
        <Input
          value={value.commonAttr.placeholder}
          onChange={(val) => {
            const newValue = { ...value };
            newValue.commonAttr.placeholder = val;
            onChange(newValue);
          }}
        />
      </FormItem>

      <FormItem label="默认内容">
        <Input
          value={value.commonAttr.defaultValue}
          onChange={(val) => {
            const newValue = { ...value };
            newValue.commonAttr.defaultValue = val;
            onChange(newValue);
          }}
        />
      </FormItem>

      <FormItem label="显示行数">
        <InputNumber
          value={value.commonAttr.inputRow}
          min={1}
          onChange={(val) => {
            const newValue = { ...value };
            newValue.commonAttr.inputRow = val;
            onChange(newValue);
          }}
        />
        &nbsp;行
      </FormItem>

      {(value.commonAttr.checkType === 'TIME' || value.commonAttr.checkType === 'DATE' || value.commonAttr.checkType === 'DATETIME') && (
        <FormItem label="属性配置">
          <CheckboxGroup
            value={value.dateTimeAttr.attrs}
            onChange={changeDateAttrs}
          >
            {value.commonAttr.checkType === 'DATE' && (
              <Checkbox label="more">可选择多个日期</Checkbox>
            )}
            {value.dateTimeAttr.dateFormat !== 1 && (
              <Checkbox label="range">使用范围选择器</Checkbox>
            )}
          </CheckboxGroup>
        </FormItem>
      )}

      {((value.commonAttr.checkType === 'TIME' && value.dateTimeAttr.dateFormat === 7) ||
        (value.commonAttr.checkType === 'TIME' && value.dateTimeAttr.dateFormat !== 7 && !value.dateTimeAttr.attrs.includes('range'))) && (
        <FormItem label="时间限制">
          {(value.dateTimeAttr.dateFormat === 7 || (value.dateTimeAttr.dateFormat !== 7 && !value.dateTimeAttr.attrs.includes('range'))) && (
            <TimePicker
              value={value.dateTimeAttr.timeRange.range}
              format="HH:mm"
              valueFormat="HH:mm"
              isRange
              style={{ marginRight: '10px', width: '200px' }}
              onChange={(val) => {
                const newValue = { ...value };
                newValue.dateTimeAttr.timeRange.range = val;
                onChange(newValue);
              }}
            />
          )}
          {value.dateTimeAttr.dateFormat === 7 && (
            <span>
              步长
              <TimePicker
                value={value.dateTimeAttr.timeRange.step}
                format="HH:mm"
                valueFormat="HH:mm"
                style={{ width: '100px' }}
                onChange={(val) => {
                  const newValue = { ...value };
                  newValue.dateTimeAttr.timeRange.step = val;
                  onChange(newValue);
                }}
              />
            </span>
          )}
        </FormItem>
      )}

      {(value.commonAttr.checkType === 'NUM' || value.commonAttr.checkType === 'DIGITS') && (
        <FormItem label="数据范围">
          <span>
            <div>
              最小值
              <InputNumber
                value={value.numAttr.min}
                style={{ marginRight: '10px' }}
                onChange={(val) => {
                  const newValue = { ...value };
                  newValue.numAttr.min = val;
                  onChange(newValue);
                }}
              />
            </div>
            <div>
              最大值
              <InputNumber
                value={value.numAttr.max}
                onChange={(val) => {
                  const newValue = { ...value };
                  newValue.numAttr.max = val;
                  onChange(newValue);
                }}
              />
            </div>
          </span>
        </FormItem>
      )}

      {value.commonAttr.checkType === 'NUM' && (
        <FormItem label="保留精度" style={{ display: 'none' }}>
          <InputNumber
            value={value.numAttr.precision}
            onChange={(val) => {
              const newValue = { ...value };
              newValue.numAttr.precision = val;
              onChange(newValue);
            }}
          />
          &nbsp;位
        </FormItem>
      )}

      {value.commonAttr.checkType !== 'NUM' &&
        value.commonAttr.checkType !== 'DIGITS' &&
        value.commonAttr.checkType !== 'TIME' &&
        value.commonAttr.checkType !== 'DATE' &&
        value.commonAttr.checkType !== 'DATETIME' && (
          <FormItem label="数据范围">
            <div>
              最少字数
              <InputNumber
                value={value.commonAttr.minlength}
                style={{ marginRight: '10px' }}
                onChange={(val) => {
                  const newValue = { ...value };
                  newValue.commonAttr.minlength = val;
                  onChange(newValue);
                }}
              />
            </div>
            <div>
              最大字数
              <InputNumber
                value={value.commonAttr.maxlength}
                onChange={(val) => {
                  const newValue = { ...value };
                  newValue.commonAttr.maxlength = val;
                  onChange(newValue);
                }}
              />
            </div>
          </FormItem>
        )}
    </Form>
  );
};

export default DwInputProps; 