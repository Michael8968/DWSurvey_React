import React, { useEffect, useState } from 'react';
import { Row, Col, Descriptions, Tag } from 'antd';
import DwUserMenu from './DwUserMenu';
import { dwUserInfo } from '../../api/dw-user';

const DwUser: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await dwUserInfo();
      const resultData = response.data.data;
      setUserInfo(resultData);
    } catch (error) {
      console.error('获取用户信息失败:', error);
    }
  };

  const renderStatusTag = (status: number) => {
    switch (status) {
      case 0:
        return <Tag color="error">不可用</Tag>;
      case 1:
        return <Tag color="default">未激活</Tag>;
      case 2:
        return <Tag color="success">激活</Tag>;
      default:
        return <Tag style={{ marginLeft: 10 }}>未知</Tag>;
    }
  };

  return (
    <div>
      <Row>
        <Col span={24} offset={0}>
          <div className="dw-user-body">
            <Row>
              <Col span={4} style={{ height: '600px' }}>
                <DwUserMenu />
              </Col>
              <Col span={20}>
                <div style={{ padding: '30px' }}>
                  <Descriptions title="账号信息" bordered column={1}>
                    <Descriptions.Item label="账号">{userInfo.loginName}</Descriptions.Item>
                    <Descriptions.Item label="状态">
                      {renderStatusTag(userInfo.status)}
                    </Descriptions.Item>
                    <Descriptions.Item label="创建时间">{userInfo.createTime}</Descriptions.Item>
                    <Descriptions.Item label="登录时间">{userInfo.lastLoginTime}</Descriptions.Item>
                  </Descriptions>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DwUser; 