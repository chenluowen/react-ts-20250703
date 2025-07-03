import { Flex } from 'antd'
import styles from './index.module.scss'
import EchartsFile from './components/Echarts'
import EchartsTypes from './components/EchartsTypes'
import ListScroll from './components/ListScroll'
import { useEffect, useState } from 'react'
const Page2 = () => { 
    const [list, setList] = useState([])
    useEffect(() => { 
        setList([1,2,3,4,5,6,6,7])
    },[])
    return (
        <Flex className={ styles.demo_wrapper} gap={16}>
            <Flex flex={1} className={styles.left_content}>
                <EchartsTypes/>
            </Flex>
            <Flex vertical align='center' justify='flex-start' gap={8} className={styles.right_content}>
                <Flex align='center' justify='center' className={styles.title}>文件分类分布</Flex>
                <Flex align='center' justify='center' className={styles.echart}>
                    <EchartsFile/>
                </Flex>
                <Flex className={ styles.list_scroll_wrapper}>
                    <ListScroll data={list}/>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default Page2