import { getPageTitle } from "../../_lib/config";
import { Metadata } from "next";
import GroupsClient from "./_components/GroupsClient";

export const metadata: Metadata = {
    title: getPageTitle("群组管理"),
};

export default function GroupsPage() {
    return <GroupsClient />;
} 