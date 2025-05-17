import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiChat,
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
    ],
  },

  {
    href: "/dashboard/forms",
    label: "Forms",
    icon: mdiSquareEditOutline,
  },
  {
    href: "/dashboard/ui",
    label: "UI",
    icon: mdiTelevisionGuide,
  },
  {
    href: "/dashboard/responsive",
    label: "Responsive",
    icon: mdiResponsive,
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
  {
    href: "/error",
    label: "Error",
    icon: mdiAlertCircle,
  },

];

export default menuAside;
