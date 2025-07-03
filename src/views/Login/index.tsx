import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import initLogin from './init'
import { Button, Checkbox, Flex, Form, FormProps, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { captchAPI, loginAPI } from '../../request/api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '../../store/modules/user'
import { AppDispatch } from '../../store'
const Login = () => {
    const [formList] = Form.useForm()
    const [code, setCode] = useState('')
    const navigateTo = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => { 
        initLogin()
        window.onresize = function(){
            initLogin()
        }
        getImg()
    }, [])
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };
    //获取图片验证码
    const getImg =async() => { 
        const res:any = await captchAPI()
        setCode(res.data.code)
    }
    const onLogin = async () => { 
        // console.log('用户名，密码，验证码', formList.getFieldsValue())
        // const useName = formList.getFieldValue('username').trim()
        // const password = formList.getFieldValue('password').trim()
        // if (useName || password) { 
        //     alert('请输入用户名和密码！')
        // }
        // formList
        //     .validateFields()
        //     .then(async (value) => {
        //         if (value) { 
                    // try {
                    //     const res: any = await loginAPI({
                    //         username: value.username,
                    //         password: value.password,
                    //         code: value.code,
                    //         uuid: value.uuid
                    //     })
                    //     if (res) { 
                    //         console.log('登录成功', res)
                    //         //1、提示登录成功
                    //         message.success('登录成功')
                    //         //2、保存token
                    //         localStorage.setItem('token', res.data.token)
                    //         //3、跳转到/page1
                    //         navigateTo('/page1')
                    //         //4、删除本地保存种的uuid
                    //         localStorage.removeItem('uuid')
                    //     }
                    // } catch (error) {
                        
                    // }
                    //触发异步action fetchLogin
                    await dispatch(fetchLogin({
                            username: '11',
                            password: '22',
                            code: '123',
                            uuid: '456'
                    }))
                    //1、跳转到首页
                    navigateTo('/home')
                    //2、提示一下用户
                    message.success('登录成功')

                }
            // }).catch((error) => {
            //  message.error('请输入用户名和密码！')
            // })


    
    // const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    // console.log('Success:', values);
    // };

  return (
      <Flex className={styles.login_wrapper}>
          {/* 登录页背景 */}
          <canvas id="canvas" style={{ display: 'block' }}></canvas>
          <Flex align='center' justify='center' className={styles.login_box} >
              <Flex vertical align='center' justify='center' className={styles.form_wrapper} gap={50}>
                  <Flex>----------------------XXXX管理系统------------------------</Flex>
                  <Flex>
                  <Form
                    name="login"
                    form={ formList}
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                    // onFinish={onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="">Forgot password</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit" onClick={onLogin}>
                        Log in
                        </Button>
                        or <a href="">Register now!</a>
                    </Form.Item>
                    </Form>
                  </Flex>
                  
              </Flex>
          </Flex>
    </Flex>
  );
}
export default Login;