import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Checkbox, Input, InputNumber, DatePicker, Button, message } from 'antd';
import type { Moment } from 'moment';
import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper';
import { dwSurveyInfo, dwSurveyUpdate } from '@/api/dw-survey';
import { useParams } from 'react-router-dom';

interface SurveyDetail {
  effective: boolean;
  effectiveIp: boolean;
  refresh: boolean;
  rule: boolean;
  ruleCode: string;
  ynEndNum: boolean;
  endNum: number;
  ynEndTime: boolean;
  endTime: string;
  dirId: string;
}

interface Survey {
  surveyDetail: SurveyDetail;
}

const DwSurveyAttr: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [survey, setSurvey] = useState<Survey>({
    surveyDetail: {
      effective: false,
      effectiveIp: false,
      refresh: false,
      rule: false,
      ruleCode: '',
      ynEndNum: false,
      endNum: 1,
      ynEndTime: false,
      endTime: '',
      dirId: ''
    }
  });

  useEffect(() => {
    getSurveyInfo();
  }, []);

  const getSurveyInfo = async () => {
    try {
      const response = await dwSurveyInfo(id);
      const resultData = response.data.data;
      setSurvey({
        surveyDetail: {
          ...resultData.surveyDetail,
          effective: resultData.surveyDetail.effective === 1,
          effectiveIp: resultData.surveyDetail.effectiveIp === 1,
          refresh: resultData.surveyDetail.refresh === 1,
          rule: resultData.surveyDetail.rule === 3,
          ynEndNum: resultData.surveyDetail.ynEndNum === 1,
          ynEndTime: resultData.surveyDetail.ynEndTime === 1
        }
      });
    } catch (error) {
      message.error('获取问卷信息失败');
    }
  };

  const onSubmit = async () => {
    try {
      const surveyDetail = survey.surveyDetail;
      const data = {
        dirId: surveyDetail.dirId,
        effective: surveyDetail.effective ? 1 : 0,
        effectiveIp: surveyDetail.effectiveIp ? 1 : 0,
        refresh: surveyDetail.refresh ? 1 : 0,
        rule: surveyDetail.rule ? 3 : 0,
        ynEndNum: surveyDetail.ynEndNum ? 1 : 0,
        ynEndTime: surveyDetail.ynEndTime ? 1 : 0,
        endNum: surveyDetail.endNum,
        endTime: surveyDetail.endTime,
        ruleCode: surveyDetail.ruleCode
      };

      const response = await dwSurveyUpdate(data);
      const result = response.data;
      if (result.resultCode === 200) {
        message.success('保存成功');
      } else {
        message.error(result.resultMsg);
      }
    } catch (error) {
      message.error('保存失败');
    }
  };

  const handleCheckboxChange = (field: keyof SurveyDetail) => (e: any) => {
    setSurvey(prev => ({
      surveyDetail: {
        ...prev.surveyDetail,
        [field]: e.target.checked
      }
    }));
  };

  const handleInputChange = (field: keyof SurveyDetail) => (value: any) => {
    setSurvey(prev => ({
      surveyDetail: {
        ...prev.surveyDetail,
        [field]: value
      }
    }));
  };

  return (
    <div>
      <DwSurveyDcsWrapper isSurveySet={true}>
        {() => (
          <div>
            <div className="dw-dcs-main-title">
              <h4>问卷属性设置</h4>
              <div className="dw-dcs-main-p">配置问卷答卷时的收集规则</div>
            </div>
            <div className="dw-dcs-main-content">
              <div style={{ padding: '0px 30px' }}>
                <Form form={form} layout="vertical">
                  <Row>
                    <Col span={12}>
                      <h5>回答限制</h5>
                      <div style={{ paddingLeft: 10 }}>
                        <Form.Item>
                          <Checkbox
                            checked={survey.surveyDetail.effective}
                            onChange={handleCheckboxChange('effective')}
                          >
                            每台电脑或手机只能答一次
                          </Checkbox>
                        </Form.Item>
                        <Form.Item>
                          <Checkbox
                            checked={survey.surveyDetail.effectiveIp}
                            onChange={handleCheckboxChange('effectiveIp')}
                          >
                            每个IP只能答一次
                          </Checkbox>
                        </Form.Item>
                        <Form.Item>
                          <Checkbox
                            checked={survey.surveyDetail.refresh}
                            onChange={handleCheckboxChange('refresh')}
                          >
                            有重复回答启用验证码
                          </Checkbox>
                        </Form.Item>
                        <Form.Item>
                          <Checkbox
                            checked={survey.surveyDetail.rule}
                            onChange={handleCheckboxChange('rule')}
                          >
                            启用访问密码，设置密码
                          </Checkbox>
                          <Input
                            value={survey.surveyDetail.ruleCode}
                            onChange={e => handleInputChange('ruleCode')(e.target.value)}
                            placeholder="请输入内容"
                            style={{ width: 160, marginLeft: 8 }}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={12}>
                      <h5>何时结束</h5>
                      <div style={{ paddingLeft: 10 }}>
                        <Form.Item>
                          <Checkbox
                            checked={survey.surveyDetail.ynEndNum}
                            onChange={handleCheckboxChange('ynEndNum')}
                          >
                            收集到
                            <InputNumber
                              min={1}
                              max={100000}
                              value={survey.surveyDetail.endNum}
                              onChange={value => handleInputChange('endNum')(value)}
                              style={{ margin: '0 8px' }}
                            />
                            份时结束
                          </Checkbox>
                        </Form.Item>
                        <Form.Item>
                          <Checkbox
                            checked={survey.surveyDetail.ynEndTime}
                            onChange={handleCheckboxChange('ynEndTime')}
                          >
                            时间到
                            <DatePicker
                              showTime
                              value={survey.surveyDetail.endTime ? moment(survey.surveyDetail.endTime) : null}
                              onChange={(date: Moment | null) => handleInputChange('endTime')(date?.format('YYYY-MM-DD HH:mm:ss'))}
                              style={{ margin: '0 8px' }}
                            />
                            时结束
                          </Checkbox>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button type="primary" onClick={onSubmit}>
                      保存修改
                    </Button>
                    <Button style={{ marginLeft: 8 }}>取消</Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        )}
      </DwSurveyDcsWrapper>
    </div>
  );
};

export default DwSurveyAttr; 