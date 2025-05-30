import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Image } from 'antd';
import logo from '../../assets/logo.png';
import './DwHeaderLogo.css';

const DwHeaderLogo: React.FC = () => {
  const [prevPath, setPrevPath] = useState('/v6');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const routePath = location.pathname;
    if (routePath.indexOf('/v6/lr') >= 0) {
      setPrevPath('/v6/lr');
    }
  }, [location]);

  return (
    <div className="logo">
      <div onClick={() => navigate(`${prevPath}/dw/survey`)}>
        <Image src={logo} alt="logo" />
        <span className="community-edition">社区版</span>
      </div>
    </div>
  );
};

export default DwHeaderLogo; 