import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { dwV6Menu } from '../../router/dw-v6-menu';
import { dwSurveyRootStyle } from '../../utils/dw-theme/dw-common-theme';
import './DwNavMenu.css';

const DwNavMenu: React.FC = () => {
  const [defActive, setDefActive] = useState('/dw/survey');
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
      setDefActive('/v6/dw/survey');
    } else if (fullPath.indexOf('/dw/admin/user') >= 0) {
      setDefActive('/v6/dw/admin/user');
    } else if (fullPath.indexOf('/dw/user') >= 0) {
      setDefActive('/v6/dw/user');
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
    <div>
      <Menu
        defaultSelectedKeys={[defActive]}
        mode="horizontal"
        theme="dark"
        style={{ borderRight: 'none', backgroundColor: dwSurveyRootStyle.sysThemeStyle.dwPrimaryThemeColor }}
        className="dw-menu"
        onOpenChange={handleOpen}
      >
        {dwMenus.map(renderMenuItem)}
      </Menu>
    </div>
  );
};

export default DwNavMenu; 