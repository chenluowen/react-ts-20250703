// import { legacy_createStore, combineReducers, compose } from "redux"

// import handelNum from "../store/NumStatus/reducer"
// const reducer = combineReducers({
//     handelNum
// })
// const sotre = legacy_createStore(reducer,(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
// export default sotre


//组合reudx子模块 + 导出store实例

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'

const store = configureStore({
    reducer: {
        user:userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
// 在组件中使用 useDispatch 时，应使用类型增强过的 AppDispatch 类型来替代默认的 Dispatch。
export type AppDispatch = typeof store.dispatch;

export default store;