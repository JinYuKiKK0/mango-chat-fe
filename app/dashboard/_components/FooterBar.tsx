import React, { ReactNode } from "react";
import { containerMaxW } from "../../_lib/config";

type Props = {
  children: ReactNode;
};

export default function FooterBar({ children }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className={`py-2 px-6 ${containerMaxW}`}>
      <div className="block md:flex items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <b>
            &copy;{year},{` `}
            Mango Chat 管理系统
          </b>
          {` `}
          {children}
        </div>
        <div className="md:py-2 text-sm text-gray-500">
          基于 Next.js 构建
        </div>
      </div>
    </footer>
  );
}
