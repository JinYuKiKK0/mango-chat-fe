'use client'

import { ReactNode, useEffect, useState } from 'react';
import { getCurrentUserIsAdmin } from '../_lib/userUtils';

interface AdminOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * 管理员权限检查组件
 * 只有管理员才能看到子组件内容
 */
export default function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    setIsAdmin(getCurrentUserIsAdmin());
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return <div>正在检查权限...</div>;
  }

  if (!isAdmin) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
} 