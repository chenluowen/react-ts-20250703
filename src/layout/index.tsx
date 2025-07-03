
import React, { useEffect, useState } from 'react';
import { Flex, Layout } from 'antd';
import '../assets/styles/global.scss'
import {Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUserInfo } from '../store/modules/user';
import styles from './index.module.scss'
import Header from './components/header'
import Sider from './components/sider'
import { useLocation } from 'react-router-dom';
const {  Content, Footer } = Layout;


const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation();


  
  //触发个人用户信息action
  useEffect(()=>{
    dispatch(fetchUserInfo())
  }, [dispatch])
  
  const useInfo: any = useSelector((state: RootState) => state.user.userInfo)
  console.log(useInfo)
  return (
    <Layout className={ styles.layout_wrapper}>
        <Sider/>
      {/* 右边内容 */}
      <Layout className={ styles.layout_right_wrapper}>
        <Header info={useInfo } />
        {/* 右边内容 */} 
        {/* 二级路由的出口 */}
        <Content className={ styles.content_wrapper}>
          <Outlet/>
        </Content>
        {/* 右边底部 */}
        { 
          location.pathname === 'login' && (
          <Footer className={ styles.foot_wrapper} style={{ }} >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
          )

        }

      </Layout>
    </Layout>
  );
};

export default View;

