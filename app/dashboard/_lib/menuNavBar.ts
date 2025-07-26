import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiGithub,
  mdiVuejs,
} from "@mdi/js";
import { MenuNavBarItem } from "../../_interfaces";

const menuNavBar: MenuNavBarItem[] = [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: "个人资料",
        href: "/dashboard/profile",
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: "退出登录",
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: "Light/Dark",
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
];

export default menuNavBar;
