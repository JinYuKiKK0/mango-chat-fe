import { getPageTitle } from "../../_lib/config";
import { Metadata } from "next";
import ProfileClient from "./_components/ProfileClient";

export const metadata: Metadata = {
  title: getPageTitle("个人资料"),
};

export default function ProfilePage() {
  return <ProfileClient />;
}
