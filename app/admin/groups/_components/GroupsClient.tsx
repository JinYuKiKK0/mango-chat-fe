'use client'
import {
    mdiAccountMultiple,
    mdiMonitorCellphone,
} from "@mdi/js";
import CardBox from "../../../_components/CardBox";
import NotificationBar from "../../../_components/NotificationBar";
import SectionMain from "../../../_components/Section/Main";
import SectionTitleLineWithButton from "../../../_components/Section/TitleLineWithButton";
import GroupTable from "./GroupTable";
import { getUserGroupList, deleteUserGroup, updateUserGroup, createUserGroup } from "../../../api/api";
import { useEffect, useState } from "react";
import GroupDetailModal from './GroupDetail';
import Button from "../../../_components/Button";
import { mdiPlus } from "@mdi/js";

export default function GroupsClient() {
    const [tableData, setTableData] = useState<any>({ data: [], column: [] });
    const [selectedGroup, setSelectedGroup] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const [page, setPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData(0);
    }, []);

    async function fetchData(nextPage: number) {
        setLoading(true);
        try {
            const response = await getUserGroupList(nextPage, pageSize);
            console.log("群组数据返回:", response);

            if (response.code === 200 && response.data) {
                setTableData({
                    data: response.data.content || [],
                    column: response.column || []
                });
                setPage(response.data.page ?? nextPage);
                setTotalPages(response.data.totalPages ?? 1);
                setTotalElements(response.data.totalElements ?? 0);
            } else {
                console.error("群组数据格式不正确:", response);
            }
        } catch (error) {
            console.error("获取群组数据失败:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleViewGroup = (group: any) => {
        setSelectedGroup(group);
        setIsCreating(false);
        setShowModal(true);
    };

    const handleCreateGroup = () => {
        setSelectedGroup({
            name: '',
            type: ''
        });
        setIsCreating(true);
        setShowModal(true);
    };

    const handleDeleteGroup = async (groupId: number) => {
        try {
            await deleteUserGroup(groupId);
            await fetchData(page);
            setShowModal(false);
        } catch (error) {
            console.error("删除群组失败", error);
        }
    };

    const handleSaveGroup = async (groupData: any) => {
        try {
            if (isCreating) {
                await createUserGroup(groupData);
            } else {
                await updateUserGroup(groupData.id, groupData);
            }
            await fetchData(page);
            setShowModal(false);
        } catch (error) {
            console.error("保存群组失败", error);
        }
    };

    return (
        <SectionMain>
            <SectionTitleLineWithButton 
                icon={mdiAccountMultiple} 
                title="群组管理" 
                main
            >
                <Button
                    icon={mdiPlus}
                    color="info"
                    onClick={handleCreateGroup}
                    label="新增群组"
                />
            </SectionTitleLineWithButton>

            <NotificationBar color="info" icon={mdiMonitorCellphone}>
                <b>群组管理</b> - 管理用户群组和权限分配
            </NotificationBar>

            <CardBox className="mb-6" hasTable>
                <GroupTable
                    data={tableData.data || []}
                    column={tableData.column || []}
                    onView={handleViewGroup}
                    onDelete={handleDeleteGroup}
                    page={page}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    onPageChange={(p) => fetchData(p)}
                    isLoading={loading}
                />
            </CardBox>

            {showModal && (
                <GroupDetailModal
                    group={selectedGroup}
                    isCreating={isCreating}
                    onClose={() => setShowModal(false)}
                    onDelete={handleDeleteGroup}
                    onSave={handleSaveGroup}
                />
            )}
        </SectionMain>
    );
} 