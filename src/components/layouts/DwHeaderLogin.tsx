import React from 'react';
import { Row, Col } from 'antd';
import DwHeaderLogo from './DwHeaderLogo';
import './DwHeaderLogin.css';

const DwHeaderLogin: React.FC = () => {
  return (
    <div>
      <div>
        <div className="m-logbg"></div>
      </div>
      <div>
        <Row className="dw-header-row">
          <Col span={20} offset={2}>
            <div className="dw-header-main">
              <Row justify="space-between" align="middle">
                <Col span={4}>
                  <DwHeaderLogo />
                </Col>
                <Col span={16}>
                  <div style={{ paddingLeft: '60px', color: 'white' }}>
                    DWSurvey OSS - 全新的社区版，简单、稳定、实用
                  </div>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  <div>
                    <div style={{ height: '80px', lineHeight: '80px' }}>
                      {/* <Button type="primary">登录</Button> */}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DwHeaderLogin; 