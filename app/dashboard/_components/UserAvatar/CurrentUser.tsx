import React, { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../../_stores/hooks";
import { getCurrentUserId } from "../../../_lib/userUtils";
import { getUserSelfInfo } from "../../../api/api";
import UserAvatar from ".";

type Props = {
  className?: string;
  children?: ReactNode;
};

export default function UserAvatarCurrentUser({
  className = "",
  children,
}: Props) {
  const userEmail = useAppSelector((state) => state.main.userEmail);
  const [realAvatar, setRealAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      const userId = getCurrentUserId();
      if (userId) {
        try {
          const response = await getUserSelfInfo(userId);
          if (response.code === 200 && response.data.avatar) {
            setRealAvatar(response.data.avatar);
          }
        } catch (error) {
          console.error('获取用户头像失败:', error);
        }
      }
    };

    fetchUserAvatar();
  }, []);

  // 如果有真实头像，显示真实头像；否则显示生成的头像
  if (realAvatar) {
    return (
      <div className={className}>
        <img
          src={realAvatar}
          alt="用户头像"
          className="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800 object-cover"
        />
        {children}
      </div>
    );
  }

  return (
    <UserAvatar username={userEmail ?? ""} className={className}>
      {children}
    </UserAvatar>
  );
}
