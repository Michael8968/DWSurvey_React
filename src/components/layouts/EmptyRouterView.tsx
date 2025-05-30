import React from 'react';
import { Outlet } from 'react-router-dom';

const EmptyRouterView: React.FC = () => {
  return <Outlet />;
};

export default EmptyRouterView; 