import React from "react";
import { MenuAsideItem } from "../../../_interfaces";
import AsideMenuItem from "./Item";
import AdminOnly from "../../../_components/AdminOnly";

type Props = {
  menu: MenuAsideItem[];
  isDropdownList?: boolean;
  className?: string;
  onRouteChange: () => void;
};

export default function AsideMenuList({
  menu,
  isDropdownList = false,
  className = "",
  ...props
}: Props) {
  return (
    <ul className={className}>
      {menu.map((item, index) => {
        // 如果是管理员专用菜单，则需要管理员权限
        if (item.label === "后台管理" || item.label === "仪表盘") {
          return (
            <AdminOnly key={index}>
              <AsideMenuItem
                item={item}
                isDropdownList={isDropdownList}
                onRouteChange={props.onRouteChange}
              />
            </AdminOnly>
          );
        }
        
        return (
          <AsideMenuItem
            key={index}
            item={item}
            isDropdownList={isDropdownList}
            onRouteChange={props.onRouteChange}
          />
        );
      })}
    </ul>
  );
}
