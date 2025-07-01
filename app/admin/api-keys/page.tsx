import { getPageTitle } from "../../_lib/config";
import { Metadata } from "next";
import ApiKeysClient from "./_components/ApiKeysClient";

export const metadata: Metadata = {
    title: getPageTitle("API Keys"),
};

export default function ApiKeysPage() {
    return <ApiKeysClient />;
} 