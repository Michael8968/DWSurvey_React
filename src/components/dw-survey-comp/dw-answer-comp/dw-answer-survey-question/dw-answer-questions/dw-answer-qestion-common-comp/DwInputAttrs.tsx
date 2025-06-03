import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  TimePicker,
  DatePicker
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker: TimeRangePicker } = TimePicker;
const CheckboxGroup = Checkbox.Group;

interface DwInputAttrsProps {
  index: number;
  inputProp: any;
  onInputPropChange: (inputProp: any) => void;
}

const DwInputAttrs: React.FC<DwInputAttrsProps> = ({ index, inputProp, onInputPropChange }) => {
  const checkType = [
    { value: 'NO', label: '无验证' },
    { value: 'EMAIL', label: 'Email' },
    { value: 'NUM', label: '数字' },
    { value: 'DIGITS', label: '整数' },
    { value: 'TELE_PHONE_NUM', label: '手机或电话' },
    { value: 'TIME', label: '时间' },
    { value: 'DATE', label: '日期' },
    { value: 'DATETIME', label: '日期时间' },
    { value: 'ZIPCODE', label: '邮政编码' },
    { value: 'TELENUM', label: '电话号码' },
    { value: 'PHONENUM', label: '手机号码' },
    { value: 'IDENTCODE', label: '身份证号' },
    { value: 'URL', label: '网址' },
    { value: 'UNSTRCN', label: '禁止中文' },
    { value: 'STRCN', label: '仅许中文' }
  ];

  const changeCheckType = (value: string) => {
    const newInputProp = { ...inputProp, checkType: value };
    
    if (value === 'TIME' && ![5, 6].includes(newInputProp.dateFormat)) {
      newInputProp.dateFormat = 5;
    } else if (value === 'DATE' && ![1, 2, 3].includes(newInputProp.dateFormat)) {
      newInputProp.dateFormat = 3;
    } else if (value === 'DATETIME') {
      newInputProp.dateFormat = 4;
    }
    
    onInputPropChange(newInputProp);
  };

  const changeDateAttrs = (checkedValues: string[]) => {
    const temp = checkedValues.filter(item => item === 'more' || item === 'range');
    const newVal = checkedValues.filter(item => !(item === 'more' || item === 'range'));
    
    if (temp.length > 0) {
      newVal.push(temp[temp.length - 1]);
    }
    
    onInputPropChange({
      ...inputProp,
      dateAttrs: newVal
    });
  };

  const handleChange = (key: string, value: any) => {
    onInputPropChange({
      ...inputProp,
      [key]: value
    });
  };

  const getTimeFormat = () => {
    return inputProp.dateFormat === 5 ? 'HH:mm:ss' : 'HH:mm';
  };

  return (
    <Form layout="horizontal" size="small" labelCol={{ span: 6 }}>
      <Form.Item label="行数">
        <InputNumber 
          value={inputProp.answerInputRow} 
          onChange={(value) => handleChange('answerInputRow', value)} 
        />
      </Form.Item>
      <Form.Item label="输入提示">
        <Input 
          value={inputProp.placeholder} 
          onChange={(e) => handleChange('placeholder', e.target.value)} 
        />
      </Form.Item>
      <Form.Item label="默认内容">
        <Input 
          value={inputProp.defaultText} 
          onChange={(e) => handleChange('defaultText', e.target.value)} 
        />
      </Form.Item>
      <Form.Item label="校验规则">
        <Select
          value={inputProp.checkType}
          onChange={changeCheckType}
          placeholder="请选择数据校验规则"
          style={{ width: '100%', marginBottom: 10 }}
        >
          {checkType.map(item => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        
        {(inputProp.checkType === 'NUM' || inputProp.checkType === 'DIGITS') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>从</span>
            <InputNumber 
              value={inputProp.min} 
              onChange={(value) => handleChange('min', value)} 
              style={{ marginRight: 10 }} 
            />
            <span>到</span>
            <InputNumber 
              value={inputProp.max} 
              onChange={(value) => handleChange('max', value)} 
            />
          </div>
        )}
        
        {inputProp.checkType === 'TIME' && (
          <Select
            value={inputProp.dateFormat}
            onChange={(value) => handleChange('dateFormat', value)}
            placeholder="日期格式"
            style={{ width: '100%' }}
          >
            <Option value={5}>时分秒（HH:mm:ss）</Option>
            <Option value={6}>时分（HH:mm）</Option>
            <Option value={7}>指定时间点（HH:mm）</Option>
          </Select>
        )}
        
        {inputProp.checkType === 'DATE' && (
          <Select
            value={inputProp.dateFormat}
            onChange={(value) => handleChange('dateFormat', value)}
            placeholder="日期格式"
            style={{ width: '100%' }}
          >
            <Option value={3}>年月日（YYYY-MM-DD）</Option>
            <Option value={2}>年月（YYYY-MM）</Option>
            <Option value={1}>年（YYYY）</Option>
          </Select>
        )}
        
        {inputProp.checkType === 'DATETIME' && (
          <Select
            value={inputProp.dateFormat}
            onChange={(value) => handleChange('dateFormat', value)}
            placeholder="日期格式"
            style={{ width: '100%' }}
          >
            <Option value={4}>年月日时分秒（YYYY-MM-DD HH:mm:ss）</Option>
            <Option value={8}>年月日时分（YYYY-MM-DD HH:mm）</Option>
          </Select>
        )}
      </Form.Item>
      
      {inputProp.checkType === 'TIME' && (
        <Form.Item label="时间范围">
          <TimeRangePicker
            value={inputProp.timeRange}
            onChange={(value) => handleChange('timeRange', value)}
            format={getTimeFormat()}
            style={{ width: '100%', marginBottom: 10 }}
          />
          {inputProp.dateFormat === 7 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>步长</span>
              <TimePicker
                value={inputProp.step}
                onChange={(value) => handleChange('step', value)}
                format="HH:mm"
                style={{ width: 100 }}
              />
            </div>
          )}
        </Form.Item>
      )}
      
      {(inputProp.checkType === 'TIME' || inputProp.checkType === 'DATE' || inputProp.checkType === 'DATETIME') && (
        <Form.Item label="属性配置">
          <CheckboxGroup
            value={inputProp.dateAttrs}
            onChange={changeDateAttrs}
          >
            <Checkbox value="show-now">显示当前日期时间</Checkbox>
            {inputProp.checkType === 'DATE' && (
              <Checkbox value="more">可选择多个日期</Checkbox>
            )}
            {inputProp.dateFormat !== 7 && inputProp.dateFormat !== 1 && (
              <Checkbox value="range">使用范围选择器</Checkbox>
            )}
          </CheckboxGroup>
        </Form.Item>
      )}
    </Form>
  );
};

export default DwInputAttrs;