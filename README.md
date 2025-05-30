# DWSurvey React 前端项目

## 项目简介
DWSurvey 是一个基于 React 的问卷调查系统前端项目。本项目是基于 [DWSurvey_Vue](https://github.com/wkeyuan/DWSurvey_Vue) 的 React 实现版本。

## 技术栈
- React 18
- TypeScript
- React Router
- Ant Design
- Vite

## 开发环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

## 项目启动
1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

## 项目结构
```
src/
  ├── components/     # 公共组件
  ├── pages/         # 页面组件
  ├── services/      # API 服务
  ├── utils/         # 工具函数
  ├── types/         # TypeScript 类型定义
  └── App.tsx        # 应用入口
```

## 开发规范
- 使用 TypeScript 进行开发
- 遵循 ESLint 规范
- 使用 Prettier 进行代码格式化

## 浏览器支持
- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79 