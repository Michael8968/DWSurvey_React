import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { dwUpSysThemeStyleVar } from './utils/dw-theme/dw-common-theme';
import './App.css';

const App: React.FC = () => {
  const [currentHeader, setCurrentHeader] = useState('dw-header');
  const location = useLocation();

  useEffect(() => {
    loginStatus();
    dwUpSysThemeStyleVar(null);
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
    <div id="app">
      <Routes>
        {/* 路由配置将在这里添加 */}
      </Routes>
    </div>
  );
};

export default App; 