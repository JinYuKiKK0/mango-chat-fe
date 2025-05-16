// TablesClient.tsx

'use client'
import {
    mdiMonitorCellphone,
    mdiTableBorder,
    mdiTableOff,
} from "@mdi/js";
import CardBox from "../../../_components/CardBox";
import CardBoxComponentEmpty from "../../../_components/CardBox/Component/Empty";
import NotificationBar from "../../../_components/NotificationBar";
import SectionMain from "../../../_components/Section/Main";
import SectionTitleLineWithButton from "../../../_components/Section/TitleLineWithButton";
import TableGeneric from "../_components/GeneralTable";
import {deleteUserById, getUserById, getUserList, updateUserById} from "../../../api/api";
import { useEffect, useState } from "react";
import UserDetailModal from './UserDetail';

export default function TablesClient() {

    // fetch user
    const [tableData, setTableData] = useState<any>({ data: [], column: [] });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getUserList();
                console.log("完整返回:", response);

                if (response.code === 200 && Array.isArray(response.data.content)) {
                    setTableData({
                        data: response.data.content,
                        column: response.column || []
                    });
                } else {
                    console.error("API 返回格式不正确:", response);
                }
            } catch (error) {
                console.error("获取用户数据失败:", error);
            }
        }
        fetchData();
    }, []);

    // 处理显示UserDetail
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    const handleViewUser = (user: any) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUserById(userId);
            setTableData((prev: any) => ({
                ...prev,
                data: prev.data.filter((user: any) => user.id !== userId),
            }));
            setShowModal(false);
        } catch (error) {
            console.error("删除失败", error);
        }
    };

    const handleUpdateUser = async (updatedUser: any) => {
        try {
            await updateUserById(updatedUser.id, updatedUser);

            // 更新 state 中的数据
            setTableData((prev: any) => ({
                ...prev,
                data: prev.data.map((user: any) =>
                    user.id === updatedUser.id ? updatedUser : user
                ),
            }));

            setSelectedUser(updatedUser); // 同步 modal 中的数据
            setShowModal(false);
        } catch (error) {
            console.error("更新用户失败", error);
        }
    };


    return (
        <SectionMain>
            <SectionTitleLineWithButton icon={mdiTableBorder} title="用户管理" main />

            <NotificationBar color="info" icon={mdiMonitorCellphone}>
                <b>Responsive table.</b> Collapses on mobile
            </NotificationBar>

            <CardBox className="mb-6" hasTable>
                <TableGeneric
                    data={tableData.data || []}
                    column={tableData.column || []}
                    onView={handleViewUser}
                    onDelete={handleDeleteUser}
                    onUpdate={handleUpdateUser}
                />
            </CardBox>

            {/*<SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" />*/}

            {/*<NotificationBar color="danger" icon={mdiTableOff}>*/}
            {/*    <b>Empty card.</b> When there&apos;s nothing to show*/}
            {/*</NotificationBar>*/}

            {/*<CardBox>*/}
            {/*    <CardBoxComponentEmpty />*/}
            {/*</CardBox>*/}


            {showModal && selectedUser && (
                <UserDetailModal
                    user={selectedUser}
                    onClose={() => setShowModal(false)}
                    onDelete={handleDeleteUser}
                    onUpdate={handleUpdateUser}
                />
            )}


        </SectionMain>
    );
}
