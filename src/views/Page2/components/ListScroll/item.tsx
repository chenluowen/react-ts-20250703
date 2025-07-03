import { Flex, Tooltip } from "antd"
import styles from "./item.module.scss"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
type Ref = any
type Props = {}

const ItemList = forwardRef<Props, Ref>((props, ref) => {
  const internalRef = useRef<any>(null)
  const [list, setList] = useState<any[]>([])
  useEffect(() => {
    setList(props.list)
  }, [props])
  useImperativeHandle(ref, () => internalRef.current)
  return (
    <Flex ref={internalRef} vertical className={styles.dept_list_wrapper} gap={8}>
      {list?.map((item: any, index: number) => {
        return (
          <Tooltip
            placement="top"
            title={`${item.deptName}存在${item.baseClassName}文件（${item.riskCount}），存在数据安全隐`}
            key={index}
          >
            <Flex align="center" justify="flex-start" className={styles.dept_item} gap={8}>
            1
            </Flex>
          </Tooltip>
        )
      })}
    </Flex>
  )
})
export default ItemList
