// api/api.ts

export const API_BASE_URL = "http://8.153.175.3";

import {authenticatedFetch} from "./util";

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


// =================================================================
// 1. 登录/鉴权 模块
// =================================================================

/**
 * 1.1 登录
 * @param {LoginRequest} credentials - 用户的邮箱和密码。
 * @returns {Promise<BaseResponse<LoginResponseData>>} 包含 JWT token 的 API 响应。
 */
export async function login(credentials: LoginRequest): Promise<BaseResponse<LoginResponseData>> {
    return authenticatedFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

/**
 * 1.2 注册
 * @param {RegisterRequest} userInfo - 新用户的用户名、邮箱和密码。
 * @returns {Promise<BaseResponse<string>>} 确认注册成功的 API 响应。
 */
export async function register(userInfo: RegisterRequest): Promise<BaseResponse<string>> {
    return authenticatedFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userInfo),
    });
}

/**
 * 1.3 重置密码
 * @param {ResetPasswordRequest} data - 用户的邮箱、新密码和验证码。
 * @returns {Promise<BaseResponse<any>>} 确认密码重置的 API 响应。
 */
export async function resetPassword(data: ResetPasswordRequest): Promise<BaseResponse<any>> {
    return authenticatedFetch('/api/auth/reset', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}


// =================================================================
// 2. ai-chat 模块
// =================================================================

/**
 * 2.1 基础对话 (SSE)
 * 此函数初始化一个服务器发送事件 (SSE) 连接。
 * 它返回原始的 Response 对象，以便调用者可以处理流。
 * @param {StreamChatRequest} data - 聊天消息和可选的会话 ID。
 * @returns {Promise<Response>} 原始的 fetch Response 对象，用于读取流。
 */
export async function startStreamChat(data: StreamChatRequest): Promise<Response> {
    // 注意：我们返回原始响应，以便在调用组件中处理流。
    return authenticatedFetch('/api/chat/stream/v2', {
        method: 'POST',
        headers: {
            'Accept': 'text/event-stream', // 对 SSE 很重要
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        responseType: "stream"
    });
}

/**
 * 2.2.2 获取限流提醒信息
 * @param {string} userId - 用户的 ID。
 * @returns {Promise<RateLimitReminderResponse>} 用户的剩余消息数和刷新时间。
 */
export async function getRateLimitReminder(userId: string): Promise<RateLimitReminderResponse> {
    const url = `/api/chat/remain_msg?user_id=${encodeURIComponent(userId)}`;
    return authenticatedFetch(url, {
        method: 'GET',
    });
}

/**
 * 2.3.1 获取对话记录列表（标题）
 * @param {string} userId - 用户的 ID。
 * @param {number} [lastSessionId] - 用于分页的游标。首页请求时省略。
 * @param {number} [pageSize=10] - 每页的项目数。
 * @returns {Promise<ConversationListResponse>} 分页的会话标题列表。
 */
export async function getConversationList(userId: number, lastSessionId?: number, pageSize: number = 10): Promise<ConversationListResponse> {
    let url = `/api/chat/list?user_id=${encodeURIComponent(userId)}&page_size=${pageSize}`;
    if (lastSessionId) {
        url += `&lastSessionId=${lastSessionId}`;
    }
    return authenticatedFetch(url, {
        method: 'GET',
    });
}

/**
 * 2.3.2 根据ID查询会话详细信息
 * @param {string} userId - 用户的 ID。
 * @param {number} sessionId - 会话的 ID。
 * @returns {Promise<BaseResponse<ConversationDetailData>>} 会话的详细信息和上下文。
 */
export async function getConversationDetails(userId: number, sessionId: number): Promise<BaseResponse<ConversationDetailData>> {
    const url = `/api/chat/info?user_id=${encodeURIComponent(userId)}&session_id=${sessionId}`;
    return authenticatedFetch(url, {
        method: 'GET',
    });
}


// =================================================================
// 2.4 公告查询模块
// =================================================================

/**
 * 2.4.1 查询有效公告列表
 * @returns {Promise<BaseResponse<AnnouncementListItem[]>>} 一个包含有效公告的列表。
 */
export async function getPublicAnnouncementList(): Promise<BaseResponse<AnnouncementListItem[]>> {
    return authenticatedFetch('/api/announcement/list', {
        method: 'GET',
    });
}

/**
 * 2.4.2 根据ID查询公告详细信息
 * @param {number} announcementId - 公告的 ID。
 * @returns {Promise<BaseResponse<AnnouncementDetailData>>} 公告的完整详情。
 */
export async function getPublicAnnouncementDetails(announcementId: number): Promise<BaseResponse<AnnouncementDetailData>> {
    const url = `/api/announcement?a_id=${announcementId}`;
    return authenticatedFetch(url, {
        method: 'GET',
    });
}



//3. 后台管理-基础部分

//3.0用户个人信息管理
export type UserSelfInfoForm = {
  name: string;
  password: string;
  avatar: string;
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
    MINUTE = 'minute',
    HOUR = 'hour',
    DAY = 'day',
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
  //4.2.5 获取角色类型列表
  export async function getRoleTypes() {
    const url = `/api/admin/role/types`;
    return authenticatedFetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
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
