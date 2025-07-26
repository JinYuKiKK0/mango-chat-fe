"use client";

import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikErrors, useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { mdiCheckCircle, mdiAlert } from '@mdi/js';

import Button from "../../_components/Button";
import Buttons from "../../_components/Buttons";
import Divider from "../../_components/Divider";
import FormField from "../../_components/FormField";
import NotificationBar from '../../_components/NotificationBar';
import { defaultApi } from "../../api";
import {SendCodeButton} from "../_components/SendCodeButton";

// 校验函数
const registerFormValidate = (values: RegisterRequest): FormikErrors<RegisterRequest> => {
  const errors: FormikErrors<RegisterRequest> = {};

  if (!values.name) {
    errors.name = '昵称不能为空';
  }

  if (!values.email) {
    errors.email = '邮箱不能为空';
  } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = '邮箱格式不正确';
  }

  if (!values.password) {
    errors.password = '密码不能为空';
  } else if (values.password.length < 6) {
    errors.password = '密码长度不能少于6位';
  }

  if (!values.code) {
    errors.code = '验证码不能为空';
  }

  return errors;
};

export default function RegForm() {
  const router = useRouter();

  // 通知栏状态
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<'success' | 'warning' | null>(null);
  const [notificationMessage, setNotificationMessage] = useState('');

  // 用于显示通知栏并设置定时器关闭
  const displayNotification = (type: 'success' | 'warning', message: string) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // 处理注册的提交事件
  const handleSubmit = async (values: RegisterRequest) => {
    try {
      const result = await defaultApi.register({registerRequest: values});
      if (result.code === 200){
        displayNotification('success', '注册成功！即将跳转到登录页面...');
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        displayNotification('warning', result.message || '注册失败，请重试');
      }
    } catch (error) {
      displayNotification('warning', '注册请求失败');
    }
  };

  const initialValues: RegisterRequest = {
    name: "",
    email: "",
    password: "",
    code: "",
  };

  const notificationColor = notificationType === 'success' ? 'success' : 'warning';
  const notificationIcon = notificationType === 'success' ? mdiCheckCircle : mdiAlert;

  return (
      <Formik
          initialValues={initialValues}
          validate={registerFormValidate}
          onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
            <Form>
              {showNotification && notificationType && (
                  <NotificationBar color={notificationColor} icon={notificationIcon}>
                    {notificationMessage}
                  </NotificationBar>
              )}

              <FormField label="昵称">
                {({ className }) => <Field name="name" className={className} />}
              </FormField>
              <div className="h-5 mt-1">
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <FormField label="邮箱">
                {(fieldData) => (
                    <div className="flex items-center gap-2">
                      <Field
                          name="email"
                          type="email"
                          placeholder="请输入邮箱"
                          className={`${fieldData.className}`}
                      />
                      <SendCodeButton
                          displayNotification={displayNotification}
                          onSend={() => {return defaultApi.sendRegisterCode({ sendCodeRequest: { email: values.email } })}}
                      />
                    </div>
                )}
              </FormField>
              <div className="h-5 mt-1">
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <FormField label="验证码">
                {({ className }) => <Field name="code" className={className} />}
              </FormField>
              <div className="h-5 mt-1">
                <ErrorMessage name="code" component="div" className="text-red-500 text-sm " />
              </div>

              <FormField label="密码">
                {({ className }) => <Field name="password" type="password" className={className} />}
              </FormField>
              <div className="h-5 mt-1">
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <Divider />

              <Buttons>
                <Button type="submit" label="注册" color="info" isGrouped disabled={isSubmitting} />
                <Button
                    href="/login"
                    label="已有账户? 去登录"
                    color="info"
                    outline
                    isGrouped
                />
              </Buttons>
            </Form>
        )}
      </Formik>
  );
}
