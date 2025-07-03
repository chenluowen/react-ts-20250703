import request from './index'

//登录码请求
export const captchAPI = ():Promise<CaptchaAPIRes> => { 
    return request({ 
        url: '/demo/api/getCode',
        method: 'get',
    })
}

//登录
export const loginAPI = (params:LoginAPIReq):Promise<LoginAPIRes> => { 
    return request({ 
        url: '/demo/api/login',
        method: 'post',
        data: params
    })
}

//获取用户信息
export const getUserInfoAPI = ():Promise<GetUserInfoAPIRes> => { 
    return request({ 
        url: '/demo/user/profile',
        method: 'get',
    })
}