// app/admin/announcements/page.tsx

import { getPageTitle } from "../../_lib/config";
import { Metadata } from "next";
import AnnouncementsClient from "./_components/AnnouncementsClient";

export const metadata: Metadata = {
    title: getPageTitle("公告管理"),
};

export default function AnnouncementsPage() {
    return <AnnouncementsClient />;
}