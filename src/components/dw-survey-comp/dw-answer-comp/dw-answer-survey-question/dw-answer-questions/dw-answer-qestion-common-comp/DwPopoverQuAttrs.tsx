import React, { useState } from 'react';
import { Popover, Form, Radio, Select, InputNumber, Space } from 'antd';
import { clickItem, upAllItemClick } from '../../../../dw-utils/dw-survey-update-item-click';
import DwInputAttrs from './DwInputAttrs';

interface DwPopoverQuAttrsProps {
  index: number;
  survey: any;
  popoverTitle?: string;
  onUpdateSurvey?: (survey: any) => void;
  onClickItem?: () => void;
  children?: React.ReactNode;
}

const DwPopoverQuAttrs: React.FC<DwPopoverQuAttrsProps> = ({
  index,
  survey,
  popoverTitle = '题目属性',
  onUpdateSurvey,
  onClickItem,
  children
}) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [tempForm, setTempForm] = useState({
    selectOptionIndex: 0
  });

  const clickShowPopoverEvent = () => {
    onClickItem?.();
    const parentItemIndex = survey.questions[index].itemIndex;
    clickItem(survey, itemIndex, (newSurvey: any, newItemIndex: number) => {
      onUpdateSurvey?.(newSurvey);
      setItemIndex(newItemIndex);
    });
    upAllItemClick(survey, [itemIndex, parentItemIndex], (newSurvey: any) => {
      onUpdateSurvey?.(newSurvey);
    });
  };

  const cancelAddOptionEvent = () => {
    upAllItemClick(survey, [], (newSurvey: any) => {
      onUpdateSurvey?.(newSurvey);
    });
    setVisible(false);
  };

  const renderQuestionTypeSpecificFields = () => {
    const question = survey.questions[index];
    const quType = question.quType;

    if (quType === 'RADIO' || quType === 'CHECKBOX') {
      return (
        <Form.Item label="显示风格">
          <Space>
            <Select
              value={question.hv}
              onChange={(value) => {
                question.hv = value;
                onUpdateSurvey?.({ ...survey });
              }}
              style={{ width: 120 }}
            >
              <Select.Option value={1}>横向</Select.Option>
              <Select.Option value={2}>竖向</Select.Option>
              <Select.Option value={4}>下拉</Select.Option>
            </Select>
            {question.hv === 1 && (
              <span>
                每行显示列数
                <InputNumber
                  value={question.cellCount}
                  onChange={(value) => {
                    question.cellCount = value;
                    onUpdateSurvey?.({ ...survey });
                  }}
                  style={{ marginLeft: 8 }}
                />
              </span>
            )}
          </Space>
        </Form.Item>
      );
    }

    if (quType === 'CHECKBOX') {
      return (
        <Form.Item label="选择个数">
          <Space>
            最少
            <InputNumber
              value={question.paramInt01}
              onChange={(value) => {
                question.paramInt01 = value;
                onUpdateSurvey?.({ ...survey });
              }}
            />
            最多
            <InputNumber
              value={question.paramInt02}
              onChange={(value) => {
                question.paramInt02 = value;
                onUpdateSurvey?.({ ...survey });
              }}
            />
          </Space>
        </Form.Item>
      );
    }

    if (quType === 'FILLBLANK') {
      return <DwInputAttrs index={index} inputProp={question} onInputPropChange={(value) => {
        Object.assign(question, value);
        onUpdateSurvey?.({ ...survey });
      }} />;
    }

    if (quType === 'SCORE') {
      return (
        <Form.Item label="分值区间">
          <Space>
            从
            <InputNumber
              value={question.paramInt01}
              onChange={(value) => {
                question.paramInt01 = value;
                onUpdateSurvey?.({ ...survey });
              }}
            />
            到
            <InputNumber
              value={question.paramInt02}
              onChange={(value) => {
                question.paramInt02 = value;
                onUpdateSurvey?.({ ...survey });
              }}
            />
          </Space>
        </Form.Item>
      );
    }

    if (quType === 'MULTIFILLBLANK') {
      return (
        <>
          <Form.Item label="最少回答">
            <Space>
              <InputNumber
                value={question.paramInt01}
                onChange={(value) => {
                  question.paramInt01 = value;
                  onUpdateSurvey?.({ ...survey });
                }}
              />
              项
            </Space>
          </Form.Item>
          <div style={{ border: '1px solid #eee', borderRadius: 4 }}>
            <div style={{ background: '#f1f1f1', padding: '8px 0' }}>
              <Form.Item label="选项属性" style={{ marginBottom: 0 }}>
                <Space>
                  配置选项
                  <Select
                    value={tempForm.selectOptionIndex}
                    onChange={(value) => setTempForm({ ...tempForm, selectOptionIndex: value })}
                    style={{ width: 200 }}
                  >
                    {question.quMultiFillblanks.map((item: any, optionIndex: number) => (
                      <Select.Option key={`quMFbk${optionIndex}`} value={optionIndex}>
                        {item.optionTitleObj.dwText}
                      </Select.Option>
                    ))}
                  </Select>
                  的属性规则如下
                </Space>
              </Form.Item>
            </div>
            <div style={{ padding: '8px 8px 0 0' }}>
              <Form.Item label="是否必填">
                <Radio.Group
                  value={question.quMultiFillblanks[tempForm.selectOptionIndex].isRequired}
                  onChange={(e) => {
                    question.quMultiFillblanks[tempForm.selectOptionIndex].isRequired = e.target.value;
                    onUpdateSurvey?.({ ...survey });
                  }}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <DwInputAttrs
                index={index}
                inputProp={question.quMultiFillblanks[tempForm.selectOptionIndex]}
                onInputPropChange={(value) => {
                  Object.assign(question.quMultiFillblanks[tempForm.selectOptionIndex], value);
                  onUpdateSurvey?.({ ...survey });
                }}
              />
            </div>
          </div>
        </>
      );
    }

    if (quType === 'UPLOADFILE') {
      return (
        <>
          <Form.Item label="文件类型">
            <Select
              value={question.paramInt01}
              onChange={(value) => {
                question.paramInt01 = value;
                onUpdateSurvey?.({ ...survey });
              }}
              style={{ width: 290 }}
            >
              <Select.Option value={7}>自限</Select.Option>
              <Select.Option value={5}>图片</Select.Option>
              <Select.Option value={6}>文档</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="文件参数">
            <Space>
              上传附件数
              <InputNumber
                value={question.randOrder}
                onChange={(value) => {
                  question.randOrder = value;
                  onUpdateSurvey?.({ ...survey });
                }}
              />
              单个文件最大支持
              <InputNumber
                value={question.paramInt02}
                onChange={(value) => {
                  question.paramInt02 = value;
                  onUpdateSurvey?.({ ...survey });
                }}
              />
              M
              <span style={{ color: '#c0c4cc', fontSize: 12 }}>(空或0表示限制)</span>
            </Space>
          </Form.Item>
        </>
      );
    }

    return null;
  };

  return (
    <Popover
      open={visible}
      placement="bottomLeft"
      title={popoverTitle}
      content={
        <div style={{ padding: 5 }}>
          <div style={{ minHeight: 50 }}>
            <Form size="small" labelCol={{ span: 8 }}>
              <Form.Item label="是否必答">
                <Radio.Group
                  value={survey.questions[index].isRequired}
                  onChange={(e) => {
                    survey.questions[index].isRequired = e.target.value;
                    onUpdateSurvey?.({ ...survey });
                  }}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              {renderQuestionTypeSpecificFields()}
            </Form>
          </div>
        </div>
      }
      trigger="click"
      onOpenChange={setVisible}
    >
      <div onClick={(e) => {
        e.stopPropagation();
        clickShowPopoverEvent();
        setVisible(true);
      }}>
        {children}
      </div>
    </Popover>
  );
};

export default DwPopoverQuAttrs; 