import { Flex } from "antd"
import Aurora from '../Aurora';
import BlurText from "../Blur_Text";
import styles from './index.module.scss'
  


const Demo = () => { 
    const handleAnimationComplete = () => {
        console.log('Animation completed!');
      };
    return (
        <Flex vertical className={ styles.wrapper} style={{ width: '100%', height: '100vh', backgroundColor: '#000' }}>
            <Flex className={ styles.header}>
            <Aurora
                colorStops={["#00D8FF", "#7CFF67", "#00D8FF"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
            />
            </Flex>

            <BlurText
                text="大道云隐"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-2xl mb-8"
            />
            
        </Flex>
    )
}
export default Demo