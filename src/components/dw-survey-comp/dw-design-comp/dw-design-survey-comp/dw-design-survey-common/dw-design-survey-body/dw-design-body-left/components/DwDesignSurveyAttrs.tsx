import React from 'react';
import { Form, Checkbox, InputNumber, Input, Select, DatePicker } from 'antd';
import moment from 'moment';

interface SurveyAttrs {
  opoqAttr: {
    enabled: boolean;
  };
  anBroAttr: {
    enabled: boolean;
    anNum: number;
  };
  anIpAttr: {
    enabled: boolean;
    anNum: number;
  };
  anRefreshAttr: {
    randomCode: boolean;
  };
  anPwdAttr: {
    enabled: boolean;
    anPwdCode: string;
  };
  scoreAttr: {
    enabled: boolean;
    showSumScore: {
      enabled: boolean;
      showContent: 'sum' | 'sumAfterDetail' | 'sumAndDetail';
    };
  };
  anEndNumAttr: {
    enabled: boolean;
    endNum: number;
  };
  anStartTimeAttr: {
    enabled: boolean;
    startTime: string;
  };
  anEndTimeAttr: {
    enabled: boolean;
    endTime: string;
  };
}

interface Survey {
  surveyAttrs: SurveyAttrs;
  [key: string]: any;
}

interface Props {
  survey: Survey;
}

const DwDesignSurveyAttrs: React.FC<Props> = ({ survey }) => {
  return (
    <Form size="small">
      <div>
        <div>
          <Form.Item>
            <Checkbox
              checked={survey.surveyAttrs.opoqAttr.enabled}
              onChange={(e) => (survey.surveyAttrs.opoqAttr.enabled = e.target.checked)}
            >
              一页一题
            </Checkbox>
          </Form.Item>
        </div>
        <div className="dw-title-attr">回答限制</div>
        <div style={{ paddingLeft: '10px' }}>
          <Form.Item>
            <Checkbox
              checked={survey.surveyAttrs.anBroAttr.enabled}
              onChange={(e) => (survey.surveyAttrs.anBroAttr.enabled = e.target.checked)}
            >
              启用浏览器终端回答限制
            </Checkbox>
            {survey.surveyAttrs.anBroAttr.enabled && (
              <div style={{ fontSize: '12px' }}>
                每个浏览器可回答次数
                <InputNumber
                  value={survey.surveyAttrs.anBroAttr.anNum}
                  onChange={(value) => (survey.surveyAttrs.anBroAttr.anNum = value || 1)}
                  min={1}
                  max={100000}
                  size="small"
                  style={{ width: '130px' }}
                />
                次
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={survey.surveyAttrs.anIpAttr.enabled}
              onChange={(e) => (survey.surveyAttrs.anIpAttr.enabled = e.target.checked)}
            >
              启用IP回答限制
            </Checkbox>
            {survey.surveyAttrs.anIpAttr.enabled && (
              <div style={{ fontSize: '12px' }}>
                每个IP可回答次数
                <InputNumber
                  value={survey.surveyAttrs.anIpAttr.anNum}
                  onChange={(value) => (survey.surveyAttrs.anIpAttr.anNum = value || 1)}
                  min={1}
                  max={100000}
                  size="small"
                  style={{ width: '130px' }}
                />
                次
              </div>
            )}
          </Form.Item>
          <Checkbox
            checked={survey.surveyAttrs.anRefreshAttr.randomCode}
            onChange={(e) => (survey.surveyAttrs.anRefreshAttr.randomCode = e.target.checked)}
          >
            重复回答启用验证码
          </Checkbox>
          <Form.Item>
            <Checkbox
              checked={survey.surveyAttrs.anPwdAttr.enabled}
              onChange={(e) => (survey.surveyAttrs.anPwdAttr.enabled = e.target.checked)}
            >
              启用通过密码答卷
            </Checkbox>
            {survey.surveyAttrs.anPwdAttr.enabled && (
              <Input
                value={survey.surveyAttrs.anPwdAttr.anPwdCode}
                onChange={(e) => (survey.surveyAttrs.anPwdAttr.anPwdCode = e.target.value)}
                size="small"
                placeholder="请输入密码"
                style={{ width: '160px' }}
              />
            )}
          </Form.Item>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div className="dw-title-attr">计分属性</div>
        <div style={{ paddingLeft: '10px' }}>
          <Form.Item>
            <Checkbox
              checked={survey.surveyAttrs.scoreAttr.enabled}
              onChange={(e) => (survey.surveyAttrs.scoreAttr.enabled = e.target.checked)}
            >
              打开计分功能
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={survey.surveyAttrs.scoreAttr.showSumScore.enabled}
              onChange={(e) => (survey.surveyAttrs.scoreAttr.showSumScore.enabled = e.target.checked)}
            >
              答卷结束显示总分
            </Checkbox>
            {survey.surveyAttrs.scoreAttr.showSumScore.enabled && (
              <Select
                value={survey.surveyAttrs.scoreAttr.showSumScore.showContent}
                onChange={(value) => (survey.surveyAttrs.scoreAttr.showSumScore.showContent = value)}
                style={{ width: '160px' }}
              >
                <Select.Option value="sum">仅显示总分</Select.Option>
                <Select.Option value="sumAfterDetail">先显示总分后显示详情</Select.Option>
                <Select.Option value="sumAndDetail">直接显示总分与详细</Select.Option>
              </Select>
            )}
          </Form.Item>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div className="dw-title-attr">开始结束</div>
        <div style={{ paddingLeft: '10px' }}>
          <Form.Item>
            <Checkbox
              checked={survey.surveyAttrs.anEndNumAttr.enabled}
              onChange={(e) => (survey.surveyAttrs.anEndNumAttr.enabled = e.target.checked)}
            >
              指定结束份数
            </Checkbox>
            {survey.surveyAttrs.anEndNumAttr.enabled && (
              <InputNumber
                value={survey.surveyAttrs.anEndNumAttr.endNum}
                onChange={(value) => (survey.surveyAttrs.anEndNumAttr.endNum = value || 1)}
                min={1}
                max={100000}
                size="small"
                style={{ width: '160px' }}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={survey.surveyAttrs.anStartTimeAttr.enabled}
              onChange={(e) => (survey.surveyAttrs.anStartTimeAttr.enabled = e.target.checked)}
            >
              指定开始时间
            </Checkbox>
            {survey.surveyAttrs.anStartTimeAttr.enabled && (
              <DatePicker
                value={survey.surveyAttrs.anStartTimeAttr.startTime ? moment(survey.surveyAttrs.anStartTimeAttr.startTime) : null}
                onChange={(date) => (survey.surveyAttrs.anStartTimeAttr.startTime = date?.format('YYYY-MM-DD HH:mm:ss') || '')}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择日期时间"
                style={{ width: '160px' }}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={survey.surveyAttrs.anEndTimeAttr.enabled}
              onChange={(e) => (survey.surveyAttrs.anEndTimeAttr.enabled = e.target.checked)}
            >
              指定结束时间
            </Checkbox>
            {survey.surveyAttrs.anEndTimeAttr.enabled && (
              <DatePicker
                value={survey.surveyAttrs.anEndTimeAttr.endTime ? moment(survey.surveyAttrs.anEndTimeAttr.endTime) : null}
                onChange={(date) => (survey.surveyAttrs.anEndTimeAttr.endTime = date?.format('YYYY-MM-DD HH:mm:ss') || '')}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择日期时间"
                style={{ width: '160px' }}
              />
            )}
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default DwDesignSurveyAttrs; 