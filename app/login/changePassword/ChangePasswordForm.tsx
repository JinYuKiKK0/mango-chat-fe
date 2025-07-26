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
import {defaultApi, ResetRequest} from "../../api";
import {SendCodeButton} from "../_components/SendCodeButton";

type ChangePasswordFrom = {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
};

// 校验函数
const changePasswordFormValidate = (values: ChangePasswordFrom): FormikErrors<ChangePasswordFrom> => {
  const errors: FormikErrors<ChangePasswordFrom> = {};

  if (!values.email) {
    errors.email = '邮箱不能为空';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '邮箱格式不正确';
  }

  if (!values.code) {
    errors.code = '验证码不能为空';
  }

  if (!values.newPassword) {
    errors.newPassword = '新密码不能为空';
  } else if (values.newPassword.length < 6) {
    errors.newPassword = '密码长度不能少于6位';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = '请再次输入新密码';
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = '两次输入的密码不一致';
  }

  return errors;
};

export default function ChangePasswordForm() {
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

  // 处理提交事件
  const handleSubmit = async (values: ChangePasswordFrom, { setSubmitting }) => {
    try {
      const result = await defaultApi.reset({resetRequest: {
          email: values.email,
          password: values.newPassword,
          code: values.code
        }});
      if (result.code === 200){
        displayNotification('success', '密码修改成功！即将跳转到登录页面...');
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        displayNotification('warning', result.message || '修改失败，请重试');
      }
    } catch (error) {
      displayNotification('warning', '修改请求失败');
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues: ChangePasswordFrom = {
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  };

  const notificationColor = notificationType === 'success' ? 'success' : 'warning';
  const notificationIcon = notificationType === 'success' ? mdiCheckCircle : mdiAlert;

  return (
      <Formik
          initialValues={initialValues}
          validate={changePasswordFormValidate}
          onSubmit={handleSubmit}
      >
        {({ isSubmitting,  values}) => (
            <Form>
              {showNotification && notificationType && (
                  <NotificationBar color={notificationColor} icon={notificationIcon}>
                    {notificationMessage}
                  </NotificationBar>
              )}

              <FormField label="邮箱">
                {(fieldData) => (
                    <div className="flex items-center gap-2">
                      <Field name="email" type="email" placeholder="请输入绑定的邮箱" className={fieldData.className} />
                      <SendCodeButton
                          displayNotification={displayNotification}
                          onSend={()=>defaultApi.sendResetCode({sendCodeRequest: { email: values.email }})}
                      />
                    </div>
                )}
              </FormField>
              <div className="h-5"><ErrorMessage name="email" component="div" className="text-red-500 text-sm" /></div>

              <FormField label="验证码">
                {({ className }) => <Field name="code" className={className} />}
              </FormField>
              <div className="h-5"><ErrorMessage name="code" component="div" className="text-red-500 text-sm" /></div>

              <FormField label="新密码">
                {({ className }) => <Field name="newPassword" type="password" className={className} />}
              </FormField>
              <div className="h-5"><ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" /></div>

              <FormField label="确认新密码">
                {({ className }) => <Field name="confirmPassword" type="password" className={className} />}
              </FormField>
              <div className="h-5"><ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" /></div>

              <Divider />

              <Buttons>
                <Button type="submit" label="确认修改" color="info" isGrouped disabled={isSubmitting} />
                <Button type="button" href="/login" label="返回登录" color="info" outline isGrouped onClick={() => router.push('/login')} />
              </Buttons>
            </Form>
        )}
      </Formik>
  );
}
