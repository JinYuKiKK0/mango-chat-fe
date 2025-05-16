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
