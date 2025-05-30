import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';
import DwLoginPwd from '../components/common/dw-login/DwLoginPwd';
import { answerLoginSurveyInfo, dwLogin } from '../api/dw-login';
import DwAuthorized from '@/utils/auth';
import { msgError } from '@/utils/message';
import { getBrowser } from '@/utils/common';
import { dwFooterUtils } from '../components/dw-survey-comp/dw-utils/dw-common/dw-footer-util';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabType, setTabType] = useState('pwd');
  const [loading, setLoading] = useState(false);
  const [pageH, setPageH] = useState('600px');
  const [pageBackgroundImage, setPageBackgroundImage] = useState('');
  const [surveyStyle, setSurveyStyle] = useState({
    surveyId: null,
    anLoginTitle: null,
    anLoginTitleNote: null,
    anLoginBgImg: null
  });
  const [loginProp] = useState({
    loginWx: true,
    loginPhone: true,
    loginPwd: true,
    register: true
  });

  useEffect(() => {
    setPageH(`${window.innerHeight}px`);
    load();
    const browser = getBrowser();
    console.debug('browser', browser);
  }, []);

  const load = async () => {
    const query = new URLSearchParams(location.search);
    if (query.has('sid')) {
      try {
        const response = await answerLoginSurveyInfo(query.get('sid') || '');
        console.debug('answerLoginSurveyInfo', response);
        const httpResult = response.data;
        if (httpResult.resultCode === 200) {
          const resultData = httpResult.data;
          if (resultData.hasOwnProperty('surveyStyle')) {
            const surveyStyle = httpResult.data.surveyStyle;
            if (surveyStyle !== null) {
              setSurveyStyle(surveyStyle);
              const anLoginBgImg = surveyStyle.anLoginBgImg;
              if (anLoginBgImg !== null && anLoginBgImg !== '') {
                setPageBackgroundImage(`url(${process.env.REACT_APP_RESOURCE_URL}${anLoginBgImg})`);
              }
            }
          } else {
            setSurveyStyle(prev => ({
              ...prev,
              anLoginTitle: httpResult.data.surveyNameText
            }));
          }
        }
      } catch (error) {
        console.error('Error loading survey info:', error);
      }
    }
  };

  const handleClick = (key: string) => {
    setTabType(key);
  };

  const login = async (params: any) => {
    const query = new URLSearchParams(location.search);
    const { type } = params;
    try {
      const response = await dwLogin(params);
      const resultData = response.data;
      console.log('resultData', resultData);
      if (resultData.status === 'ok') {
        DwAuthorized.setAuthority(resultData.currentAuthority);
        DwAuthorized.setToken(resultData.token);
        if (resultData !== null && resultData.hasOwnProperty('httpResult')) {
          const httpResult = resultData.httpResult;
          if (httpResult !== null && httpResult.hasOwnProperty('data')) {
            if (httpResult.data !== null) {
              DwAuthorized.setUserName(httpResult.data.loginName);
              DwAuthorized.setLoginCount(httpResult.data.loginCount);
            }
          }
        }
        if (query.has('sid')) {
          navigate(`/diaowen/${query.get('sid')}`);
        } else {
          dwFooterUtils.setLayout('lr');
          navigate('/');
        }
      } else {
        if (type !== 'weixin') {
          if (resultData.hasOwnProperty('httpResult') && resultData.httpResult != null && resultData.httpResult.hasOwnProperty('resultMsg')) {
            const resultMsg = resultData.httpResult.resultMsg;
            if (resultMsg === 'ExcessiveAttemptsException') {
              msgError('密码错误超过限定次数，请联系管理员');
            } else if (resultMsg === 'IncorrectCredentialsException' || resultMsg === 'AuthenticationException' || resultMsg === '') {
              msgError('用户名或密码错误或被禁用，请确认');
            } else {
              msgError(resultMsg);
            }
          } else {
            msgError('登录失败，请确认！');
          }
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      msgError('登录失败，请确认！');
    }
  };

  return (
    <div id="loginPage" style={{ height: pageH, backgroundImage: pageBackgroundImage }}>
      <div className="loginFormContent">
        <div style={{ textAlign: 'center' }}>
          {surveyStyle.anLoginTitle === null ? (
            <h3>欢迎登录</h3>
          ) : (
            <>
              <h3>{surveyStyle.anLoginTitle}</h3>
              <div>
                {surveyStyle.anLoginTitleNote === null ? (
                  <span className="ant-tag ant-tag-success">请登录再作答此问卷</span>
                ) : (
                  <div style={{ fontSize: '14px', color: '#a1a2a2' }}>{surveyStyle.anLoginTitleNote}</div>
                )}
              </div>
            </>
          )}
        </div>
        <div style={{ padding: '10px' }} className="dw-tabs-login">
          <Tabs activeKey={tabType} onChange={handleClick}>
            {loginProp.loginPwd && (
              <Tabs.TabPane tab="账户密码登录" key="pwd">
                <DwLoginPwd onLogin={login} />
              </Tabs.TabPane>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login; 