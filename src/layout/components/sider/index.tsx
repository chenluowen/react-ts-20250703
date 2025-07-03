import { Flex, Layout } from "antd";
import MainMenu from '../../../components/MainMenu'
import styles from './index.module.scss'
import icon from '@/assets/img/icon/icon.png'
import { useState } from "react";
import ProfileCard from "../../../components/Profile_Card";
import PixelCard from "../../../components/Pixel_Card";

const { Sider } = Layout;
{/* <div className={ styles.trigger}>111</div> */}
const SiderContent = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Flex className={styles.silder_wrapper}>

            <Sider trigger={null} collapsible onCollapse={(value) => setCollapsed(value)} className={ styles.silder}>
                <Flex align='center' justify='center' className= {styles.logo} >
                <img className={ styles.icon} src={ icon} alt="" />
                </Flex>
                <Flex flex={1} className={ styles.menu}>
                    <MainMenu></MainMenu>
                    <Flex className={styles.userInfo}>
                        <PixelCard variant="theme">
                        // your card content (use position: absolute)
                        </PixelCard>
                    {/* <ProfileCard
                    name="Javi A. Torres"
                    title="Software Engineer"
                    handle="javicodes"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl="/path/to/avatar.jpg"
                    showUserInfo={true}
                    enableTilt={true}
                    onContactClick={() => console.log('Contact clicked')}
                    /> */}
                    </Flex>

                </Flex>

            </Sider>
        </Flex>

    )
};

export  default SiderContent;