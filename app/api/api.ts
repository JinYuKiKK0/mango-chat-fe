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

export type UserForm = {
    name: string;
    email: string;
    password: string;
    banStatus: string;
};
export async function getUserList() {
    return authenticatedFetch("/api/admin/user/list", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export async function getUserById(id: number) {
    const url = `/api/admin/user?user_id=${encodeURIComponent(id)}`;

    return authenticatedFetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function deleteUserById(id: number) {
    const url = `/api/admin/user?user_id=${encodeURIComponent(id)}`;
    return authenticatedFetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

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
  export async function getAnnouncementList(page: number = 0, pageSize: number = 10): Promise<AnnouncementListResponse> {
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
    const url = `/api/admin/announcement?announcement_id=${encodeURIComponent(id)}`;
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
  export async function getTipList(page: number = 0, pageSize: number = 10): Promise<TipListResponse> {
    const url = `/api/admin/tips/list?page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`;
    // Assuming authenticatedFetch returns the `data` part.
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