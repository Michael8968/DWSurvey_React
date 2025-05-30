import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import './NoTopLayout.css';

const { Content } = Layout;

const NoTopLayout: React.FC = () => {
  return (
    <div id="dw-no-top-layout">
      <Layout style={{ padding: 0 }}>
        <Layout style={{ zIndex: 1 }}>
          <Layout>
            <Content style={{ padding: 0 }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default NoTopLayout; 