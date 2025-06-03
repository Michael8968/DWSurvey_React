import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, message } from 'antd';
import { Link, useParams, useLocation } from 'react-router-dom';
import { dwFooterUtils } from '../../../../../dw-utils/dw-common/dw-footer-util';
// import { getSurveyTypeName } from '../../../../../dw-utils/dw-survey-common';

interface Survey {
  surveyNameObj: {
    dwText: string;
  };
  surveyTypeSimpleName: string;
  designLayout: string;
  [key: string]: any;
}

interface Props {
  survey: Survey;
}

const DwDesignHeader: React.FC<Props> = ({ survey }) => {
  const [logoTitle, setLogoTitle] = useState('调问网-全新问卷编辑器');
  const [logoTitleNote, setLogoTitleNote] = useState('拖动或点击控件即可加入新题目');
  const [prevPath, setPrevPath] = useState('/v6');
  const { dwSurveyId } = useParams();
  const location = useLocation();

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = () => {
    dwFooterUtils.getDwFooterInfoAuto((footerInfo) => {
      // demo显示
      dwFooterUtils.isDemo(
        () => setLogoTitleNote('拖动或点击控件即可加入新题目'),
        () => setLogoTitleNote('拖动或点击控件即可加入新题目')
      );
      // 左右布局
      dwFooterUtils.isLayoutLr((footerInfo: any) => setPrevPath(footerInfo.prevPath), () => setPrevPath('/v6/lr'));
    });
    // getSurveyTypeName(survey);
    setLogoTitle(`调问网-全新${survey.surveyTypeSimpleName}编辑器`);
  };

  const handleSelect = (key: string) => {
    console.log(key);
  };

  const handleCommand = (command: string) => {
    if (command === 'TB') {
      message.warning('已经切换成"上下经典布局"');
    } else {
      message.warning('已经切换成"左右新式布局"');
    }
    survey.designLayout = command;
  };

  const menuItems = [
    { key: `${prevPath}/dw/survey`, label: '我的项目' },
    { key: `${prevPath}/dw/survey/d/chart/${dwSurveyId}`, label: '数据统计' },
    { key: `${prevPath}/dw/survey/c/url/${dwSurveyId}`, label: '答卷收集' },
    { key: `/v6/diaowen/dw-design/survey/${dwSurveyId}`, label: survey.surveyTypeSimpleName + '设计' }
  ];

  const dropdownItems = [
    {
      key: 'LR',
      label: (
        <span>
          <i className="fa-solid fa-table-columns" /> 左右新式布局
        </span>
      )
    },
    {
      key: 'TB',
      label: (
        <span>
          <i className="fa-solid fa-laptop" /> 上下经典布局
        </span>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <div className="header-content-left">
          <div className="logo">
            <Link to={`${prevPath}/dw/survey`}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzRDRFQ0Y5QjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzRDRFQ0ZBQjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDNENEVDRjdCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDNENEVDRjhCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6GJisjAAAFMklEQVR42uzdTYhVZRjA8XNrSAqTIq0EqYSCCoQWgeFCHcJsEbVo1UARkbYIChdFbloFWosWQVAWhFBDmyJa1FhR46YPC0KkhCgzN9OXJH2JhdyeM3Mnq3veMJp5z3lnfj94mCLo3nPu/O97z51z7u31+/0qh9749I88NzbHd336jo8NbUuR2zMxOrM9CfX2/BRzIuboYL6KORxzMOZAzCcxv3dpmzavnL//90gFf3fuYJYP/n3dP/778ZgPYybr3mL2xZxcqDvjDL8P/Ednx6yPeTjm3ZipmKdiNsyutgKBU1bE3DNYUT6LeSDmPIHAsMtjHos5EvN4zEUCgebjmG0xh2J2xCwVCAw7J+ahwUuvO0o8RhEIOdRvxO6O2RNzmUCg2aaY/TFjAoFmy2JeiNkVs0Qg0GxLzN6q4+90CYQ2rY15L+ZKgUCz1YOV5BqBQLMLY96OWSMQaHZ+zGsxqwQCzVYNVpIVAoFmV8S8GnOWQKDZdTGPCgTS7o+5RSDQrD6x8bmYSwUCzep3tp6pWjwLWCB0XX2C4+0CgbT6gH2ZQKDZxTHbBQJp91UtnPkrEEoxe/muQCDh7irzRwoJhJIsHUQiEEjYWmX8u4hAKE19MuN6gUDabQKBtFtjzhQINKu/mmGtQCBts0AgbaNAIO3aKsNluQKhVPWpJ1cLBNLWCATSrhIIpK0WCKRdIhBIWy4QSLtAIJC2RCCQNu9fLz2SeYN6C+wBGtqeidGFtT2LnRUE/u0Zo9/v2wtzaM+UfZDb5pVWEPASC7om20F6b7zsHdUf88tiBQHaWUFmn4gL3EeL5q3PG98p7/GZGJ3fx8cKAgIBgYBAQCAgEBAICAQEAgIBBAICAYGAQEAgIBAQCAgEBAICAQQCAgGBgEBAICAQEAgIBAQCCAQEAgIBgYBAQCAgEBAICAQEAjTq9ft5vhq7Nz79o9jvSe+PLeBfgvE//7HIx2c+HxsrCAgEBAICgZxG2jjgpbsHvHaBFQRO/xkj19u8YAUBgYCD9Ll/LTde9o5aJH9J99hYQaCDK8hs7CU+wS6i3wePjxUEBAICAYHAIjpIX/BKf8sUKwgIBAQCAgGBgEBAICAQEAgIxC4AgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEAAgGBgEBAICAQEAgIBAQCAgEEAqch9/ek9+zyTvP4WEGggytIf8zOxgoCAgEvseb66G+87B3115eIpW8LVhAoawWZfSIucB/1bE+x22MFYVH72UssSDshEEg7KhBI+14gkHZEIJB2WCCQ9qlAIO2AQKDZr1YQSPso5jeBQLPJHDciEEr1hkCgWf0HwvcFAs1eijkpEGj2Yq4bEgil+Txmr0Cg2dNVxgu7BEJJ6gukns15gwKhJHUcxwQCw+pTS3bmvlGBUIonYr4RCAz7OmZHGzcsEEqwPeZHgcCwN2N2t3XjAqHLfojZWrX4gXYCoavqKO6qMlx3LhBKVL9r9Urbd0IgdFF9KvuDXbgjAqFrDsXcXGW4nFYglOa7mJsGPyuBwCn1O1abYg526U4JhC74Nub6mP1du2MCoW1fxmyM+biLd04gtOmDmHVde1klELqgvrZjQzVzImJnjXicyKw+6fDemOdLuLMCIae3YrZULZ8+4iUWXTMVc2fMDSXFYQVhvtWXyT4Z80jV0vUcAqGLfhkchO/s+kG4QMjpi5hdgzm2EDZIIPxf9QdJv1zNfBzoZNXixU0CoQuOVzNfXlPH8HrMvirTB0m34Q8BBgDCrqxH8SRKpAAAAABJRU5ErkJggg=="
                alt="logo"
                height={32}
              />
              <h1>{logoTitle}</h1>
              <span className="logoTitleNote" style={{ fontSize: 13, color: '#c7c7c7' }}>
                {logoTitleNote}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'white' }}>{survey.surveyNameObj.dwText}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div className="changeLayout" style={{ textAlign: 'right', marginRight: 20 }}>
          <Dropdown
            menu={{
              items: dropdownItems,
              onClick: ({ key }) => handleCommand(key)
            }}
          >
            <span style={{ color: '#ff7510', cursor: 'pointer' }}>
              {survey.designLayout === 'LR' ? (
                <i className="fa-solid fa-table-columns" />
              ) : (
                <i className="fa-solid fa-laptop" />
              )}
              切换布局
              <i className="el-icon-arrow-down el-icon--right" />
            </span>
          </Dropdown>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Menu
            selectedKeys={[location.pathname]}
            mode="horizontal"
            className="dw-design-survey-menu dw-menu-height"
            items={menuItems}
            onClick={({ key }) => handleSelect(key)}
          />
        </div>
      </div>
    </div>
  );
};

export default DwDesignHeader; 