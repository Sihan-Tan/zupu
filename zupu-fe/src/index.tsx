import { render } from 'react-dom';
import React from 'react';
import 'antd/dist/antd.css';
import Demo from '@/pages/login/index';

const App = function App() {
  return /* #__PURE__ */React.createElement(Demo, null);
};

render(/* #__PURE__ */React.createElement(App, null), document.getElementById('root'));
