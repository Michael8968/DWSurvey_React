import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Row, 
  Col, 
  Checkbox, 
  InputNumber, 
  Input, 
  DatePicker, 
  Select, 
  Button, 
  message 
} from 'antd';
import { useParams } from 'react-router-dom';
import DwSurveyDcsWrapperV6 from '@/components/common/DwSurveyDcsWrapperV6';
import { getDesignSurveyJsonBySurveyId } from '@/components/dw-survey-comp/dw-utils/dw-survey-common';
import { clearSurveyJson, getSurveyJsonSimple } from '@/components/dw-survey-comp/dw-utils/dw-survey-design';
import { clearSurveyAnswer } from '@/components/dw-survey-comp/dw-answer-comp/dw-utils/dw-survey-answer-clear';
import { dwSaveSurveyJson } from '@/components/dw-survey-comp/dw-design-comp/dw-design-survey-comp/api/dw-design-survey-api';

const { Option } = Select;

interface SurveyAttrs {
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
  anEndNumAttr: {
    enabled: boolean;
    endNum: number;
  };
  anEndTimeAttr: {
    enabled: boolean;
    endTime: string;
  };
  scoreAttr: {
    enabled: boolean;
    showSumScore: {
      enabled: boolean;
      showContent: 'sum' | 'sumAfterDetail' | 'sumAndDetail';
    };
  };
}

interface Survey {
  id: string;
  sid: string;
  surveyTypeSimpleName: string;
  surveyAttrs: SurveyAttrs;
}

const DwSurveyAttrSet: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [thSurvey, setThSurvey] = useState<Survey | null>(null);
  const { dwSurveyId } = useParams<{ dwSurveyId: string }>();

  useEffect(() => {
    loadSurvey();
  }, []);

  const loadSurvey = () => {
    const params = { surveyId: dwSurveyId };
    getDesignSurveyJsonBySurveyId(params, (survey: Survey) => {
      console.debug('design survey', survey);
      setThSurvey(survey);
      setLoading(false);
    });
  };

  const onSubmit = () => {
    saveSurveyFun(null);
  };

  const saveSurveyFun = (callback: (() => void) | null) => {
    if (!thSurvey) return;

    const surveyId = thSurvey.id;
    const sid = thSurvey.sid;
    // 清理无效数据
    clearSurveyJson(thSurvey);
    clearSurveyAnswer(thSurvey);
    console.debug('save this.survey', thSurvey);
    const surveyJsonText = JSON.stringify(thSurvey);
    const surveyJsonSimple = JSON.stringify(getSurveyJsonSimple(surveyJsonText));
    const data = { surveyId, sid, surveyJsonText, surveyJsonSimple };
    console.debug('surveyJson data', data);
    
    dwSaveSurveyJson(data).then((response) => {
      console.debug('dwSaveSurveyJson-response', response);
      const httpResult = response.data;
      if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
        message.success('保存成功！');
        if (callback) callback();
      } else {
        message.error('保存失败！');
      }
    });
  };

  return (
    <div>
      <DwSurveyDcsWrapperV6 isSurveySet={true}>
        {({ survey }) => (
          <div style={{ padding: '0 30px' }}>
            {loading ? (
              <div>加载中...</div>
            ) : thSurvey && (
              <>
                <div className="dw-dcs-main-title">
                  <h4>{survey.surveyTypeSimpleName}属性设置</h4>
                  <div className="dw-dcs-main-p">配置答卷时的收集规则</div>
                </div>
                <div className="dw-dcs-main-content">
                  <Form layout="vertical">
                    <Row>
                      <Col span={12}>
                        <h5>回答限制</h5>
                        <div style={{ paddingLeft: 10 }}>
                          <Form.Item>
                            <div>
                              <Checkbox 
                                checked={thSurvey.surveyAttrs.anBroAttr.enabled}
                                onChange={(e) => setThSurvey({
                                  ...thSurvey,
                                  surveyAttrs: {
                                    ...thSurvey.surveyAttrs,
                                    anBroAttr: {
                                      ...thSurvey.surveyAttrs.anBroAttr,
                                      enabled: e.target.checked
                                    }
                                  }
                                })}
                              >
                                启用浏览器终端回答限制
                              </Checkbox>
                            </div>
                            <div style={{ fontSize: 12 }}>
                              每个浏览器可回答次数 
                              <InputNumber
                                value={thSurvey.surveyAttrs.anBroAttr.anNum}
                                onChange={(value) => setThSurvey({
                                  ...thSurvey,
                                  surveyAttrs: {
                                    ...thSurvey.surveyAttrs,
                                    anBroAttr: {
                                      ...thSurvey.surveyAttrs.anBroAttr,
                                      anNum: value
                                    }
                                  }
                                })}
                                min={1}
                                max={100000}
                                size="small"
                                style={{ width: 130 }}
                              />
                              次
                            </div>
                          </Form.Item>
                          <Form.Item>
                            <div>
                              <Checkbox
                                checked={thSurvey.surveyAttrs.anIpAttr.enabled}
                                onChange={(e) => setThSurvey({
                                  ...thSurvey,
                                  surveyAttrs: {
                                    ...thSurvey.surveyAttrs,
                                    anIpAttr: {
                                      ...thSurvey.surveyAttrs.anIpAttr,
                                      enabled: e.target.checked
                                    }
                                  }
                                })}
                              >
                                启用IP回答限制
                              </Checkbox>
                            </div>
                            <div style={{ fontSize: 12 }}>
                              每个IP可回答次数
                              <InputNumber
                                value={thSurvey.surveyAttrs.anIpAttr.anNum}
                                onChange={(value) => setThSurvey({
                                  ...thSurvey,
                                  surveyAttrs: {
                                    ...thSurvey.surveyAttrs,
                                    anIpAttr: {
                                      ...thSurvey.surveyAttrs.anIpAttr,
                                      anNum: value
                                    }
                                  }
                                })}
                                min={1}
                                max={100000}
                                size="small"
                                style={{ width: 130 }}
                              />
                              次
                            </div>
                          </Form.Item>
                          <Form.Item>
                            <Checkbox
                              checked={thSurvey.surveyAttrs.anRefreshAttr.randomCode}
                              onChange={(e) => setThSurvey({
                                ...thSurvey,
                                surveyAttrs: {
                                  ...thSurvey.surveyAttrs,
                                  anRefreshAttr: {
                                    ...thSurvey.surveyAttrs.anRefreshAttr,
                                    randomCode: e.target.checked
                                  }
                                }
                              })}
                            >
                              重复回答启用验证码
                            </Checkbox>
                          </Form.Item>
                          <Form.Item>
                            <div>
                              <Checkbox
                                checked={thSurvey.surveyAttrs.anPwdAttr.enabled}
                                onChange={(e) => setThSurvey({
                                  ...thSurvey,
                                  surveyAttrs: {
                                    ...thSurvey.surveyAttrs,
                                    anPwdAttr: {
                                      ...thSurvey.surveyAttrs.anPwdAttr,
                                      enabled: e.target.checked
                                    }
                                  }
                                })}
                              >
                                启用通过密码答卷
                              </Checkbox>
                            </div>
                            <div>
                              <Input
                                value={thSurvey.surveyAttrs.anPwdAttr.anPwdCode}
                                onChange={(e) => setThSurvey({
                                  ...thSurvey,
                                  surveyAttrs: {
                                    ...thSurvey.surveyAttrs,
                                    anPwdAttr: {
                                      ...thSurvey.surveyAttrs.anPwdAttr,
                                      anPwdCode: e.target.value
                                    }
                                  }
                                })}
                                size="small"
                                placeholder="请输入密码"
                                style={{ width: 160 }}
                              />
                            </div>
                          </Form.Item>
                        </div>
                      </Col>
                      <Col span={12}>
                        <h5>何时结束</h5>
                        <div style={{ paddingLeft: 10 }}>
                          <Form.Item>
                            <Checkbox
                              checked={thSurvey.surveyAttrs.anEndNumAttr.enabled}
                              onChange={(e) => setThSurvey({
                                ...thSurvey,
                                surveyAttrs: {
                                  ...thSurvey.surveyAttrs,
                                  anEndNumAttr: {
                                    ...thSurvey.surveyAttrs.anEndNumAttr,
                                    enabled: e.target.checked
                                  }
                                }
                              })}
                            >
                              收集到
                              <InputNumber
                                value={thSurvey.surveyAttrs.anEndNumAttr.endNum}
                                onChange={(value) => setThSurvey({
                                  ...thSurvey,
                                  surveyAttrs: {
                                    ...thSurvey.surveyAttrs,
                                    anEndNumAttr: {
                                      ...thSurvey.surveyAttrs.anEndNumAttr,
                                      endNum: value
                                    }
                                  }
                                })}
                                min={1}
                                max={100000}
                                controls={{ position: 'right' }}
                              />
                              份时结束
                            </Checkbox>
                          </Form.Item>
                          <Form.Item>
                            <Checkbox
                              checked={thSurvey.surveyAttrs.anEndTimeAttr.enabled}
                              onChange={(e) => setThSurvey({
                                ...thSurvey,
                                surveyAttrs: {
                                  ...thSurvey.surveyAttrs,
                                  anEndTimeAttr: {
                                    ...thSurvey.surveyAttrs.anEndTimeAttr,
                                    enabled: e.target.checked
                                  }
                                }
                              })}
                            >
                              时间到
                              <DatePicker
                                value={thSurvey.surveyAttrs.anEndTimeAttr.endTime ? new Date(thSurvey.surveyAttrs.anEndTimeAttr.endTime) : null}
                                onChange={(date) => setThSurvey({
                                  ...thSurvey,
                                  surveyAttrs: {
                                    ...thSurvey.surveyAttrs,
                                    anEndTimeAttr: {
                                      ...thSurvey.surveyAttrs.anEndTimeAttr,
                                      endTime: date ? date.toISOString() : ''
                                    }
                                  }
                                })}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="选择日期时间"
                              />
                              时结束
                            </Checkbox>
                          </Form.Item>
                        </div>
                      </Col>
                      <Col span={12}>
                        <h5>计分属性</h5>
                        <div style={{ paddingLeft: 10 }}>
                          <Form.Item>
                            <div>
                              <Checkbox
                                checked={thSurvey.surveyAttrs.scoreAttr.enabled}
                                onChange={(e) => setThSurvey({
                                  ...thSurvey,
                                  surveyAttrs: {
                                    ...thSurvey.surveyAttrs,
                                    scoreAttr: {
                                      ...thSurvey.surveyAttrs.scoreAttr,
                                      enabled: e.target.checked
                                    }
                                  }
                                })}
                              >
                                打开计分功能
                              </Checkbox>
                            </div>
                          </Form.Item>
                          <Form.Item>
                            <div>
                              <Checkbox
                                checked={thSurvey.surveyAttrs.scoreAttr.showSumScore.enabled}
                                onChange={(e) => setThSurvey({
                                  ...thSurvey,
                                  surveyAttrs: {
                                    ...thSurvey.surveyAttrs,
                                    scoreAttr: {
                                      ...thSurvey.surveyAttrs.scoreAttr,
                                      showSumScore: {
                                        ...thSurvey.surveyAttrs.scoreAttr.showSumScore,
                                        enabled: e.target.checked
                                      }
                                    }
                                  }
                                })}
                              >
                                答卷结束显示总分
                              </Checkbox>
                            </div>
                            {thSurvey.surveyAttrs.scoreAttr.showSumScore.enabled && (
                              <div>
                                <Select
                                  value={thSurvey.surveyAttrs.scoreAttr.showSumScore.showContent}
                                  onChange={(value) => setThSurvey({
                                    ...thSurvey,
                                    surveyAttrs: {
                                      ...thSurvey.surveyAttrs,
                                      scoreAttr: {
                                        ...thSurvey.surveyAttrs.scoreAttr,
                                        showSumScore: {
                                          ...thSurvey.surveyAttrs.scoreAttr.showSumScore,
                                          showContent: value
                                        }
                                      }
                                    }
                                  })}
                                >
                                  <Option value="sum">仅显示总分</Option>
                                  <Option value="sumAfterDetail">先显示总分后显示详情</Option>
                                  <Option value="sumAndDetail">直接显示总分与详细</Option>
                                </Select>
                              </div>
                            )}
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                    <Form.Item>
                      <Button type="primary" onClick={onSubmit}>
                        保存修改
                      </Button>
                      <Button style={{ marginLeft: 8 }}>
                        取消
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </>
            )}
          </div>
        )}
      </DwSurveyDcsWrapperV6>
    </div>
  );
};

export default DwSurveyAttrSet; 