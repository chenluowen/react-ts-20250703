import React, { lazy} from 'react'
const About = lazy(() => import('../views/About'))
const Layout = lazy(() => import('../layout'))
//Navigate重定向组件
import { Navigate } from 'react-router-dom'
import Home from '../views/Home'
import Page2 from '../views/Page2/page2'
import Page301 from '../views/page301'
import { element } from 'three/tsl'
import Login from '../views/Login'
import { AuthRoute } from './authorRouter'
//路由表写法
const withLoadingComponent = (comp: JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        { comp}
    </React.Suspense>
)
//懒加载的模式的组件的写法，外面需要套一层loading的提示加载组件
const routes = [
    {
        path: '/', 
        element:<Navigate to='home'/>
    },
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                path: '/home',
                element:withLoadingComponent(<Home />)
            },
            {
                path: '/page2',
                element:withLoadingComponent(<Page2 />)
            },
            {
                path: '/page3/page301',
                element:withLoadingComponent(<Page301/>)
            }   
        ]
        
    },
    //嵌套路由  结束----
    {
        path: '/login',
        element:<Login />
    },
    //访问其余路径的时候，直接跳到首页
    {
        path: '*',
        element:<Navigate to='/home'/>
    }
]
export default routes