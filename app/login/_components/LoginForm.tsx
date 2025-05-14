"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import Button from "../../_components/Button";
import Buttons from "../../_components/Buttons";
import Divider from "../../_components/Divider";
import FormField from "../../_components/FormField";
import FormCheckRadio from "../../_components/FormField/CheckRadio";
import {LgForm, loginUser} from "../../api/api";
import { useState } from "react";
import NotificationBar from "../../_components/NotificationBar";
import {mdiAlert, mdiCheckCircle} from "@mdi/js";

type LoginForm = {
  login: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const router = useRouter();

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
      setNotificationType(null);
      setNotificationMessage('');
    }, 1000);
  };

  // 处理登录的提交事件。成功后跳转dashboard页面
  const handleSubmit = async (formValues: LgForm) => {
    try {
      const result = await loginUser(formValues);
      console.log("Login success:", result);

      if (result && result.data && result.data.token) {
        localStorage.setItem('authToken', result.data.token);
        console.log("Token saved:", result.data.token);
      } else {
        // 处理没有 token 返回的情况，虽然通常登录成功应该有 token
        console.warn("Login successful, but no token received.");
      }

      displayNotification('success', '登录成功！');

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);


    } catch (err: any) {
      console.error("Login error:", err);

      displayNotification('warning', err.message || '登录失败，请重试。');
    }
  };

  const initialValues: LgForm = {
    email: "",
    password: "",
  };

  const notificationColor = notificationType === 'success' ? 'success' : 'warning';
  const notificationIcon = notificationType === 'success' ? mdiCheckCircle : mdiAlert;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>

        {showNotification && notificationType && (
            <NotificationBar
                color={notificationColor}
                icon={notificationIcon}
            >
              {notificationMessage}
            </NotificationBar>
        )}


        <FormField label="Login" help="输入邮箱">
          {({ className }) => <Field name="email" className={className} />}
        </FormField>

        <FormField label="Password" help="输入密码">
          {({ className }) => (
            <Field name="password" type="password" className={className} />
          )}
        </FormField>

        <FormCheckRadio
            type="checkbox"
            label="记住我"
            labelClassName="text-sm"
        >
          <Field type="checkbox" name="remember" />
        </FormCheckRadio>

        <Divider />

        <Buttons>
          <Button type="submit" label="Login" color="info" isGrouped />
          <Button
            href="/dashboard"
            label="Home"
            color="info"
            outline
            isGrouped
          />
          <Button
              href="/login/register"
              label="Register"
              color="info"
              outline
              isGrouped
          />
        </Buttons>

      </Form>
    </Formik>
  );
}
