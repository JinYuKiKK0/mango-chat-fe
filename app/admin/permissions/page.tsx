import { getPageTitle } from "../../_lib/config";
import { Metadata } from "next";
import PermissionsClient from "./_components/PermissionsClient";

export const metadata: Metadata = {
    title: getPageTitle("权限管理"),
};

export default function PermissionsPage() {
    return <PermissionsClient />;
} 