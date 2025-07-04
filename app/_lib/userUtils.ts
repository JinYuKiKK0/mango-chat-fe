// 用户信息工具函数

export interface LoginData {
  code: number;
  message: string;
  data: {
    user_id: string;
    isAdmin: string;
    token: string;
  };
  column: null;
}

export interface UserInfo {
  id: number;
  avatar: string | null;
  name: string;
  email: string;
  banStatus: number;
  registeredAt: string;
  updatedAt: string;
}

/**
 * 从localStorage获取当前用户ID
 * @returns 用户ID或undefined
 */
export const getCurrentUserId = (): number | undefined => {
  if (typeof window !== 'undefined') {
    // 从localStorage获取登录响应数据
    const loginData = localStorage.getItem('loginData');
    if (loginData) {
      try {
        const data: LoginData = JSON.parse(loginData);
        // 从登录响应中获取user_id
        return parseInt(data.data?.user_id) || undefined;
      } catch (error) {
        console.error('解析登录数据失败:', error);
      }
    }
  }
  
  console.warn('无法获取用户ID');
  return undefined;
};

/**
 * 从localStorage获取登录数据
 * @returns 登录数据或null
 */
export const getLoginData = (): LoginData | null => {
  if (typeof window !== 'undefined') {
    const loginData = localStorage.getItem('loginData');
    if (loginData) {
      try {
        return JSON.parse(loginData);
      } catch (error) {
        console.error('解析登录数据失败:', error);
      }
    }
  }
  return null;
};

/**
 * 获取当前用户是否为管理员
 * @returns 是否为管理员
 */
export const getCurrentUserIsAdmin = (): boolean => {
  const loginData = getLoginData();
  return loginData?.data?.isAdmin === 'true';
};

/**
 * 清理用户相关的localStorage数据
 */
export const clearUserData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('loginData');
    localStorage.removeItem('authToken');
  }
};

/**
 * 用户退出登录
 * @param dispatch Redux dispatch函数
 * @param router Next.js路由器
 */
export const logoutUser = (dispatch?: any, router?: any): void => {
  // 清理localStorage数据
  clearUserData();
  
  // 重置Redux状态
  if (dispatch) {
    dispatch({
      type: 'main/setUser',
      payload: {
        name: '',
        email: null
      }
    });
  }
  
  // 重定向到登录页
  if (router) {
    router.push('/login');
  } else if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}; 