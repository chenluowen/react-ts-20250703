import { Button, Flex } from "antd"
import styles from "./index.module.scss"
import GradientText from '@/components/Gradient_Text'

import ChromaGrid from "../../components/Chroma_Grid"
import one from './img/one.png'
import two from './img/two.png'
import three from './img/three.png'
// import { style } from "framer-motion/client"
import CardSwap, { Card } from '@/components/Card_Swap'


import EchartsGraph from './components/echarts-graph'

const Home = () => { 
    const items:any[] = [

    ];



    const   getRandomInt = (min: number, max: number): number =>{
     return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return (
        <Flex className={styles.home_wrapper} gap={16}>
            <Flex flex={1} className={styles.left}>
                {/* 按钮 */}
                <Flex align="center" justify="center" className={styles.button_wrapper} gap={16}>
                    <div className={ styles.button}>太阳图</div>
                    <div className={ styles.button}>树状图</div>
                    <div className={ styles.button}>词云</div>

                </Flex>
                {/* 图表内容 */}
                <Flex className={styles.echarts_box}>
                    <EchartsGraph/>
                </Flex>
            </Flex>
            <div className={ styles.right} style={{ width: '300px' }}>right</div>


        </Flex>
    )
}
export default Home