import { StoreContext } from '../../store/StoreProvider';

import { Button, Checkbox, Form, Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { UserDataReg } from '../../types';
import { useNavigate } from 'react-router-dom';
// import config from '../../../config.json';
import './SignUp.scss';

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

type LayoutType = Parameters<typeof Form>[0]['layout'];

const SignUp = () => {
  const store = useContext(StoreContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  // const locale = store.localeStore.locale;
  // const { signup, message } = locale === 'ru' ? config.locale.ru : config.locale.en;
  // const {
  //   registerBtn,
  //   email,
  //   emailRuleMessageFormat,
  //   emailRuleMessageReq,
  //   password,
  //   passwordTooltip,
  //   confirm,
  //   confirmError,
  //   confirmPassword,
  //   confirmPasswordError,
  //   confirmPasswordMessage,
  //   passwordMessage,
  //   passwordError,
  // } = signup;

  // const { registerP1, registerP2 } = message;

  useEffect(() => {
    if (store.authStore.showLoginPage) form.resetFields();
    if (store.authStore.login) form.resetFields();
  }, [store.authStore.showLoginPage, store.authStore.login]);

  // const onFinish = (values: UserDataReg) => {
  //   store.authStore.setUser(values).then((success) => {
  //     if (success) {
  //       store.authStore.newMessage('success', `Вы успешно зарегистрировались, ${store.authStore.user.email}. Добро пожаловать!`)
  //       navigate('/main');
  //     }
  //   });
  // };

  const formItemLayout =
    formLayout === 'horizontal'
      ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
      : null;

  return (
    <>
      <div
        className='signup-page'
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          name="register"
          // onFinish={onFinish}
          style={{ maxWidth: 600 }}
          labelCol={{ span: 24 }}
          scrollToFirstError
        >
          <Form.Item
            name="login"  
            label={"Логин"}
            tooltip={"Логин должен состоять из 3-15 символов: букв латинского алфавита, цифр, знаков '_' и '-', без пробелов и других символов. Логин регистрозависимый."}
            rules={[
              {
                pattern:
                /^[а-яА-Яa-zA-Z]{2,20}$/,
                message: "Введите ваш корректный логин!",
              },
              {
                required: true,
                message: "Введите ваш логин!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
            style={{ width: '42%' }}
            name="name"
            label={"Имя"}
            rules={[
              {
                pattern:
                /^[а-яА-Яa-zA-Z]{2,20}$/,
                message: "Введите ваше корректное имя!",
              },
              {
                required: true,
                message: "Введите ваше имя!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            style={{ width: '56%' }}
            name="lastName"
            label={"Фамилия"}
            rules={[
              {
                pattern:
                /^[а-яА-Яa-zA-Z]{2,20}$/,
                message: "Введите вашу корректную фамилию!",
              },
              {
                required: true,
                message: "Введите вашу фамилию!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            <Form.Item
            style={{ width: '42%' }}
            name="password"
            label={"Пароль"}
            tooltip={"Пароль должен состоять как минимум из 8 символов, одной цифры, одной буквы и одного специального символа."}
            rules={[
              {
                required: true,
                message: "Введите ваш пароль!",
              },
              {
                pattern:
                  /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])\S{8,}.*$/,
                message: "Введите ваш действительный пароль!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            style={{ width: '56%' }}
            name="confirm"
            label={"Подтвердите пароль"}
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Подтвердите введенный пароль!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Введенные пароли не совпадают!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          </div>

          <Form.Item
            name="codePassword"  
            label={"Регистрационный код"}
            tooltip={"Обратитесь к системному администратору для его получения."}
            rules={[
              {
                required: true,
                message: "Введите ваш код!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {"Регистрация"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default observer(SignUp);
