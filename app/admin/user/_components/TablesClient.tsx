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
import {deleteUserById, getUserById, getUserList, updateUserById,createUser} from "../../../api/api";
import { useEffect, useState } from "react";
import UserDetailModal from './UserDetail';

//组件定义与状态管理
export default function TablesClient() {

    // 列表数据与分页信息
    const [tableData, setTableData] = useState<any>({ data: [], column: [] });
    const [page, setPage] = useState(0); // 0-based
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = async (nextPage: number) => {
        setLoading(true);
        try {
            const response = await getUserList(nextPage, pageSize);
            if (response.code === 200 && response.data) {
                setTableData({
                    data: response.data.content || [],
                    column: response.column || []
                });
                setPage(response.data.page ?? nextPage);
                setTotalPages(response.data.totalPages ?? 1);
                setTotalElements(response.data.totalElements ?? 0);
            } else {
                console.error("API 返回格式不正确:", response);
                setTableData({ data: [], column: [] });
                setTotalPages(1);
                setTotalElements(0);
            }
        } catch (error) {
            console.error("获取用户数据失败:", error);
            setTableData({ data: [], column: [] });
            setTotalPages(1);
            setTotalElements(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            // 删除后重新拉取当前页，避免页码与计数不一致
            await fetchData(page);
            setShowModal(false);
        } catch (error) {
            console.error("删除失败", error);
        }
    };

    const handleUpdateUser = async (updatedUser: any) => {
        try {
            await updateUserById(updatedUser.id, updatedUser);
            // 更新后刷新列表，确保与后端一致
            await fetchData(page);
            setSelectedUser(updatedUser);
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
                    page={page}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    onPageChange={(p) => fetchData(p)}
                    isLoading={loading}
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
