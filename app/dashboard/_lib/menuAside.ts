import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiTable,
  mdiViewList,
  mdiChat,
  mdiShield,
  mdiAccountGroup,
  mdiAccountMultiple,
  mdiKey,
} from "@mdi/js";
import { MenuAsideItem } from "../../_interfaces";

const menuAside: MenuAsideItem[] = [
  {
    href: "/basic-chat",
    label: "Basic Chat",
    icon: mdiChat,
  },
  {
    href: "/dashboard",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    label: "后台管理",
    icon: mdiViewList,
    menu: [
      {
        href: "/admin/user",
        label: "用户管理",
        icon: mdiTable,
      },
      {
        href: "/admin/announcements",
        label: "公告管理",
        icon: mdiAccountCircle,
      },
      {
        href: "/admin/tips",
        label: "Tips管理 ",
        icon: mdiTable,
      },
      {
        href: "/admin/api-keys",
        label: "API-Key",
        icon: mdiKey,
      },
      {
        href: "/admin/permissions",
        label: "权限管理",
        icon: mdiShield,
      },
      {
        href: "/admin/roles",
        label: "角色管理",
        icon: mdiAccountGroup,
      },
      {
        href: "/admin/groups",
        label: "群组管理",
        icon: mdiAccountMultiple,
      },
    ],
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: mdiAccountCircle,
  },
  {
    href: "/login",
    label: "Login",
    icon: mdiLock,
  },
];

export default menuAside;
