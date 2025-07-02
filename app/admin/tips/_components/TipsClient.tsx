// app/admin/tips/_components/TipsClient.tsx

'use client'
import {
    mdiLightbulbOnOutline, // Changed icon to suit tips
    mdiPlus,
} from "@mdi/js";
import CardBox from "../../../_components/CardBox";
import NotificationBar from "../../../_components/NotificationBar";
import SectionMain from "../../../_components/Section/Main";
import SectionTitleLineWithButton from "../../../_components/Section/TitleLineWithButton";
// import TableGeneric from "../../user/_components/GeneralTable"; // Placeholder, will use TipTable
import { getTipList, deleteTip, updateTip, createTip, TipForm as TipFormData } from "../../../api/api"; // Assuming these API functions exist or will be created
import { useEffect, useState } from "react";
import TipDetailModal from './TipDetail'; // 导入TipDetail模态框组件
import TipTable from './TipTable'; // Placeholder
import TipForm from './TipForm'; // 导入TipForm组件
import Button from "../../../_components/Button";

export default function TipsClient() {
    const [tableData, setTableData] = useState<any>({ data: [], column: [] });
    const [selectedTip, setSelectedTip] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false); // State for TipForm modal
    const [editingTip, setEditingTip] = useState<any>(null); // State for tip being edited

    const fetchData = async () => {
        try {
            const response = await getTipList(); // 调用 API 获取 Tips 列表
            console.log("Tips列表返回:", response);

            // 后端返回格式: { code: 200, message: "查询成功", data: { content: [...], page, pageSize, totalElements, totalPages }, column: [...] }
            if (response && response.code === 200 && response.data && Array.isArray(response.data.content)) {
                // 处理列配置：将后端返回的 column 数组转换为前端期望的格式
                const columns = response.column ? response.column.map((col: any) => ({
                    key: col.column,
                    title: col.value
                })) : [
                    { key: 'id', title: 'ID' },
                    { key: 'title', title: '标题' },
                    { key: 'createdAt', title: '创建时间' },
                    { key: 'updatedAt', title: '更新时间' },
                ];

                setTableData({
                    data: response.data.content,
                    column: columns
                });
            } else {
                console.error("API 返回格式不正确或无数据:", response);
                // 即使出错，也设置一个带列定义的空数据结构
                setTableData({ 
                    data: [], 
                    column: [
                        { key: 'id', title: 'ID' },
                        { key: 'title', title: '标题' },
                        { key: 'createdAt', title: '创建时间' },
                        { key: 'updatedAt', title: '更新时间' },
                    ] 
                });
            }
        } catch (error) {
            console.error("获取Tips数据失败:", error);
            // 出错时，也设置一个带列定义的空数据结构
            setTableData({ 
                data: [], 
                column: [
                    { key: 'id', title: 'ID' },
                    { key: 'title', title: '标题' },
                    { key: 'createdAt', title: '创建时间' },
                    { key: 'updatedAt', title: '更新时间' },
                ] 
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleViewTip = (tip: any) => {
        setSelectedTip(tip);
        setShowModal(true);
    };

    const handleDeleteTip = async (tipId: number) => {
        try {
            await deleteTip(tipId); 
            setTableData((prev: any) => ({
                ...prev,
                data: prev.data.filter((tip: any) => tip.id !== tipId),
            }));
            setShowModal(false);
            console.log(`Deleted tip ${tipId}`);
        } catch (error) {
            console.error("删除Tip失败", error);
            alert('删除Tip失败，请重试。');
        }
    };

    const handleUpdateTip = async (updatedTip: any) => {
        try {
            await updateTip(updatedTip.id, updatedTip);
            setTableData((prev: any) => ({
                ...prev,
                data: prev.data.map((tip: any) =>
                    tip.id === updatedTip.id ? updatedTip : tip
                ),
            }));
            setSelectedTip(updatedTip);
            setShowModal(false);
            console.log(`Updated tip ${updatedTip.id}`);
        } catch (error) {
            console.error("更新Tip失败", error);
            alert('更新Tip失败，请重试。');
        }
    };

    const handleOpenUpdateForm = (tip: any) => {
        setEditingTip(tip);
        setShowFormModal(true);
        setShowModal(false); // Close detail modal if editing from there
    };

    const handleFormSubmit = async (formData: TipFormData) => {
        try {
            if (editingTip) {
                await updateTip(editingTip.id, formData);
                console.log(`Updated tip ${editingTip.id}`);
            } else {
                await createTip(formData);
                console.log('Created new tip');
            }
            fetchData(); // Refresh data
            setShowFormModal(false);
            setEditingTip(null);
        } catch (error) {
            console.error("保存Tip失败", error);
            alert('保存Tip失败，请重试。');
        }
    };

    return (
        <SectionMain>
            <SectionTitleLineWithButton 
                icon={mdiLightbulbOnOutline} 
                title="Tips管理" 
                main
            >
                <Button
                    icon={mdiPlus}
                    color="info"
                    onClick={() => {
                        setEditingTip(null); // Clear any editing state
                        setShowFormModal(true); // Show the form for new tip
                    }}
                    label="新增Tips"
                />
            </SectionTitleLineWithButton>

            <NotificationBar color="info" icon={mdiLightbulbOnOutline}>
                <b>Tips信息.</b> 这里管理系统的所有Tips。
            </NotificationBar>

            <CardBox className="mb-6" hasTable>
                <TipTable
                    data={tableData.data || []}
                    column={tableData.column || []}
                    onView={handleViewTip}
                    onDelete={handleDeleteTip}
                    onUpdate={handleOpenUpdateForm} // Pass handler to open form for editing
                />
            </CardBox>

            {showModal && selectedTip && (
                <TipDetailModal
                    tip={selectedTip}
                    onClose={() => setShowModal(false)}
                    onDelete={handleDeleteTip}
                    onUpdate={handleOpenUpdateForm} // Pass handler to open form for editing
                />
            )}

            {showFormModal && (
                <TipForm
                    initialData={editingTip} // Pass tip data if editing, or null for new
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowFormModal(false);
                        setEditingTip(null); // Clear editing state on cancel
                    }}
                />
            )}
        </SectionMain>
    );
}