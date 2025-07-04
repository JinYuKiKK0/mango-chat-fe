import {
  mdiAccountMultiple,
  mdiChatOutline,
  mdiShield,
  mdiAccountGroup,
} from "@mdi/js";
import SectionMain from "../_components/Section/Main";
import SectionTitleLineWithButton from "../_components/Section/TitleLineWithButton";
import CardBoxWidget from "../_components/CardBox/Widget";
import CardBox from "../_components/CardBox";
import { getPageTitle } from "../_lib/config";
import { Metadata } from "next";
import AdminOnly from "../_components/AdminOnly";

export const metadata: Metadata = {
  title: getPageTitle("Dashboard"),
};

export default function DashboardPage() {
  return (
    <AdminOnly 
      fallback={
        <SectionMain>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-6xl text-gray-300 mb-4">🔒</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">权限不足</h2>
              <p className="text-gray-500">您没有权限访问管理后台，请联系管理员</p>
            </div>
          </div>
        </SectionMain>
      }
    >
      <SectionMain>
      <SectionTitleLineWithButton
        icon={mdiAccountGroup}
        title="管理后台总览"
        main
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
        <CardBoxWidget
          trendLabel=""
          trendType="up"
          trendColor="success"
          icon={mdiAccountMultiple}
          iconColor="success"
          number={0}
          label="用户总数"
        />
        <CardBoxWidget
          trendLabel=""
          trendType="up"
          trendColor="info"
          icon={mdiChatOutline}
          iconColor="info"
          number={0}
          label="对话总数"
        />
        <CardBoxWidget
          trendLabel=""
          trendType="up"
          trendColor="warning"
          icon={mdiShield}
          iconColor="warning"
          number={0}
          label="权限配置"
        />
        <CardBoxWidget
          trendLabel=""
          trendType="up"
          trendColor="danger"
          icon={mdiAccountGroup}
          iconColor="danger"
          number={0}
          label="角色配置"
        />
      </div>

      <CardBox>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">快速操作</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a 
              href="/admin/user" 
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">👥</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">用户管理</h4>
                  <p className="text-sm text-gray-600">管理系统用户</p>
                </div>
              </div>
            </a>
            
            <a 
              href="/admin/permissions" 
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🛡️</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">权限管理</h4>
                  <p className="text-sm text-gray-600">配置用户权限</p>
                </div>
              </div>
            </a>
            
            <a 
              href="/admin/roles" 
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">👤</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">角色管理</h4>
                  <p className="text-sm text-gray-600">配置用户角色</p>
                </div>
              </div>
            </a>
            
            <a 
              href="/admin/groups" 
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">👥</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">群组管理</h4>
                  <p className="text-sm text-gray-600">管理用户群组</p>
                </div>
              </div>
            </a>
            
            <a 
              href="/admin/announcements" 
              className="p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">📢</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">公告管理</h4>
                  <p className="text-sm text-gray-600">发布系统公告</p>
                </div>
              </div>
            </a>
            
            <a 
              href="/basic-chat" 
              className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">💬</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">AI 聊天</h4>
                  <p className="text-sm text-gray-600">开始AI对话</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </CardBox>
    </SectionMain>
    </AdminOnly>
  );
}
