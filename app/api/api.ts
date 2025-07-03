// api/api.ts

export const API_BASE_URL = "http://localhost:8080";

import {authenticatedFetch} from "./util"



// 用户注册
export type RegisterForm = {
    name: string;
    email: string;
    password: string;
};
export async function registerUser(formData: RegisterForm) {
    const response = await fetch(API_BASE_URL + "/api/auth/register", {
        method: "POST",
        // mode: 'no-cors',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
        throw new Error(data.message || "Registration failed");
    }

    return data;
}


export type LgForm = {
    email: string;
    password: string;
};
export async function loginUser(formData: LgForm) {
    const response = await fetch(API_BASE_URL + "/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    console.log(data.data.token);
    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }
    return data;
}

//2. ai-chat模块
//2.1 创建对话（创建对话也是访问基础对话接口，只是首次访问会留空'conversation_id'字段。）
//2.1 基础对话
export interface ChatForm {
    key: string;
}

// 2.1.1 发送消息
export async function sendMessage(formData: ChatForm) {
    return authenticatedFetch("/api/chat", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
}

// 2.1.2 流式对话接口
export async function sendMessageStream(formData: ChatForm) {
    return authenticatedFetch("/api/chat/stream", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
}

// 2.1.3 流式对话接口v2
export async function sendMessageStreamV2(formData: ChatForm) {
    return authenticatedFetch("/api/chat/stream/v2", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
}

//2.2 对话记录管理
//2.2.1 获取对话记录列表（标题）

//2.2.2 按id查询详细信息



//3. 后台管理-基础部分

//3.0用户个人信息管理
export type UserSelfInfoForm = {
  name: string;
  email: string;
  password: string;
  avater: string;
}

//3.0.1 查询用户个人信息
export async function getUserSelfInfo(userId: number) {
    const url = `/api/users/self?user_id=${encodeURIComponent(userId)}`;
    return authenticatedFetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

//3.0.2 修改用户个人信息
export async function updateUserSelfInfo(userId: number, formData: UserSelfInfoForm) {
  const url = `/api/users/self?user_id=${encodeURIComponent(userId)}`;
  return authenticatedFetch(url, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
}

//3.1 用户管理
export type UserForm = {
    name: string;
    email: string;
    password: string;
    banStatus: string;
};
//3.1.1 查询用户列表
export async function getUserList(page: number = 0, pageSize: number = 10) {
    const url = `/api/admin/user/list?page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`;
    return authenticatedFetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
//3.1.2.1 查询用户
export async function getUserById(id: number) {
    const url = `/api/admin/user?user_id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
//3.1.2.2 新增用户
export async function createUser(formData: RegisterForm,avater: string) {
    return authenticatedFetch("/api/admin/user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({formData,avater}),
    })
}
//3.1.2.3 修改用户
export async function updateUserById(id: number, formData: RegisterForm) {
    const url = `/api/admin/user?user_id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
}
//3.1.2.4 删除用户
export async function deleteUserById(id: number) {
    const url = `/api/admin/user?user_id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

//3.1.3 用户状态管理
//3.1.3.1 查询用户状态
export async function getUserStatus(userId: number) {
  const url = `/api/admin/user/status?user_id=${encodeURIComponent(userId)}`;
  return authenticatedFetch(url, {
    method: "GET",
  });
}
//3.1.3.2 修改用户状态
export async function updateUserStatus(userId: number, status: number) {
    const url = `/api/admin/user/status?user_id=${encodeURIComponent(userId)}&status=${encodeURIComponent(status)}`;
    return authenticatedFetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

//3.2 对话上下文管理

//3.2.1 查询所有对话列表
export async function getChatContextList(page: number = 0, pageSize: number = 10) {
    const url = `/api/admin/chat/context/list?page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`;
    return authenticatedFetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

//3.2.2 查询对话详情
export async function getChatContextById(contextId: number) {
    const url = `/api/admin/chat/context?c_id=${encodeURIComponent(contextId)}`;
    return authenticatedFetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
}



//3.3 公告管理
// Announcement types and interfaces
export interface Announcement {
    id: number;
    title: string;
    content?: string; // content is present in getById, ensure it's optional here
    effectiveTime: string | null;
    expirationTime: string | null;
    createdAt: string;
    updatedAt: string;
  }
  
  // 通用API响应格式
  export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
    column?: Array<{
      column: string;
      value: string;
    }>;
  }

  // 分页数据格式
  export interface PagedData<T> {
    content: T[];
    page: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  }

  export interface AnnouncementListResponse {
    content: Announcement[];
    page: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  }
  
  export interface AnnouncementFormData {
    title: string;
    content: string; // content is required for creation/update
    effectiveTime: string | null;
    expirationTime: string | null;
  }
  
  // 3.3.1.0 查询公告列表
  export async function getAnnouncementList(page: number = 0, pageSize: number = 10): Promise<ApiResponse<PagedData<Announcement>>> {
    const url = `/api/admin/announcement/list?page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`;
    return authenticatedFetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  // 3.3.1.1 根据id获取公告信息
  export async function getAnnouncementById(id: number): Promise<Announcement> {
    const url = `/api/admin/announcement?a_id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  // 3.3.1.2 添加公告
  export async function createAnnouncement(formData: AnnouncementFormData): Promise<null> {
    return authenticatedFetch("/api/admin/announcement", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }
  
  // 3.3.1.3 修改公告
  export async function updateAnnouncement(id: number, formData: AnnouncementFormData): Promise<null> {
    const url = `/api/admin/announcement?announcement_id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }
  
  // 3.3.1.4 删除公告
  export async function deleteAnnouncement(id: number): Promise<null> {
    const url = `/api/admin/announcement?a_id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  // Tips types and interfaces
  export interface Tip {
    id: number;
    title: string;
    content?: string; // content is present in getById
    createdAt: string | null;
    updatedAt: string | null;
  }
  
  export interface TipListResponse {
    content: Tip[];
    page: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  }
  
  export interface TipForm {
    title: string;
    content: string; // content is required for creation/update
  }
  
  // 3.3.2.0 查询Tips列表
  export async function getTipList(page: number = 0, pageSize: number = 10): Promise<ApiResponse<PagedData<Tip>>> {
    const url = `/api/admin/tips/list?page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`;
    return authenticatedFetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  // 3.3.2.1 获取Tips信息
  export async function getTipById(id: number): Promise<Tip> {
    const url = `/api/admin/tips?id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  // 3.3.2.2 新建Tips
  export async function createTip(formData: TipForm): Promise<null> {
    return authenticatedFetch("/api/admin/tips", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }
  
  // 3.3.2.3 更新Tips
  export async function updateTip(id: number, formData: TipForm): Promise<null> {
    const url = `/api/admin/tips?id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }
  
  // 3.3.2.4 删除Tips
  export async function deleteTip(id: number): Promise<null> {
    const url = `/api/admin/tips?id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  //3.4.1 api-key管理
  
  // API Key types and interfaces
  export interface ApiKeyForm {
    id?: number;
    name?: string;
    apiKey?: string;
  }

  export interface ApiKeyListResponse {
    content: any[];
    page: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  }

  //3.4.1.0 获取api-key列表
  export async function getApiKeyList(page: number = 0, pageSize: number = 10): Promise<any> {
    const url = `/api/admin/apikey/list?page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`;
    return authenticatedFetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  //3.4.1.1 根据id获取api-key
  export async function getApiKeyById(id: number) {
    const url = `/api/admin/apikey?id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  //3.4.1.2 新增api-key
  export async function createApiKey(formData: ApiKeyForm) {
    return authenticatedFetch("/api/admin/apikey", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }

  //3.4.1.3 更新api-key
  export async function updateApiKey(id: number, formData: ApiKeyForm) {
    const url = `/api/admin/apikey?id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  }

  //3.4.1.4 删除api-key
  export async function deleteApiKey(id: number) {
    const url = `/api/admin/apikey?id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  //4. 后台管理-权限管理
  //4.1 权限管理
  
  // 声明时间窗口单位枚举
  export enum TimeWindowUnit {
    SECOND = 'SECOND',
    MINUTE = 'MINUTE',
    HOUR = 'HOUR',
    DAY = 'DAY',
  }

  export interface PermissionForm{
    limitCount: number;
    timeWindowUnit: TimeWindowUnit;
    timeWindow: number;
  }
  //4.1.1.0 获取权限列表
  export async function getPermissionList(page: number = 0, pageSize: number = 10){
    return authenticatedFetch(`/api/admin/permission/list?page=${page}&pageSize=${pageSize}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  //4.1.1.1 根据id获取权限信息
  export async function getPermissionById(id: number){
    return authenticatedFetch(`/api/admin/permission/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  //4.1.1.2 新增权限
  export async function createPermission(formData: PermissionForm){
    return authenticatedFetch("/api/admin/permission",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
  }
  //4.1.1.3 更新权限
  export async function updatePermission(id: number, formData: PermissionForm){
    return authenticatedFetch(`/api/admin/permission/${id}`,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
  }
  //4.1.1.4 删除权限
  export async function deletePermission(id: number){
    return authenticatedFetch(`/api/admin/permission/${id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  //4.2 角色管理
  export interface RoleForm{
    name: string;
    roleType: number;
    rank: number;
    autoAdd: boolean;
  }
  //4.2.0 获取角色列表
  export async function getRoleList(page: number = 0, pageSize: number = 10 ){
    return authenticatedFetch(`/api/admin/role/list?page=${page}&pageSize=${pageSize}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  //4.2.1 根据id获取角色信息
  export async function getRoleById(id: number){
    return authenticatedFetch(`/api/admin/role/${id}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  //4.2.2 新增角色
  export async function createRole(formData: RoleForm){
    return authenticatedFetch("/api/admin/role",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
  }
  //4.2.3 更新角色
  export async function updateRole(id: number, formData: RoleForm){
    return authenticatedFetch(`/api/admin/role/${id}`,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
  }
  //4.2.4 删除角色
  export async function deleteRole(id: number){
    return authenticatedFetch(`/api/admin/role/${id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  //4.3 角色权限管理
  //4.3.1 获取角色权限列表
  export async function getRolePermissionList(id: number){
    return authenticatedFetch(`/api/admin/role/${id}/permissions`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }  
  //4.3.2 根据角色id批量添加权限
  export async function addRolePermission(id: number, permissionIds: number[]){
    return authenticatedFetch(`/api/admin/role/${id}/permissions`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(permissionIds),
    })
  }
  //4.3.3 根据角色id批量删除权限
  export async function deleteRolePermission(id: number, permissionIds: number[]){
    const url = `/api/admin/role/${id}/permissions`;
    return authenticatedFetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(permissionIds),
    });
  }
  //4.4 用户组管理
  export interface UserGroupForm{
    name: string;
    type: string;
  }
  //4.4.0 获取用户组列表
  export async function getUserGroupList(page: number = 0, pageSize: number = 10){
    return authenticatedFetch(`/api/admin/group/list?page=${page}&pageSize=${pageSize}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  //4.4.1 根据id获取用户组信息
  export async function getUserGroupById(id: number){
    return authenticatedFetch(`/api/admin/group/${id}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  //4.4.2 新增用户组
  export async function createUserGroup(formData: UserGroupForm){
    return authenticatedFetch("/api/admin/group",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
  }
  //4.4.3 更新用户组
  export async function updateUserGroup(id: number, formData: UserGroupForm){
    return authenticatedFetch(`/api/admin/group/${id}`,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
  }
  //4.4.4 删除用户组
  export async function deleteUserGroup(id: number){
    return authenticatedFetch(`/api/admin/group/${id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  //4.4.5 组成员管理
  //4.4.5.1 获取组成员列表
  export async function getUserGroupMemberList(id: number, page: number = 0, pageSize: number = 10){
    return authenticatedFetch(`/api/admin/group/${id}/members/list?page=${page}&pageSize=${pageSize}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  //4.4.5.2 新增组成员
  export async function addUserGroupMember(id: number, memberIds: number[]){
    return authenticatedFetch(`/api/admin/group/${id}/members`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberIds),
    })
  }
  //4.4.5.3 删除组成员
  export async function deleteUserGroupMember(id: number, memberIds: number[]){
    return authenticatedFetch(`/api/admin/group/${id}/members`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberIds),
    })
  }
  //4.4.6 组角色管理
  //4.4.6.1 获取组角色列表
  export async function getUserGroupRoleList(id: number,page: number = 0, pageSize: number = 10){
    return authenticatedFetch(`/api/admin/group/${id}/roles/list?page=${page}&pageSize=${pageSize}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  //4.4.6.2 新增组角色
  export async function addUserGroupRole(id: number, roleIds: number[]){
    return authenticatedFetch(`/api/admin/group/${id}/roles`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleIds),
    })
  }
  //4.4.6.3 删除组角色
  export async function deleteUserGroupRole(id: number, roleIds: number[]){
    return authenticatedFetch(`/api/admin/group/${id}/roles`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleIds),
    })
  }
  //4.5 用户角色配置
  //4.5.1 获取用户最高级别的角色
  export async function getUserRole(id: number){
    return authenticatedFetch(`/api/admin/user/${id}/roles`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  //4.5.2 根据用户id批量添加角色
  export async function addUserRole(id: number, roleIds: number[]){
    return authenticatedFetch(`/api/admin/user/${id}/roles`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleIds),
    })
  }
  //4.5.3 根据用户id批量删除角色
  export async function deleteUserRole(id: number, roleIds: number[]){
    return authenticatedFetch(`/api/admin/user/${id}/roles`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleIds),
    })
  }

  export async function getRoleTypes() {
    const url = `/api/admin/role/types`;
    return authenticatedFetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
  }