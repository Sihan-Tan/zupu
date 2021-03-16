import './index.css';
import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginApi } from '@/api';
import { LoginType } from '@/api/types';

const HorizontalLoginForm = function HorizontalLoginForm() {
  const onFormFinish = function onFormFinish(values: LoginType) {
    const { username, password } = values;

    if (!/^[a-zA-Z0-9]{5,16}$/.test(username)) {
      message.error('请输入5-16位只包含数字字母的用户名！');
      return;
    }

    if (!/^[a-zA-Z0-9]{8,16}$/.test(password)) {
      message.error('请输入8-16位只包含数字字母的密码！');
      return;
    }

    loginApi.userLogin(values);
  };

  return (
    <div className='login'>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFormFinish}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
          Or <a href=''>register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HorizontalLoginForm;
