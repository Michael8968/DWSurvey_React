import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { logout } from '../../api/dw-login';
import { getAuthorizedUserName } from '../../utils/dw-authorized';
import SwitchLayoutDialog from '../components/SwitchLayoutDialog';
import './DwLrHeader.css';

const DwLrHeader: React.FC = () => {
  const [userName, setUserName] = useState('dwsurvey');
  const [prevPath, setPrevPath] = useState('/v6/lr');
  const navigate = useNavigate();
  const location = useLocation();
  const switchLayoutDialogRef = useRef<any>(null);

  useEffect(() => {
    setUserName(getAuthorizedUserName());
    const routePath = location.pathname;
    if (routePath.indexOf('/v6/lr') >= 0) {
      setPrevPath('/v6/lr');
    }
  }, [location]);

  const handleCommand = (command: string) => {
    if (command === 'logout') {
      logout().then(() => {
        navigate('/login');
      });
    } else if (command === 'myAccount') {
      navigate(`${prevPath}/dw/user`);
    } else if (command === 'updatePwd') {
      navigate(`${prevPath}/dw/user/pwd`);
    } else if (command === 'Gitee') {
      window.open('https://gitee.com/wkeyuan/DWSurvey?o=o1', '_blank');
    } else if (command === 'Github') {
      window.open('https://github.com/wkeyuan/DWSurvey?o=o1', '_blank');
    } else if (command === 'DWSurvey') {
      window.open('https://www.diaowen.net?s0=oss&v1=2501&e5=m01', '_blank');
    }
  };

  const openSwitchLayoutDialog = () => {
    switchLayoutDialogRef.current?.openDialog();
  };

  const userMenu = (
    <Menu onClick={({ key }) => handleCommand(key)}>
      <Menu.Item key="myAccount">我的账号</Menu.Item>
      <Menu.Item key="updatePwd">修改密码</Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );

  const gitMenu = (
    <Menu onClick={({ key }) => handleCommand(key)}>
      <Menu.Item key="Github">
        <i className="fa-brands fa-github"></i> GitHub
      </Menu.Item>
      <Menu.Item key="Gitee">
        <div style={{ display: 'flex', alignItems: 'center', padding: '2px 0px', gap: '5px' }}>
          <img src="/assets/image/resource/dw-info/gitee.svg" width="16" alt="gitee" />
          <div>Gitee</div>
        </div>
      </Menu.Item>
      <Menu.Item key="DWSurvey">
        <div style={{ display: 'flex', alignItems: 'center', padding: '2px 0', gap: '5px' }}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzRDRFQ0Y5QjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzRDRFQ0ZBQjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDNENEVDRjdCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDNENEVDRjhCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6GJisjAAAFMklEQVR42uzdTYhVZRjA8XNrSAqTIq0EqYSCCoQWgeFCHcJsEbVo1UARkbYIChdFbloFWosWQVAWhFBDmyJa1FhR46YPC0KkhCgzN9OXJH2JhdyeM3Mnq3veMJp5z3lnfj94mCLo3nPu/O97z51z7u31+/0qh9749I88NzbHd336jo8NbUuR2zMxOrM9CfX2/BRzIuboYL6KORxzMOZAzCcxv3dpmzavnL//90gFf3fuYJYP/n3dP/778ZgPYybr3mL2xZxcqDvjDL8P/Ednx6yPeTjm3ZipmKdiNsyutgKBU1bE3DNYUT6LeSDmPIHAsMtjHos5EvN4zEUCgebjmG0xh2J2xCwVCAw7J+ahwUuvO0o8RhEIOdRvxO6O2RNzmUCg2aaY/TFjAoFmy2JeiNkVs0Qg0GxLzN6q4+90CYQ2rY15L+ZKgUCz1YOV5BqBQLMLY96OWSMQaHZ+zGsxqwQCzVYNVpIVAoFmV8S8GnOWQKDZdTGPCgTS7o+5RSDQrD6x8bmYSwUCzep3tp6pWjwLWCB0XX2C4+0CgbT6gH2ZQKDZxTHbBQJp91UtnPkrEEoxe/muQCDh7irzRwoJhJIsHUQiEEjYWmX8u4hAKE19MuN6gUDabQKBtFtjzhQINKu/mmGtQCBts0AgbaNAIO3aKsNluQKhVPWpJ1cLBNLWCATSrhIIpK0WCKRdIhBIWy4QSLtAIJC2RCCQNu9fLz2SeYN6C+wBGtqeidGFtT2LnRUE/u0Zo9/v2wtzaM+UfZDb5pVWEPASC7om20F6b7zsHdUf88tiBQHaWUFmn4gL3EeL5q3PG98p7/GZGJ3fx8cKAgIBgYBAQCAgEBAICAQEAgIBBAICAYGAQEAgIBAQCAgEBAICAQQCAgGBgEBAICAQEAgIBAQCCAQEAgIBgYBAQCAgEBAICAQEAjTq9ft5vhq7Nz79o9jvSe+PLeBfgvE//7HIx2c+HxsrCAgEBAICgZxG2jjgpbsHvHaBFQRO/xkj19u8YAUBgYCD9Ll/LTde9o5aJH9J99hYQaCDK8hs7CU+wS6i3wePjxUEBAICAYHAIjpIX/BKf8sUKwgIBAQCAgGBgEBAICAQEAgIxC4AgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEAAgGBgEBAICAQEAgIBAQCAgEEAqch9/ek9+zyTvP4WEGggytIf8zOxgoCAgEvseb66G+87B3115eIpW8LVhAoawWZfSIucB/1bE+x22MFYVH72UssSDshEEg7KhBI+14gkHZEIJB2WCCQ9qlAIO2AQKDZr1YQSPso5jeBQLPJHDciEEr1hkCgWf0HwvcFAs1eijkpEGj2Yq4bEgil+Txmr0Cg2dNVxgu7BEJJ6gukns15gwKhJHUcxwQCw+pTS3bmvlGBUIonYr4RCAz7OmZHGzcsEEqwPeZHgcCwN2N2t3XjAqHLfojZWrX4gXYCoavqKO6qMlx3LhBKVL9r9Urbd0IgdFF9KvuDXbgjAqFrDsXcXGW4nFYglOa7mJsGPyuBwCn1O1abYg526U4JhC74Nub6mP1du2MCoW1fxmyM+biLd04gtOmDmHVde1klELqgvrZjQzVzImJnjXicyKw+6fDemOdLuLMCIae3YrZULZ8+4iUWXTMVc2fMDSXFYQVhvtWXyT4Z80jV0vUcAqGLfhkchO/s+kG4QMjpi5hdgzm2EDZIIPxf9QdJv1zNfBzoZNXixU0CoQuOVzNfXlPH8HrMvirTB0m34Q8BBgDCrqxH8SRKpAAAAABJRU5ErkJggg==" alt="logo" height="19" />
          <div>调问官网</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Row className="dw-lr-header">
        <Col span={24}>
          <div className="dw-header-main">
            <Row justify="space-between" align="middle">
              <Col span={18}>
                <div className="header-content-left">
                  <div className="logo">
                    <a href={`${prevPath}/dw/survey`}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzRDRFQ0Y5QjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzRDRFQ0ZBQjVFODExRUJCRENGOUE2Q0FGMTA3RTJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDNENEVDRjdCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDNENEVDRjhCNUU4MTFFQkJEQ0Y5QTZDQUYxMDdFMkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6GJisjAAAFMklEQVR42uzdTYhVZRjA8XNrSAqTIq0EqYSCCoQWgeFCHcJsEbVo1UARkbYIChdFbloFWosWQVAWhFBDmyJa1FhR46YPC0KkhCgzN9OXJH2JhdyeM3Mnq3veMJp5z3lnfj94mCLo3nPu/O97z51z7u31+/0qh9749I88NzbHd336jo8NbUuR2zMxOrM9CfX2/BRzIuboYL6KORxzMOZAzCcxv3dpmzavnL//90gFf3fuYJYP/n3dP/778ZgPYybr3mL2xZxcqDvjDL8P/Ednx6yPeTjm3ZipmKdiNsyutgKBU1bE3DNYUT6LeSDmPIHAsMtjHos5EvN4zEUCgebjmG0xh2J2xCwVCAw7J+ahwUuvO0o8RhEIOdRvxO6O2RNzmUCg2aaY/TFjAoFmy2JeiNkVs0Qg0GxLzN6q4+90CYQ2rY15L+ZKgUCz1YOV5BqBQLMLY96OWSMQaHZ+zGsxqwQCzVYNVpIVAoFmV8S8GnOWQKDZdTGPCgTS7o+5RSDQrD6x8bmYSwUCzep3tp6pWjwLWCB0XX2C4+0CgbT6gH2ZQKDZxTHbBQJp91UtnPkrEEoxe/muQCDh7irzRwoJhJIsHUQiEEjYWmX8u4hAKE19MuN6gUDabQKBtFtjzhQINKu/mmGtQCBts0AgbaNAIO3aKsNluQKhVPWpJ1cLBNLWCATSrhIIpK0WCKRdIhBIWy4QSLtAIJC2RCCQNu9fLz2SeYN6C+wBGtqeidGFtT2LnRUE/u0Zo9/v2wtzaM+UfZDb5pVWEPASC7om20F6b7zsHdUf88tiBQHaWUFmn4gL3EeL5q3PG98p7/GZGJ3fx8cKAgIBgYBAQCAgEBAICAQEAgIBBAICAYGAQEAgIBAQCAgEBAICAQQCAgGBgEBAICAQEAgIBAQCCAQEAgIBgYBAQCAgEBAICAQEAjTq9ft5vhq7Nz79o9jvSe+PLeBfgvE//7HIx2c+HxsrCAgEBAICgZxG2jjgpbsHvHaBFQRO/xkj19u8YAUBgYCD9Ll/LTde9o5aJH9J99hYQaCDK8hs7CU+wS6i3wePjxUEBAICAYHAIjpIX/BKf8sUKwgIBAQCAgGBgEBAICAQEAgIxC4AgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEAAgGBgEBAICAQEAgIBAQCAgEEAqch9/ek9+zyTvP4WEGggytIf8zOxgoCAgEvseb66G+87B3115eIpW8LVhAoawWZfSIucB/1bE+x22MFYVH72UssSDshEEg7KhBI+14gkHZEIJB2WCCQ9qlAIO2AQKDZr1YQSPso5jeBQLPJHDciEEr1hkCgWf0HwvcFAs1eijkpEGj2Yq4bEgil+Txmr0Cg2dNVxgu7BEJJ6gukns15gwKhJHUcxwQCw+pTS3bmvlGBUIonYr4RCAz7OmZHGzcsEEqwPeZHgcCwN2N2t3XjAqHLfojZWrX4gXYCoavqKO6qMlx3LhBKVL9r9Urbd0IgdFF9KvuDXbgjAqFrDsXcXGW4nFYglOa7mJsGPyuBwCn1O1abYg526U4JhC74Nub6mP1du2MCoW1fxmyM+biLd04gtOmDmHVde1klELqgvrZjQzVzImJnjXicyKw+6fDemOdLuLMCIae3YrZULZ8+4iUWXTMVc2fMDSXFYQVhvtWXyT4Z80jV0vUcAqGLfhkchO/s+kG4QMjpi5hdgzm2EDZIIPxf9QdJv1zNfBzoZNXixU0CoQuOVzNfXlPH8HrMvirTB0m34Q8BBgDCrqxH8SRKpAAAAABJRU5ErkJggg==" alt="logo" height="32" />
                      <h1>调问网</h1>
                      <span style={{ color: '#ffa71d', fontSize: '14px', position: 'absolute', marginLeft: '10px' }}>社区版</span>
                    </a>
                  </div>
                </div>
              </Col>
              <Col span={6} style={{ textAlign: 'right', paddingRight: '10px' }}>
                <div className="dw-display-flex-right" style={{ gap: '20px' }}>
                  <div style={{ color: '#c2a20c', paddingRight: '20px', fontSize: '14px', cursor: 'pointer' }} onClick={openSwitchLayoutDialog}>
                    <i className="fa-solid fa-toggle-on"></i> 切换布局
                  </div>
                  <Dropdown overlay={userMenu}>
                    <span className="el-dropdown-link">
                      {userName} <DownOutlined />
                    </span>
                  </Dropdown>
                  <Dropdown overlay={gitMenu}>
                    <span className="el-dropdown-link">
                      <i className="gitbtn fa-brands fa-square-git"></i>
                    </span>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <SwitchLayoutDialog ref={switchLayoutDialogRef} />
    </div>
  );
};

export default DwLrHeader; 