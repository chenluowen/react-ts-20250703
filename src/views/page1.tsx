import { Button, Flex } from "antd"
import { useSelector, useDispatch } from "react-redux"
// import store from "../store"
import NumStatus from "../store/NumStatus"
// type RootState = ReturnType<typeof store.getState>// 从 store 中提取 dispatch 类型
// type AppDispatch = typeof store.dispatch;
const Page1 = () => { 
    //获取仓库数据
    // const { num } = useSelector((state: RootState) => ({
    //     num:state.handelNum.num
    // }))
    // const dispatch = useDispatch<AppDispatch>()
    const changeNum = () => {
        // dispatch({
        //     type: 'add1',
        //     val: 100
        // })  
    }
    // const changeAsyncNum = () => { 
    //     dispatch(NumStatus.asyncActions.asyncAdd1)
    // }
    return (
        <Flex className='home'>
         
1
        </Flex>
    )
}
export default Page1