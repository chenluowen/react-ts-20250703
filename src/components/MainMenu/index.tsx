import { Menu, MenuProps, theme } from "antd";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
    {
        label: '栏目1',
        key: '/page1',
        icon:<PieChartOutlined/>
    },
    {
        label: '栏目2',
        key: '/page2',
        icon:<DesktopOutlined/>
    },
    {
        label: '栏目3',
        key: '/page3',
        icon: <UserOutlined />,
        children: [
            {
                label: '栏目 301',
                key:'/page3/page301'
            },
            {
                label: '栏目 302',
                key:'/page3/page302'
            },
            {
                label: '栏目 303',
                key:'/page3/page303'
            }
        ]
    },
    {
        label: '栏目4',
        key: '/page4',
        icon: <FileOutlined />,
        children: [
            {
                label: '栏目 401',
                key:'/page3/page401'
            },
            {
                label: '栏目 402',
                key:'/page3/page402'
            }
        ]
    },
    {
        label: '栏目5',
        key: '/page5',
        icon:<TeamOutlined/>
    },
];
const selectedKey:string = location.pathname

const MainMenu: React.FC = () => { 
    const navigate = useNavigate()
    const currentRoute = useLocation()
    console.log(currentRoute.pathname)
    const [openKeys,setOpenKeys] = useState<any>([''])
    const menuClick = (e:any) => { 
        console.log(e, '点击了菜单')
        // 点击跳转到对应路由 编程式导航的跳转，利用到hook
        navigate(e.key)
    }
    const handleChange = (keys:string[]) => { 
        console.log(keys)
        setOpenKeys([keys[keys.length-1]])
    }
    return (
        <Menu
        theme="dark"
        defaultSelectedKeys={['/page1']}
        selectedKeys={ [selectedKey]}
        mode="inline"
        items={items} onClick={menuClick}
        openKeys={openKeys}
        onOpenChange={handleChange} />
    )
}
 
export default MainMenu;