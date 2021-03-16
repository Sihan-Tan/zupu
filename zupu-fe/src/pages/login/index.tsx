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
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='请输入用户名'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='请输入密码'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HorizontalLoginForm;
