import React from 'react';

// 懒加载组件
const DwAnswerWeixin = React.lazy(() => import('../views/dw-survey/dw-collect/DwAnswerWeixin'));
const DwSurveyAnswerDataListV6 = React.lazy(() => import('../views/dw-survey-v6/dw-data-v6/DwSurveyAnswerDataListV6'));
const DwAnswerUrlV6 = React.lazy(() => import('../views/dw-survey-v6/dw-collect-v6/DwAnswerUrlV6'));
const DwSurveyChartsV6 = React.lazy(() => import('../views/dw-survey-v6/dw-data-v6/DwSurveyChartsV6'));
const DwSurveyAttrSet = React.lazy(() => import('../views/dw-survey-v6/dw-design/DwSurveyAttrSet'));
const DwSiteCompV6 = React.lazy(() => import('../views/dw-survey-v6/dw-collect-v6/DwSiteCompV6'));
const DwSiteShareV6 = React.lazy(() => import('../views/dw-survey-v6/dw-collect-v6/DwSiteShareV6'));

const routesSurveyChildren = [
  {
    path: 'survey/c/attr/:dwSurveyId',
    meta: {
      title: '问卷属性'
    },
    element: <DwSurveyAttrSet />
  },
  {
    path: 'survey/c/url/:dwSurveyId',
    meta: {
      title: '答卷地址'
    },
    element: <DwAnswerUrlV6 />
  },
  {
    path: 'survey/c/comp/:dwSurveyId',
    meta: {
      title: '网站组件'
    },
    element: <DwSiteCompV6 />
  },
  {
    path: 'survey/c/share/:dwSurveyId',
    element: <DwSiteShareV6 />
  },
  {
    path: 'survey/c/weixin/:dwSurveyId',
    element: <DwAnswerWeixin />
  },
  {
    path: 'survey/d/chart/:dwSurveyId',
    meta: {
      title: '统计分析'
    },
    element: <DwSurveyChartsV6 />
  },
  {
    path: 'survey/d/data/:dwSurveyId',
    meta: {
      title: '原始数据'
    },
    element: <DwSurveyAnswerDataListV6 />
  }
];

const v6RouteSurvey = { routesSurveyChildren };

export { v6RouteSurvey }; 