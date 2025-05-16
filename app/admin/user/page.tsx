// page.tsx

import { getPageTitle } from "../../_lib/config";
import { Metadata } from "next";
import TablesClient from "./_components/TablesClient";

export const metadata: Metadata = {
    title: getPageTitle("Tables"),
};

export default function TablesPage() {
    return <TablesClient />;
}
