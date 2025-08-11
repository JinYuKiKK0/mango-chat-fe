'use client'
import {
    mdiShield,
    mdiMonitorCellphone,
} from "@mdi/js";
import CardBox from "../../../_components/CardBox";
import NotificationBar from "../../../_components/NotificationBar";
import SectionMain from "../../../_components/Section/Main";
import SectionTitleLineWithButton from "../../../_components/Section/TitleLineWithButton";
import PermissionTable from "./PermissionTable";
import { getPermissionList, deletePermission, updatePermission, createPermission } from "../../../api/api";
import { useEffect, useState } from "react";
import PermissionDetailModal from './PermissionDetail';
import Button from "../../../_components/Button";
import { mdiPlus } from "@mdi/js";

export default function PermissionsClient() {
    const [tableData, setTableData] = useState<any>({ data: [], column: [] });
    const [selectedPermission, setSelectedPermission] = useState<any>(null);
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
            const response = await getPermissionList(nextPage, pageSize);
            console.log("权限数据返回:", response);

            if (response.code === 200 && response.data) {
                setTableData({
                    data: response.data.content || [],
                    column: response.column || []
                });
                setPage(response.data.page ?? nextPage);
                setTotalPages(response.data.totalPages ?? 1);
                setTotalElements(response.data.totalElements ?? 0);
            } else {
                console.error("权限数据格式不正确:", response);
            }
        } catch (error) {
            console.error("获取权限数据失败:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleViewPermission = (permission: any) => {
        setSelectedPermission(permission);
        setIsCreating(false);
        setShowModal(true);
    };

    const handleCreatePermission = () => {
        setSelectedPermission({
            limitCount: 0,
            timeWindowUnit: 'MINUTE',
            timeWindow: 1
        });
        setIsCreating(true);
        setShowModal(true);
    };

    const handleDeletePermission = async (permissionId: number) => {
        try {
            await deletePermission(permissionId);
            await fetchData(page);
            setShowModal(false);
        } catch (error) {
            console.error("删除权限失败", error);
        }
    };

    const handleSavePermission = async (permissionData: any) => {
        try {
            if (isCreating) {
                await createPermission(permissionData);
            } else {
                await updatePermission(permissionData.id, permissionData);
            }
            await fetchData(page);
            setShowModal(false);
        } catch (error) {
            console.error("保存权限失败", error);
        }
    };

    return (
        <SectionMain>
            <SectionTitleLineWithButton 
                icon={mdiShield} 
                title="权限管理" 
                main
            >
                <Button
                    icon={mdiPlus}
                    color="info"
                    onClick={handleCreatePermission}
                    label="新增权限"
                />
            </SectionTitleLineWithButton>

            <NotificationBar color="info" icon={mdiMonitorCellphone}>
                <b>权限管理</b> - 管理系统访问权限和API调用限制
            </NotificationBar>

            <CardBox className="mb-6" hasTable>
                <PermissionTable
                    data={tableData.data || []}
                    column={tableData.column || []}
                    onView={handleViewPermission}
                    onDelete={handleDeletePermission}
                    page={page}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    onPageChange={(p) => fetchData(p)}
                    isLoading={loading}
                />
            </CardBox>

            {showModal && (
                <PermissionDetailModal
                    permission={selectedPermission}
                    isCreating={isCreating}
                    onClose={() => setShowModal(false)}
                    onDelete={handleDeletePermission}
                    onSave={handleSavePermission}
                />
            )}
        </SectionMain>
    );
} 