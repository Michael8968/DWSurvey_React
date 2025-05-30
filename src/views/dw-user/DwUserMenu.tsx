import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const DwUserMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [defActive, setDefActive] = useState('/v6/lr/dw/user');
  const [prevPath, setPrevPath] = useState('/v6');
  const [isLrLayout, setIsLrLayout] = useState(false);

  useEffect(() => {
    const routePath = location.pathname;
    if (routePath.includes('/v6/lr')) {
      setPrevPath('/v6/lr');
      setIsLrLayout(true);
    }
    _setDefActive();
  }, [location]);

  const _setDefActive = () => {
    const fullPath = location.pathname;
    if (fullPath.includes('/dw/user/pwd')) {
      setDefActive(`${prevPath}/dw/user/pwd`);
    } else {
      setDefActive(`${prevPath}/dw/user`);
    }
  };

  const menuItems = [
    {
      key: `${prevPath}/dw/user`,
      icon: <UserOutlined />,
      label: '我的账号',
      onClick: () => navigate(`${prevPath}/dw/user`)
    },
    {
      key: `${prevPath}/dw/user/pwd`,
      icon: <KeyOutlined />,
      label: '修改密码',
      onClick: () => navigate(`${prevPath}/dw/user/pwd`)
    }
  ];

  return (
    <div>
      {!isLrLayout && (
        <Menu
          mode="vertical"
          selectedKeys={[defActive]}
          items={menuItems}
          style={{ height: '600px' }}
        />
      )}

      {isLrLayout && (
        <Menu
          mode="vertical"
          selectedKeys={[defActive]}
          items={menuItems}
          style={{ height: '600px' }}
        />
      )}
    </div>
  );
};

export default DwUserMenu; 