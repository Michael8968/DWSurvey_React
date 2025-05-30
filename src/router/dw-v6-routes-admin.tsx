import React from 'react';

// 懒加载组件
const AdminUserList = React.lazy(() => import('../views/dw-admin/AdminUserList'));
const DwSystemSetView = React.lazy(() => import('../views/dw-admin/system/DwSystemSetView'));

// v6版本的新路由数组
const routesAdminChildren = [
  {
    path: 'user',
    element: <AdminUserList />
  },
  {
    path: 'system/set',
    element: <DwSystemSetView />
  }
];

const v6RouteAdmin = { routesAdminChildren };

export { v6RouteAdmin }; 