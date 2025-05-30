import React from 'react';
import { v6RouteUser } from './dw-v6-routes-user';
import { v6RouteAdmin } from './dw-v6-routes-admin';

// 懒加载组件
const Layout = React.lazy(() => import('../components/layouts/Layout'));
const NoTopLayout = React.lazy(() => import('../components/layouts/NoTopLayout'));
const DwSurveyDesignContent = React.lazy(() => import('../views/dw-survey-v6/dw-design/DwSurveyDesignContent'));
const DwAnswerSurveyV6 = React.lazy(() => import('../views/dw-survey-v6/dw-answer-v6/DwAnswerSurveyV6'));
const DwAnswerSurveyMobileV6 = React.lazy(() => import('../views/dw-survey-v6/dw-answer-v6/DwAnswerSurveyMobileV6'));
const DwLrLayout = React.lazy(() => import('../components/layouts/DwLRLayout/DwLrLayout'));
const DwSurveyAnswerReviewV6 = React.lazy(() => import('../views/dw-survey-v6/dw-data-v6/DwSurveyAnswerReviewV6'));
const DwSurveyStyle = React.lazy(() => import('../views/dw-survey-v6/dw-design/DwSurveyStyle'));
const EmptyRouterView = React.lazy(() => import('../components/layouts/EmptyRouterView'));

// v6版本的新路由数组
const v6Routes = [
  {
    path: '',
    element: <Navigate to="dw/survey" replace />
  },
  {
    path: 'dw/',
    element: <EmptyRouterView />,
    children: v6RouteUser.routesUserChildren
  },
  {
    path: 'dw/admin/',
    element: <EmptyRouterView />,
    children: v6RouteAdmin.routesAdminChildren
  }
];

// v6版本的总集
const v6RouteRoots = [
  {
    path: '/v6',
    meta: '首页',
    element: <Layout />,
    children: v6Routes
  },
  {
    path: '/v6/lr/',
    meta: '首页',
    element: <DwLrLayout />,
    children: v6Routes
  },
  {
    path: '/v6/diaowen',
    name: 'NoTopLayoutV6',
    element: <NoTopLayout />,
    children: [
      {
        path: 'dw-design/survey/:dwSurveyId',
        name: 'DwSurveyDesignContentV6',
        meta: {
          title: '问卷设计'
        },
        element: <DwSurveyDesignContent />
      },
      {
        path: 'dw-preview-style/survey/:dwSurveyId',
        name: 'DwSurveyStyle',
        meta: {
          title: '问卷样式'
        },
        element: <DwSurveyStyle />
      },
      {
        path: 'an/:sid',
        name: 'DwAnswerSidSurveyV6',
        meta: {
          title: '欢迎答卷'
        },
        element: <DwAnswerSurveyV6 />
      },
      {
        path: 'an/m/:sid',
        name: 'DwMSidAnswerSurveyV6',
        element: <DwAnswerSurveyMobileV6 />
      },
      {
        path: 'an/:sid/:answerId',
        name: 'DwSidAnswerSurveyV6',
        element: <DwAnswerSurveyV6 />
      },
      {
        path: 'an/review/:sid/:answerId',
        name: 'DwSurveyAnswerReviewV6',
        meta: {
          title: '原始答卷'
        },
        element: <DwSurveyAnswerReviewV6 />
      }
    ]
  }
];

const v6Route = { v6Routes, v6RouteRoots };

export { v6Route }; 