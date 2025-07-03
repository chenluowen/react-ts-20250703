//这个文件专门定义请求参数的，和响应的类型

//验证码的响应类型约束
interface CaptchaAPIRes { 
    msg: string;
    img: string;
    code: number;
    captchaEnabled: boolean;
    uuid:string;
}

//登录的响应类型约束
interface LoginAPIRes {
  code: number;
  message: string;
  data: Data;
}
interface Data {
  token: number;
}
//登录的请求类型约束
interface LoginAPIReq { 
    username: string;
    password: string;
    code: string;
    uuid: string;
}

//获取用户信息的响应类型约束
interface GetUserInfoAPIRes {
  id: string;
  useName: string;
  phone: number;
  age: number;
  role:string
}

