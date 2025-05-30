import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import DwLrHeader from './DwLrHeader';
import DwLrAsideMenu from './DwLrAsideMenu';
import DwFooter from '../DwFooter';
import './DwLrLayout.css';

const { Header, Content, Footer } = Layout;

const DwLrLayout: React.FC = () => {
  const [currentHeader, setCurrentHeader] = useState('dw-header');
  const [isCollapse, setIsCollapse] = useState(false);
  const [isCollapseActive, setIsCollapseActive] = useState(false);
  const [containerPaddingLeft, setContainerPaddingLeft] = useState(210);
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

  const handleCollapseClick = () => {
    setIsCollapse(!isCollapse);
    setContainerPaddingLeft(isCollapse ? 210 : 64);
  };

  return (
    <div id="dw-layout">
      <Layout style={{ padding: 0 }}>
        <Header style={{ padding: 0, position: 'fixed', zIndex: 20, width: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)' }}>
          <DwLrHeader />
        </Header>
        <Layout style={{ zIndex: 1 }} className="dw-admin-container">
          <div style={{ position: 'fixed', zIndex: 10, top: 60 }}>
            <DwLrAsideMenu isCollapse={isCollapse} />
          </div>
          <Layout style={{ paddingLeft: containerPaddingLeft, paddingTop: 60 }}>
            <Content style={{ padding: 0 }}>
              <Content style={{ padding: 20 }}>
                <Outlet />
              </Content>
              <Footer style={{ height: 'auto' }}>
                <DwFooter />
              </Footer>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <div
        className={`dw-menu-collapse ${isCollapseActive ? 'mouseEnter' : 'mouseLeave'}`}
        onClick={handleCollapseClick}
        onMouseEnter={() => setIsCollapseActive(true)}
        onMouseLeave={() => setIsCollapseActive(false)}
      >
        <span style={{ width: 24, textAlign: 'center' }}>
          {isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
      </div>
    </div>
  );
};

export default DwLrLayout; 