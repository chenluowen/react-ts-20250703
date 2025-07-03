//和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoAPI, loginAPI } from "../../request/api";
import { setToken as _setToken, getToken } from '@/utils/index.ts' 

const userStore = createSlice({
    name: 'user',
    //数据状态
    initialState: {
        token: getToken() || '',
        userInfo: {},
    },
    //同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) { 
            state.userInfo = action.payload
        }

    }
})

//解构出 actionCreater
const { setToken,setUserInfo } = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登录获取token
const fetchLogin = (loginData: { username: string; password: string; code: string; uuid: string }) => {
    //1、发送异步请求
     return async (dispatch:any) => { 
        //发送异步请求
         const res = await loginAPI(loginData)
        //2、提交同步action进行token的存入
        dispatch(setToken(res.data.token))
    }

}
 
//获取个人用户信息异步方法
const fetchUserInfo = () => {
    //1、发送异步请求
     return async (dispatch:any) => { 
        //发送异步请求
         const res:any = await getUserInfoAPI()
        //2、提交同步action进行token的存入
        dispatch(setUserInfo(res.data))
    }

 }

export { fetchLogin,fetchUserInfo,setToken }

export default userReducer