import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import DwHeader from './DwHeader';
import DwFooter from './DwFooter';
import './Layout.css';

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const [currentHeader, setCurrentHeader] = useState('dw-header');
  const location = useLocation();

  useEffect(() => {
    loginStatus();
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
    <div id="dw-layout">
      <Layout style={{ padding: 0 }}>
        <Header style={{ padding: 0, height: 80 }}>
          <DwHeader />
        </Header>
        <Layout style={{ zIndex: 1 }}>
          <Layout>
            <Content style={{ padding: '20px 0' }}>
              <Row>
                <Col span={20} offset={2}>
                  <Outlet />
                </Col>
              </Row>
            </Content>
            <Footer>
              <DwFooter />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout; 