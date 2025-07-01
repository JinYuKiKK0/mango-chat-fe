import { getPageTitle } from "../../_lib/config";
import { Metadata } from "next";
import RolesClient from "./_components/RolesClient";

export const metadata: Metadata = {
    title: getPageTitle("角色管理"),
};

export default function RolesPage() {
    return <RolesClient />;
} 