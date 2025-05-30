import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Button, Tag, message } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { EditOutlined, LinkOutlined, BarChartOutlined } from '@ant-design/icons';
import { dwSurveyInfo, dwSurveyUpState } from '@/api/dw-survey';
import { getSurveyTypeSimpleName } from '../dw-survey-comp/dw-utils/dw-survey-common';

const { Option } = Select;

interface SurveyDetail {
  effective: boolean;
  effectiveIp: boolean;
  refresh: boolean;
  rule: boolean;
  ynEndNum: boolean;
  ynEndTime: boolean;
}

interface Survey {
  id: string;
  sid: string;
  surveyName: string;
  surveyState: number;
  surveyTypeSimpleName: string;
  answerNum: number;
  createDate: string;
  answerUrl: string;
  answerUrl1: string;
  answerUrlQR: string;
  answerUrlV6: string;
  siteCompCodeRoot: string;
  surveyDetail: SurveyDetail;
}

interface DwSurveyDcsWrapperV6Props {
  id: string;
  isAnswerUrl?: boolean;
  isSurveySet?: boolean;
  isSiteShare?: boolean;
  isSiteComp?: boolean;
  isAnswerWx?: boolean;
  isSurveyChart?: boolean;
  isAnswerData?: boolean;
  isSurveyLog?: boolean;
  isAnswerLog?: boolean;
  isAnswerUrlV6?: boolean;
  children?: React.ReactNode;
}

const DwSurveyDcsWrapperV6: React.FC<DwSurveyDcsWrapperV6Props> = ({
  id,
  isAnswerUrl = false,
  isSurveySet = false,
  isSiteShare = false,
  isSiteComp = false,
  isAnswerWx = false,
  isSurveyChart = false,
  isAnswerData = false,
  isSurveyLog = false,
  isAnswerLog = false,
  isAnswerUrlV6 = false,
  children
}) => {
  const [survey, setSurvey] = useState<Survey>({
    id: '',
    sid: '',
    surveyName: '',
    surveyState: 0,
    surveyTypeSimpleName: '问卷',
    answerNum: 0,
    createDate: '',
    answerUrl: '',
    answerUrl1: '',
    answerUrlQR: '',
    answerUrlV6: '',
    siteCompCodeRoot: '',
    surveyDetail: {
      effective: false,
      effectiveIp: false,
      refresh: false,
      rule: false,
      ynEndNum: false,
      ynEndTime: false
    }
  });

  const [prevPath, setPrevPath] = useState('/v6/dw');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.debug(process.env);
    getSurveyInfo();
    if (location.pathname.indexOf('/v6/lr') >= 0) {
      setPrevPath('/v6/lr/dw');
    }
  }, [location.pathname]);

  const handlePush = (to: string) => {
    navigate(to);
  };

  const surveyStateChange = (value: number) => {
    console.debug(value);
    dwSurveyUpState(id, value).then((response) => {
      const httpResult = response.data;
      if (httpResult.resultCode === 200) {
        message.success(`${survey.surveyTypeSimpleName}状态设置成功`);
      } else {
        message.error(`${survey.surveyTypeSimpleName}状态设置失败`);
      }
    });
  };

  const getSurveyInfo = () => {
    dwSurveyInfo(id).then((response) => {
      const resultData = response.data.data;
      const updatedSurvey = {
        ...resultData,
        answerUrl: `${window.location.origin}/#/diaowen/${resultData.sid}`,
        answerUrl1: `${window.location.origin}/static/diaowen/answer-p.html?sid=${resultData.sid}`,
        answerUrlQR: `${process.env.DW_API_URL}/api/dwsurvey/anon/response/answerTD.do?version=v6&sid=${resultData.sid}`,
        answerUrlV6: `${window.location.origin}/#/v6/diaowen/an/${resultData.sid}`,
        siteCompCodeRoot: `<div id="dwsurveyWebAnswerCompCode"><div id="dwsurveyWebSiteFixed" style="position: fixed; right: 0px; left: auto; top: 520px; z-index: 99999;"><a target='_blank' id="dwsurveyWebSiteFixedA" href="${window.location.origin}/#/v6/diaowen/an/${resultData.sid}" style="background-color: rgb(24, 144, 255); width: 15px; display: block; padding: 10px 6px 10px 10px; color: white; cursor: pointer; float: right; vertical-align: middle; text-decoration: none; font-size: 12px; box-sizing: content-box; line-height: 20px;">问卷调查</a></div></div>`,
        surveyDetail: {
          effective: resultData.surveyDetail.effective === 1,
          effectiveIp: resultData.surveyDetail.effectiveIp === 1,
          refresh: resultData.surveyDetail.refresh === 1,
          rule: resultData.surveyDetail.rule === 1,
          ynEndNum: resultData.surveyDetail.ynEndNum === 1,
          ynEndTime: resultData.surveyDetail.ynEndTime === 1
        },
        surveyTypeSimpleName: '问卷'
      };
      getSurveyTypeSimpleName(updatedSurvey);
      setSurvey(updatedSurvey);
    });
  };

  const renderStateTag = () => {
    switch (survey.surveyState) {
      case 0:
        return <Tag size="small">设计中</Tag>;
      case 1:
        return <Tag type="success" size="small">收集中</Tag>;
      case 2:
        return <Tag type="default" size="small">收集结束</Tag>;
      default:
        return <Tag size="small">未知</Tag>;
    }
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <div className="dw-dcs-main">
            <div className="dw-dcs-main-survey-title">
              <Row justify="space-between" align="middle">
                <Col>
                  <div className="dw-dcs-main-survey-title-content">
                    {survey.surveyName}
                  </div>
                </Col>
                <Col span={4}>
                  <Select
                    value={survey.surveyState}
                    onChange={surveyStateChange}
                    placeholder="请选择"
                  >
                    <Option value={0}>设计中</Option>
                    <Option value={1}>发布收集</Option>
                    <Option value={2}>收集结束</Option>
                  </Select>
                </Col>
              </Row>
            </div>
            <div className="dw-dcs-main-survey-step">
              <div className="dw-dcs-main-survey-step-item" style={{ padding: '13px 16px' }}>
                <Row justify="space-between" align="middle">
                  <Col span={3}>
                    <Link
                      to={`${prevPath}/survey/c/attr/${survey.id}`}
                      className={`dw-link dw-link-1 ${isSurveySet ? 'dw-link-primary' : ''}`}
                    >
                      <EditOutlined /> {survey.surveyTypeSimpleName}设计
                    </Link>
                  </Col>
                  <Col span={3}>
                    <Link
                      to={`${prevPath}/survey/c/url/${survey.id}`}
                      className={`dw-link dw-link-1 ${
                        isAnswerUrl || isSiteShare || isSiteComp || isAnswerWx || isAnswerUrlV6
                          ? 'dw-link-primary'
                          : ''
                      }`}
                    >
                      <LinkOutlined /> {survey.surveyTypeSimpleName}收集
                    </Link>
                  </Col>
                  <Col span={3}>
                    <Link
                      to={`${prevPath}/survey/d/data/${survey.id}`}
                      className={`dw-link dw-link-1 ${
                        isSurveyChart || isAnswerData ? 'dw-link-primary' : ''
                      }`}
                    >
                      <BarChartOutlined /> {survey.surveyTypeSimpleName}数据
                    </Link>
                  </Col>
                  <Col span={15} style={{ textAlign: 'right' }}>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handlePush(`/v6/diaowen/dw-design/survey/${survey.id}`)}
                    >
                      {survey.surveyTypeSimpleName}设计
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handlePush(`${prevPath}/survey/c/url/${survey.id}`)}
                    >
                      答卷地址
                    </Button>
                  </Col>
                </Row>
              </div>

              {/* 二级菜单 */}
              {isSurveySet && (
                <div className="dw-dcs-main-survey-step-item" style={{ paddingLeft: '16px' }}>
                  <Row>
                    <Col span={3}>
                      <Link
                        to={`/v6/diaowen/dw-design/survey/${survey.id}`}
                        className={`dw-link ${isSiteComp ? 'dw-link-primary' : ''}`}
                      >
                        <EditOutlined /> {survey.surveyTypeSimpleName}设计
                      </Link>
                    </Col>
                    <Col span={3}>
                      <Link
                        to={`/v6/diaowen/dw-preview-style/survey/${survey.id}`}
                        className={`dw-link ${isAnswerWx ? 'dw-link-primary' : ''}`}
                      >
                        <EditOutlined /> 样式设计
                      </Link>
                    </Col>
                    <Col span={3}>
                      <Link
                        to={`${prevPath}/survey/c/attr/${survey.id}`}
                        className={`dw-link ${isSurveySet ? 'dw-link-primary' : ''}`}
                      >
                        <EditOutlined /> 答卷设置
                      </Link>
                    </Col>
                  </Row>
                </div>
              )}

              {/* 状态信息 */}
              <div className="dw-dcs-main-survey-step-item dw-dcs-main-survey-step-item-status">
                <Row justify="space-between" align="middle">
                  <Col span={4}>
                    <div>
                      状态：{renderStateTag()}
                    </div>
                  </Col>
                  <Col span={4}>
                    <div>收集数：{survey.answerNum ?? 0} 份</div>
                  </Col>
                  <Col span={16} style={{ textAlign: 'right' }}>
                    创建时间：{survey.createDate}
                  </Col>
                </Row>
              </div>

              {/* 主要内容区域 */}
              <div className="dw-dcs-main-survey-step-main">
                {children}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DwSurveyDcsWrapperV6; 