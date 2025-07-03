import React from 'react'
import ReactDOM from 'react-dom/client'
// import Router from './router'
//样式初始化一般放在最前面
import "reset-css"
//ui框架样式，组件样式
//全局样式
import './assets/styles/global.scss'
//组件样式
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom' 
//状态管理库
import { Provider } from 'react-redux'
import store from './store/index.ts' //react 和 redux 的关联


ReactDOM.createRoot(document.getElementById('root')!).render(
  /*react 和 redux 的关联*/
  <Provider store={store}> 
    <React.StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </React.StrictMode>,
  </Provider>,

)
