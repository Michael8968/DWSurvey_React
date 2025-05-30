import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { dwV6Menu } from '../../../router/dw-v6-menu';
import { dwSurveyRootStyle } from '../../../utils/dw-theme/dw-common-theme';
import './DwLrAsideMenu.css';

const { Sider } = Layout;

interface DwLrAsideMenuProps {
  isCollapse: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

const DwLrAsideMenu: React.FC<DwLrAsideMenuProps> = ({ isCollapse, onCollapseChange }) => {
  const [isCollapseActive, setIsCollapseActive] = useState(false);
  const [defActive, setDefActive] = useState('/v6/lr/dw/survey');
  const [dwMenus, setDwMenus] = useState<any[]>([]);
  const [prevPath, setPrevPath] = useState('/v6');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveMenu();
    const routePath = location.pathname;
    if (routePath.indexOf('/v6/lr') >= 0) {
      setPrevPath('/v6/lr');
    }
    setDwMenus(dwV6Menu.dwMenus.concat(dwV6Menu.dwMenusAdmin));
  }, [location]);

  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };

  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };

  const setActiveMenu = () => {
    const fullPath = location.pathname;
    if (fullPath.indexOf('/dw/survey') >= 0) {
      setDefActive('/v6/lr/dw/survey');
    } else if (fullPath.indexOf('/dw/admin/user') >= 0) {
      setDefActive('/v6/lr/dw/admin/user');
    } else if (fullPath.indexOf('/dw/user') >= 0) {
      setDefActive('/v6/lr/dw/user');
    }
  };

  const renderMenuItem = (item: any) => {
    if (item.children) {
      return (
        <Menu.SubMenu
          key={item.path}
          title={
            <span>
              <i className={item.icon}></i>
              <span>{item.name}</span>
            </span>
          }
        >
          {item.children.map((child: any) => (
            <Menu.Item key={child.path} onClick={() => navigate(prevPath + child.path)}>
              <span>{child.name}</span>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.path} onClick={() => navigate(prevPath + item.path)}>
        <i className={item.icon}></i>
        <span>{item.name}</span>
      </Menu.Item>
    );
  };

  return (
    <Sider width={210} className="dw-lr-aside" collapsed={isCollapse}>
      <div>
        <Menu
          defaultSelectedKeys={[defActive]}
          mode="inline"
          theme="dark"
          inlineCollapsed={isCollapse}
          style={{ borderRight: 'none' }}
          className="dw-menu"
          onOpenChange={handleOpen}
          onClose={handleClose}
        >
          {dwMenus.map(renderMenuItem)}
        </Menu>
        <div
          className={`dw-menu-collapse ${isCollapseActive ? 'mouseEnter' : 'mouseLeave'}`}
          style={{ display: 'none' }}
          onClick={() => onCollapseChange(!isCollapse)}
          onMouseEnter={() => setIsCollapseActive(true)}
          onMouseLeave={() => setIsCollapseActive(false)}
        >
          <span style={{ width: '24px', textAlign: 'center' }}>
            {isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
      </div>
    </Sider>
  );
};

export default DwLrAsideMenu; 