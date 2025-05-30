import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import DwAuthorized from '@/utils/dw-authorized';

const DwAutoLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    const query = new URLSearchParams(location.search);
    console.log('query', query);

    if (query.has('token')) {
      const token = query.get('token');
      console.log('token', token);
      DwAuthorized.setToken(token);
    }

    if (query.has('authed')) {
      const authed = query.get('authed');
      console.log('authed', authed);
      DwAuthorized.setAuthorityStr(authed);
    }

    if (query.has('userName')) {
      const userName = query.get('userName');
      console.log('userName', userName);
      DwAuthorized.setUserName(userName);
    }

    if (query.has('to')) {
      const to = query.get('to');
      window.location.href = to;
    } else {
      navigate('/');
    }

    setLoading(true);
  };

  return (
    <div style={{ background: 'white', padding: 30, minHeight: 200, marginBottom: 30 }}>
      <Skeleton />
    </div>
  );
};

export default DwAutoLogin; 