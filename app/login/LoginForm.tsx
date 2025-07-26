"use client";

import {Formik, Form, Field, FormikErrors, ErrorMessage} from "formik";
import { useRouter } from "next/navigation";
import Button from "../_components/Button";
import Buttons from "../_components/Buttons";
import Divider from "../_components/Divider";
import FormField from "../_components/FormField";
import FormCheckRadio from "../_components/FormField/CheckRadio";
import {LgForm, loginUser, getUserSelfInfo} from "../api/api";
import {useEffect, useState} from "react";
import NotificationBar from "../_components/NotificationBar";
import {mdiAlert, mdiCheckCircle} from "@mdi/js";
import { useAppDispatch } from "../_stores/hooks";
import { setUser } from "../_stores/mainSlice";
import { getCurrentUserId } from "../_lib/userUtils";
import {defaultApi} from "../api";

// 校验函数
const loginFormValidate = (values: RegisterRequest): FormikErrors<RegisterRequest> => {
  const errors: FormikErrors<RegisterRequest> = {};

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

  return errors;
};

export default function LoginForm() {
  const router = useRouter();

  // 如果已经登录，则跳转到basic-chat页面
  useEffect(() => {
    if (getCurrentUserId()) {
      router.push("/basic-chat");
    }
  }, [router]);


  const dispatch = useAppDispatch();

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
      const result = await defaultApi.login({loginRequest: formValues})

      if (result.code !== 200){
        displayNotification('warning', result.message ?? '登录失败，请重试。');
        return;
      }

      if (result && result.data && result.data.token) {
        // 保存token
        localStorage.setItem('authToken', result.data.token);
        // 保存完整的登录响应数据，包含user_id
        localStorage.setItem('loginData', JSON.stringify(result));

        // 获取用户详细信息并更新Redux store
        try {
          const userId = getCurrentUserId();
          if (userId) {
            const userInfoResponse = await getUserSelfInfo(userId);
            if (userInfoResponse.code === 200) {
              dispatch(setUser({
                name: userInfoResponse.data.name,
                email: userInfoResponse.data.email
              }));
            }
          }
        } catch (error) {
          console.error("获取用户信息失败:", error);
        }
      }

      displayNotification('success', '登录成功！');

      setTimeout(async () => {
        // 根据用户角色跳转到不同页面
        try {
          const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
          if (loginData.data?.isAdmin === 'true') {
            router.push("/dashboard");
          } else {
            router.push("/basic-chat");
          }
        } catch (error) {
          console.error("解析登录数据失败:", error);
          router.push("/basic-chat"); // 默认跳转到聊天页面
        }
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={loginFormValidate}>
      <Form>
        {showNotification && notificationType && (
            <NotificationBar
                color={notificationColor}
                icon={notificationIcon}
            >
              {notificationMessage}
            </NotificationBar>
        )}


        <FormField label="邮箱" help="">
          {({ className }) => <Field name="email" className={className} />}
        </FormField>
        <div className="h-5">
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
        </div>

        <FormField label="密码" help="">
          {({ className }) => (<Field name="password" type="password" className={className} />)}
        </FormField>
        <div className="h-5">
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
        </div>

        <Divider />

        <Buttons>
          <Button type="submit" label="登录" color="info" isGrouped />
          <Button
              href="/login/register"
              label="注册"
              color="info"
              outline
              isGrouped
          />
        </Buttons>

      </Form>
    </Formik>
  );
}
