import { Flex, message } from 'antd';
import './App.css'
import { useEffect } from 'react';
import { Outlet,useRoutes,useNavigate,useLocation } from "react-router-dom"
import router from './router'
import { getToken } from './utils';
import Background from './components/Background'
function App() {
  const outlet = useRoutes(router)
  const navigateTo = useNavigate()
  useEffect(() => {


    
  }, [])

  /*
    1、如果访问的是登录页面，并且有token，跳转到首页
    2、如果访问的是其他页面，并且没有token，跳转到登录页面
    3、其余的都可以正常放行

    写成高阶组件了   route-AuthorRouter
  */
function BeforeRouterEnter() {
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;
    const token = getToken();

    if (pathName === '/login' && token) {
      message.success('您已登录');
      navigateTo('/page1', { replace: true });
    } else if (pathName !== '/login' && !token) {
      message.error('请登录');
      navigateTo('/login', { replace: true });
    }
  }, [location.pathname, navigateTo]);

  return outlet;
}



  return ( 
    <Flex vertical className='wrapper'>
      {/* 占位符组件，类似于窗口，用来展示组件的，有点像vue中的router-view */}
      {outlet}
    </Flex>
  )
}

export default App
