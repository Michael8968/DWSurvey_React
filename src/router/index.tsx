import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { v6Route } from './dw-v6-routes';

// 懒加载组件
const LoginLayout = React.lazy(() => import('../components/layouts/LoginLayout'));
const Login = React.lazy(() => import('../views/Login'));
const EmptyRouterView = React.lazy(() => import('../components/layouts/EmptyRouterView'));
const Home = React.lazy(() => import('../views/Home'));
const DwAutoLogin = React.lazy(() => import('../views/dw-common/DwAutoLogin'));

// 路由配置
const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/v6" element={<EmptyRouterView />}>
          {v6Route.v6RouteRoots.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
        <Route path="/login" element={<LoginLayout />}>
          <Route index element={<Login />} />
          <Route path="dw-auto-login" element={<DwAutoLogin />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes; 