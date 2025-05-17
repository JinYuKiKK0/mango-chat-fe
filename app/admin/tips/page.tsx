// app/admin/tips/page.tsx

import { getPageTitle } from "../../_lib/config";
import { Metadata } from "next";
import TipsClient from "./_components/TipsClient";

export const metadata: Metadata = {
    title: getPageTitle("Tips管理"),
};

export default function TipsPage() {
    return <TipsClient />;
}

