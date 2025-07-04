'use client'

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { mdiAccount, mdiLock } from "@mdi/js";
import Button from "../../../_components/Button";
import FormField from "../../../_components/FormField";
import { UserSelfInfoForm } from "../../../api/api";

interface UserInfo {
  id: number;
  avatar: string | null;
  name: string;
  email: string;
  banStatus: number;
  registeredAt: string;
  updatedAt: string;
}

interface ProfileEditModalProps {
  userInfo: UserInfo;
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: UserSelfInfoForm) => void;
}

export default function ProfileEditModal({
  userInfo,
  isOpen,
  onClose,
  onSave
}: ProfileEditModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (values: { name: string; password: string; confirmPassword: string }) => {
    // 验证昵称不能为空
    if (!values.name.trim()) {
      alert('昵称不能为空');
      return;
    }

    // 验证密码确认（仅当输入了新密码时）
    if (values.password && values.password !== values.confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }

    // 如果输入了密码，验证密码长度
    if (values.password && values.password.length < 6) {
      alert('密码长度不能少于6位');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData: UserSelfInfoForm = {
        name: values.name.trim(),
        password: values.password || '', // 空字符串表示不修改密码
        avatar: userInfo.avatar || '' // 保持当前头像
      };
      
      await onSave(formData);
    } catch (error) {
      console.error('更新失败:', error);
      alert('更新失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md space-y-4 relative">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl transition-colors"
          disabled={isSubmitting}
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6">修改个人信息</h2>

        <Formik
          initialValues={{
            name: userInfo.name,
            password: '',
            confirmPassword: ''
          }}
          onSubmit={handleSubmit}
        >
          {({ values, isValid }) => (
            <Form className="space-y-4">
              {/* 昵称 */}
              <FormField label="昵称" icon={mdiAccount}>
                {({ className }) => (
                  <Field
                    name="name"
                    placeholder="请输入昵称"
                    className={className}
                    required
                  />
                )}
              </FormField>

              {/* 新密码 */}
              <FormField 
                label="新密码" 
                help="留空表示不修改密码"
                icon={mdiLock}
              >
                {({ className }) => (
                  <Field
                    name="password"
                    type="password"
                    placeholder="请输入新密码（可选）"
                    className={className}
                  />
                )}
              </FormField>

              {/* 确认密码 */}
              {values.password && (
                <FormField 
                  label="确认密码"
                  icon={mdiLock}
                >
                  {({ className }) => (
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="请再次输入密码"
                      className={className}
                      required={!!values.password}
                    />
                  )}
                </FormField>
              )}

              {/* 按钮组 */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  label="取消"
                  color="lightDark"
                  onClick={onClose}
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  label={isSubmitting ? "保存中..." : "保存"}
                  color="info"
                  disabled={isSubmitting || !isValid}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
} 