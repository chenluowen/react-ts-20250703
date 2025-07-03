import axios from "axios";
// import { getToken } from "@/utils/token"
import { Alert, message } from "antd";
import { getToken } from "../utils";

// const baseUrl = "http://tech.wolfcode.cn"
const baseUrl = ""

const server = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
})

// 白名单
const whiteList: Array<string | undefined>= [
    "/login",
    "/register"
]

//请求拦截
server.interceptors.request.use( 
    (config: any) => { 
        if (!whiteList.some(item => config.url.includes(item))) { 
            // config.headers.token = `${getToken()}`
        }
        //操作config注入token数据
        //1、获取token
        //2、按照后端的格式拼接token数据
        const token = getToken()
        if (token) { 
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => { 
        if (!error.response) { 
            alert('网络连接出问题，请检查网络后再试')
        }
    }
)

//响应拦截
server.interceptors.response.use(
    (res) => { 
        //未设置状态码则默认成功状态
        if (!res.data?.code || res.data.code == 200) {
            return Promise.resolve(res.data)
        } else { 
            message.error(res.data.message)
        }
        return Promise.reject(res)
    },
    (error) => { 
        const msg = error?.response?.data?.message || error?.message
        if (error && error.response) { 
            // const currentPath = window.localtion.pathname
            switch (error.response.status) { 
                case 400:
                    message.error(msg)
                    break;
                case 401:
                    message.error(msg)
                    break;
                case 403:
                    message.error(msg)
                    break;
                case 500:
                    message.error(msg)
                    break;
                default:
                    break;
            }
        }
        return Promise.reject(error)
    }
)
export default server