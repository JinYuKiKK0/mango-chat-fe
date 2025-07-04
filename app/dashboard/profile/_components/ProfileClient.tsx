'use client'

import { useEffect, useState } from "react";
import { mdiAccount, mdiAccountEdit } from "@mdi/js";
import SectionMain from "../../../_components/Section/Main";
import SectionTitleLineWithButton from "../../../_components/Section/TitleLineWithButton";
import CardBox from "../../../_components/CardBox";
import Button from "../../../_components/Button";
import { getUserSelfInfo, updateUserSelfInfo, UserSelfInfoForm } from "../../../api/api";
import ProfileEditModal from "./ProfileEditModal";
import AvatarUpload from "./AvatarUpload";
import { getCurrentUserId } from "../../../_lib/userUtils";

interface UserInfo {
  id: number;
  avatar: string | null;
  name: string;
  email: string;
  banStatus: number;
  registeredAt: string;
  updatedAt: string;
}

export default function ProfileClient() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);



  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const userId = getCurrentUserId();
      
      if (!userId) {
        console.error("无法获取用户ID，请重新登录");
        return;
      }
      
      const response = await getUserSelfInfo(userId);
      
      if (response.code === 200) {
        setUserInfo(response.data);
      } else {
        console.error("获取用户信息失败:", response.message);
      }
    } catch (error) {
      console.error("获取用户信息失败:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 处理个人信息更新
  const handleUpdateProfile = async (formData: UserSelfInfoForm) => {
    try {
      if (!userInfo) return;
      
      const response = await updateUserSelfInfo(userInfo.id, formData);
      
      if (response.code === 200) {
        // 更新成功后重新获取用户信息
        await fetchUserInfo();
        setShowEditModal(false);
        alert('个人信息更新成功！');
      } else {
        alert(`更新失败: ${response.message}`);
      }
    } catch (error) {
      console.error("更新个人信息失败:", error);
      alert('更新失败，请重试');
    }
  };

  // 处理头像更新
  const handleAvatarUpdate = async (avatarUrl: string) => {
    try {
      if (!userInfo) return;
      
      const formData: UserSelfInfoForm = {
        name: userInfo.name,
        password: '', // 不修改密码时传空字符串
        avatar: avatarUrl
      };
      
      const response = await updateUserSelfInfo(userInfo.id, formData);
      
      if (response.code === 200) {
        await fetchUserInfo();
        setShowAvatarUpload(false);
        alert('头像更新成功！');
      } else {
        alert(`头像更新失败: ${response.message}`);
      }
    } catch (error) {
      console.error("头像更新失败:", error);
      alert('头像更新失败，请重试');
    }
  };

  if (loading) {
    return (
      <SectionMain>
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <div className="text-lg text-gray-600">加载个人信息中...</div>
          </div>
        </div>
      </SectionMain>
    );
  }

  if (!userInfo) {
    return (
      <SectionMain>
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl text-gray-300">⚠️</div>
            <div className="text-lg text-red-500">无法加载用户信息</div>
            <Button
              label="重新加载"
              color="info"
              onClick={fetchUserInfo}
            />
          </div>
        </div>
      </SectionMain>
    );
  }

  return (
    <SectionMain>
      <SectionTitleLineWithButton
        icon={mdiAccount}
        title="个人资料"
        main
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：头像和基本信息 */}
        <div className="lg:col-span-1">
          <CardBox>
            <div className="flex flex-col items-center space-y-4">
              {/* 头像 */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {userInfo.avatar ? (
                    <img 
                      src={userInfo.avatar} 
                      alt="用户头像" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl text-gray-400">👤</div>
                  )}
                </div>
                <button
                  onClick={() => setShowAvatarUpload(true)}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                  title="更换头像"
                >
                  📷
                </button>
              </div>
              
              {/* 用户名 */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">{userInfo.name}</h2>
                <p className="text-gray-600">{userInfo.email}</p>
              </div>
              
              {/* 状态信息 */}
              <div className="text-center">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  userInfo.banStatus === 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {userInfo.banStatus === 0 ? '正常' : '被禁用'}
                </span>
              </div>
            </div>
          </CardBox>
        </div>

        {/* 右侧：详细信息 */}
        <div className="lg:col-span-2">
          <CardBox>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">详细信息</h3>
              <Button
                icon={mdiAccountEdit}
                label="修改信息"
                color="info"
                onClick={() => setShowEditModal(true)}
              />
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    用户ID
                  </label>
                  <div className="text-gray-900">{userInfo.id}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    昵称
                  </label>
                  <div className="text-gray-900">{userInfo.name}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱
                  </label>
                  <div className="text-gray-900">{userInfo.email}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    账户状态
                  </label>
                  <div className="text-gray-900">
                    {userInfo.banStatus === 0 ? '正常' : '被禁用'}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    注册时间
                  </label>
                  <div className="text-gray-900">
                    {new Date(userInfo.registeredAt).toLocaleString('zh-CN')}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    最后更新
                  </label>
                  <div className="text-gray-900">
                    {new Date(userInfo.updatedAt).toLocaleString('zh-CN')}
                  </div>
                </div>
              </div>
            </div>
          </CardBox>
        </div>
      </div>

      {/* 编辑个人信息模态框 */}
      {showEditModal && (
        <ProfileEditModal
          userInfo={userInfo}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateProfile}
        />
      )}

      {/* 头像上传模态框 */}
      {showAvatarUpload && (
        <AvatarUpload
          isOpen={showAvatarUpload}
          currentAvatar={userInfo.avatar}
          onClose={() => setShowAvatarUpload(false)}
          onSave={handleAvatarUpdate}
        />
      )}
    </SectionMain>
  );
} 