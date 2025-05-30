import React from 'react';
import { v6RouteSurvey } from './dw-v6-routes-survey';

// 懒加载组件
const DwUser = React.lazy(() => import('../views/dw-user/DwUser'));
const DwUserPwd = React.lazy(() => import('../views/dw-user/DwUserPwd'));
const DwSurveyListV6 = React.lazy(() => import('../views/dw-survey-v6/DwSurveyListV6'));
const EmptyRouterView = React.lazy(() => import('../components/layouts/EmptyRouterView'));

// v6版本的新路由数组
const routesUserChildren = [
  {
    path: 'survey',
    meta: {
      title: '我的问卷'
    },
    element: <DwSurveyListV6 />
  },
  {
    path: '',
    element: <EmptyRouterView />,
    children: v6RouteSurvey.routesSurveyChildren
  },
  {
    path: 'user/pwd',
    element: <DwUserPwd />
  },
  {
    path: 'user',
    element: <DwUser />
  }
];

const v6RouteUser = { routesUserChildren };

export { v6RouteUser }; 