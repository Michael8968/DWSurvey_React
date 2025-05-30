import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import DwHeaderLogin from './DwHeaderLogin';
import DwFooter from './DwFooter';
import './LoginLayout.css';

const { Header, Content, Footer } = Layout;

const LoginLayout: React.FC = () => {
  const [currentHeader, setCurrentHeader] = useState('dw-header');
  const [pageH, setPageH] = useState('600px');
  const location = useLocation();

  useEffect(() => {
    loginStatus();
    setPageH(`${window.innerHeight}px`);
  }, [location]);

  const loginStatus = () => {
    const fullPath = location.pathname;
    if (fullPath.includes('login')) {
      setCurrentHeader('dw-header-login');
    } else {
      setCurrentHeader('dw-header');
    }
  };

  return (
    <div id="dw-layout" style={{ height: '100vh' }} className="dw-layout-body">
      <Layout>
        <Layout style={{ padding: 0, height: 'calc(100vh - 80px)' }}>
          <Header style={{ padding: 0, height: 80 }}>
            <DwHeaderLogin />
          </Header>
          <Layout style={{ zIndex: 1 }}>
            <Layout>
              <Content style={{ padding: '20px 0' }}>
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </Layout>
        <Footer style={{ height: 80 }} className="dw-footer-container">
          <DwFooter />
        </Footer>
      </Layout>
    </div>
  );
};

export default LoginLayout; 