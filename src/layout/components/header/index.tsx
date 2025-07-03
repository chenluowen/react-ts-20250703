import { Avatar, Dropdown, Flex, Input, Layout, MenuProps } from "antd"
const { Header } = Layout;
import styles from './index.module.scss'
import avatar from '@/assets/img/header.jpeg'
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
const HeaderContent = ({ info }: any) => { 
    const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            个人中心
        </a>
        ),
    },
    {
        key: '2',
        label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            退出登录
        </a>
        ),
    },
    ];
    const [useInfo, setUseInfo] = useState<any>({})    
    return (
        <Header className={styles.header} >
            <Flex className={ styles.header_wrapper} gap={8}>
                <Flex align='center' justify='center' gap={8} className={styles.header_userInfo}>
                    <Avatar src={avatar} size={32} />
                    <Flex vertical  className={styles.userInfo_span} align='flex-start' justify='flex-start'>
                    <Flex className={ styles.name_span}>{ info?.useName+'，欢迎~'}</Flex>
                    <Flex className={styles.name_span} style={{color:'rgb(112, 112, 112)'}}>{ info?.role}</Flex>
                    </Flex>
                
                </Flex>
                {/* 搜索框 */}
                <Flex align="center" justify="flex-start" gap={16} className={styles.search_wrapper}>
                    <Flex flex={1}>
                     <Input/>
                    </Flex>
                    <SearchOutlined className={ styles.search_icon} />
                </Flex>
            </Flex>


        </Header>

    )
}
export  default HeaderContent