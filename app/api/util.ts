import {API_BASE_URL} from "./api"
import { clearUserData } from "../_lib/userUtils"

const getAuthToken = () => {
    // 在客户端代码中访问 localStorage
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

const setAuthToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
    }
};

const removeAuthToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
    }
};

export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<any> {
    const token = getAuthToken();

    const headers = new Headers(options.headers);

    // 如果存在 token 且请求头中没有 Authorization，则添加 Authorization 头部
    if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, { // 使用 API_BASE_URL + url
            ...options,
            headers: headers,
        });

        // *** 添加检查 X-New-Token 头部并更新 token 的逻辑 ***
        const newToken = response.headers.get('X-New-Token');
        if (newToken) {
            console.log('X-New-Token header found. Updating token...');
            setAuthToken(newToken); // 使用辅助函数更新 token
        }
        // ***************************************************

        // 检查响应状态码
        if (!response.ok) {
            // 检查是否是认证失败的错误码 (例如 401 Unauthorized, 403 Forbidden)
            if (response.status === 401 || response.status === 403) {
                console.error("Authentication failed or token expired. Clearing user data.");
                clearUserData(); // 清理所有用户数据
                // 在实际应用中，这里可能还需要触发一个全局事件或重定向到登录页
                // 例如：EventBus.emit('auth-expired'); 或 router.push('/login');
                // 注意：在这里直接调用 router 需要获取 router 实例，或通过抛出特定错误由上层处理
            }

            // 尝试解析错误信息，但要注意响应体可能不是 JSON
            let errorDetail = `Request failed with status ${response.status}`;
            try {
                const errorJson = await response.json();
                // 假设错误响应体有 message 字段
                errorDetail = errorJson.message || JSON.stringify(errorJson);
            } catch (e) {
                // 如果响应体不是 JSON，则使用默认错误信息
                console.warn("Failed to parse error response body as JSON.", e);
            }
            // 抛出包含状态码和详细信息的错误
            const error = new Error(`API Error ${response.status}: ${errorDetail}`);
            (error as any).response = response; // 附加原始响应对象，以便更详细处理
            throw error;
        }

        // 默认情况下，返回解析后的 JSON 数据
        // 如果某个请求不需要解析JSON，可以调整此函数或创建另一个辅助函数
        try {
            return await response.json();
        } catch (e) {
            // 如果响应体为空或不是 JSON，返回原始响应或 null
            console.warn("Response body is not JSON or empty.", e);
            return response; // 或者 return null; 视情况而定
        }

    } catch (error) {
        console.error("Error during authenticated fetch:", error);
        // 重新抛出错误，以便调用方可以捕获和处理
        throw error;
    }
}