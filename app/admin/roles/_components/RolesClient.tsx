'use client'
import {
    mdiAccountGroup,
    mdiMonitorCellphone,
} from "@mdi/js";
import CardBox from "../../../_components/CardBox";
import NotificationBar from "../../../_components/NotificationBar";
import SectionMain from "../../../_components/Section/Main";
import SectionTitleLineWithButton from "../../../_components/Section/TitleLineWithButton";
import RoleTable from "./RoleTable";
import { getRoleList, deleteRole, updateRole, createRole } from "../../../api/api";
import { useEffect, useState } from "react";
import RoleDetailModal from './RoleDetail';
import Button from "../../../_components/Button";
import { mdiPlus } from "@mdi/js";

export default function RolesClient() {
    const [tableData, setTableData] = useState<any>({ data: [], column: [] });
    const [selectedRole, setSelectedRole] = useState<any>(null);
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
            const response = await getRoleList(nextPage, pageSize);
            console.log("角色数据返回:", response);

            if (response.code === 200 && response.data) {
                setTableData({
                    data: response.data.content || [],
                    column: response.column || []
                });
                setPage(response.data.page ?? nextPage);
                setTotalPages(response.data.totalPages ?? 1);
                setTotalElements(response.data.totalElements ?? 0);
            } else {
                console.error("角色数据格式不正确:", response);
            }
        } catch (error) {
            console.error("获取角色数据失败:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleViewRole = (role: any) => {
        setSelectedRole(role);
        setIsCreating(false);
        setShowModal(true);
    };

    const handleCreateRole = () => {
        setSelectedRole({
            name: '',
            roleType: 0,
            rank: 0,
            autoAdd: false
        });
        setIsCreating(true);
        setShowModal(true);
    };

    const handleDeleteRole = async (roleId: number) => {
        try {
            await deleteRole(roleId);
            await fetchData(page);
            setShowModal(false);
        } catch (error) {
            console.error("删除角色失败", error);
        }
    };

    const handleSaveRole = async (roleData: any) => {
        try {
            if (isCreating) {
                await createRole(roleData);
            } else {
                await updateRole(roleData.id, roleData);
            }
            await fetchData(page);
            setShowModal(false);
        } catch (error) {
            console.error("保存角色失败", error);
        }
    };

    return (
        <SectionMain>
            <SectionTitleLineWithButton 
                icon={mdiAccountGroup} 
                title="角色管理" 
                main
            >
                <Button
                    icon={mdiPlus}
                    color="info"
                    onClick={handleCreateRole}
                    label="新增角色"
                />
            </SectionTitleLineWithButton>

            <NotificationBar color="info" icon={mdiMonitorCellphone}>
                <b>角色管理</b> - 管理系统角色和权限分配
            </NotificationBar>

            <CardBox className="mb-6" hasTable>
                <RoleTable
                    data={tableData.data || []}
                    column={tableData.column || []}
                    onView={handleViewRole}
                    onDelete={handleDeleteRole}
                    page={page}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    onPageChange={(p) => fetchData(p)}
                    isLoading={loading}
                />
            </CardBox>

            {showModal && (
                <RoleDetailModal
                    role={selectedRole}
                    isCreating={isCreating}
                    onClose={() => setShowModal(false)}
                    onDelete={handleDeleteRole}
                    onSave={handleSaveRole}
                />
            )}
        </SectionMain>
    );
} 