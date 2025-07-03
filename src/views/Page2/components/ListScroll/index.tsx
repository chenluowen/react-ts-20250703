import { Flex } from "antd"
import ItemList from "./item"
import styles from "./index.module.scss"
import { useEffect, useRef, useState } from "react"

const ListScroll = ({ data }: any) => {
  const itemListRef1 = useRef<any>(null)
  const [scrollTime, setScrollTime] = useState(0)
  const getHeight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
        const height = ref.current.clientHeight
        console.log(height)
      setScrollTime(height * 50)
    } else {
      console.warn("ref.current is still null")
    }
  }
  // 如果需要在组件更新时重新获取高度，可以添加事件监听器
  const handleResize = () => {
    getHeight(itemListRef1)
  }
  useEffect(() => {
    console.log(data)
    // 获取第一个 ItemList 的高度
    if (data?.length > 0) {
      setTimeout(() => {
        getHeight(itemListRef1)
      }, 100)
      window.addEventListener("resize", handleResize)
    }

    // 清理事件监听器
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [itemListRef1, data, window.innerHeight])
  return (
    <Flex vertical className={styles.dept_wrapper}>
      <div className={styles.hidden_wrapper}></div>
      <Flex vertical className={styles.scroll_box} style={{ animationDuration: `${scrollTime}ms` }} gap={15}>
        <ItemList ref={itemListRef1} list={data} />
        <ItemList list={data} />
      </Flex>
    </Flex>
  )
}
export default ListScroll