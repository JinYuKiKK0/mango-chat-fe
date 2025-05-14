"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import Button from "../../../_components/Button";
import Buttons from "../../../_components/Buttons";
import Divider from "../../../_components/Divider";
import FormField from "../../../_components/FormField";
import FormCheckRadio from "../../../_components/FormField/CheckRadio";
import { registerUser, RegisterForm } from "../../../api/api";
import { useState } from 'react';
import NotificationBar from '../../../_components/NotificationBar';
import { mdiCheckCircle, mdiAlert } from '@mdi/js';


export default function RegForm() {
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

  // 处理注册的提交事件。成功后跳转登录页面
  const handleSubmit = async (formValues: RegisterForm) => {
    try {
      const result = await registerUser(formValues);
      console.log("Registration success:", result);

      displayNotification('success', '注册成功！');

      setTimeout(() => {
        router.push("/login");
      }, 1000);


    } catch (err: any) {
      console.error("Registration error:", err);
      displayNotification('warning', err.message || '注册失败，请重试。');
    }
  };

  const initialValues: RegisterForm = {
    name: "",
    email: "",
    password: "",
  };

  // 根据通知类型选择对应的颜色和图标
  const notificationColor = notificationType === 'success' ? 'success' : 'warning';
  const notificationIcon = notificationType === 'success' ? mdiCheckCircle : mdiAlert;

  return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          {/* 根据 showNotification 状态条件渲染 NotificationBar */}
          {showNotification && notificationType && (
              <NotificationBar
                  color={notificationColor}
                  icon={notificationIcon}
                  // 移除示例中的 button 和 outline={values.outline}，因为它们不是核心需求且 values.outline 不适用于 NotificationBar
                  // 如果 NotificationBar 组件需要 outline prop，可以根据需要添加，例如 outline={false}
              >
                {/* 在 NotificationBar 内部显示消息 */}
                {notificationMessage}
              </NotificationBar>
          )}


          <FormField label="Name" help="Please enter your name">
            {({ className }) => <Field name="name" className={className} />}
          </FormField>
          <FormField label="Email" help="Please enter your email address">
            {({ className }) => <Field name="email" className={className} />}
          </FormField>
          <FormField label="Password" help="Please enter your password">
            {({ className }) => (
                <Field name="password" type="password" className={className} />
            )}
          </FormField>


          <FormCheckRadio type="checkbox" label="Remember">
            <Field type="checkbox" name="remember" />
          </FormCheckRadio>

          <Divider />

          <Buttons>
            <Button type="submit" label="Register" color="info" isGrouped />
            <Button
                href="/dashboard" // 这个按钮的 href 保持不变，与注册结果无关
                label="Home"
                color="info"
                outline
                isGrouped
            />
          </Buttons>
        </Form>
      </Formik>
  );
}