// app/admin/announcements/_components/AnnouncementsClient.tsx

'use client'
import {
    mdiBullhornVariant, // Changed icon to suit announcements
} from "@mdi/js";
import CardBox from "../../../_components/CardBox";
import NotificationBar from "../../../_components/NotificationBar";
import SectionMain from "../../../_components/Section/Main";
import SectionTitleLineWithButton from "../../../_components/Section/TitleLineWithButton";
// import TableGeneric from "../../user/_components/GeneralTable";
import { getAnnouncementList, deleteAnnouncement, updateAnnouncement, createAnnouncement, AnnouncementFormData } from "../../../api/api";
import { useEffect, useState } from "react";
import AnnouncementDetailModal from './AnnouncementDetail'; // Import AnnouncementDetailModal
import AnnouncementTable from './AnnouncementTable'; // Import AnnouncementTable
import AnnouncementForm from './AnnouncementForm'; // Import AnnouncementForm
import Button from "../../../_components/Button"; // Import Button for 'Add New' 

export default function AnnouncementsClient() {
    const [tableData, setTableData] = useState<any>({ data: [], column: [] });
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false); // State for AnnouncementForm modal
    const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null); // State for announcement being edited

    const fetchAnnouncements = async () => {
        try {
            const response = await getAnnouncementList(); 
            console.log("公告列表返回:", response);

            // 后端返回格式: { code: 200, message: "查询成功", data: { content: [...], page, pageSize, totalElements, totalPages }, column: [...] }
            if (response && response.code === 200 && response.data && Array.isArray(response.data.content)) {
                // 处理列配置：将后端返回的 column 数组转换为前端期望的格式
                const columns = response.column ? response.column.map((col: any) => ({
                    key: col.column,
                    title: col.value
                })) : [
                    { key: 'title', title: '标题' },
                    { key: 'effectiveTime', title: '生效时间' },
                    { key: 'expirationTime', title: '过期时间' },
                    { key: 'createdAt', title: '创建时间' },
                ];

                setTableData({
                    data: response.data.content,
                    column: columns
                });
            } else {
                console.error("API 返回格式不正确或无数据:", response);
                setTableData({ data: [], column: [
                    { key: 'title', title: '标题' },
                    { key: 'effectiveTime', title: '生效时间' },
                    { key: 'expirationTime', title: '过期时间' },
                    { key: 'createdAt', title: '创建时间' },
                ] }); // Set empty data with default columns on error
            }
        } catch (error) {
            console.error("获取公告数据失败:", error);
            setTableData({ data: [], column: [
                { key: 'title', title: '标题' },
                { key: 'effectiveTime', title: '生效时间' },
                { key: 'expirationTime', title: '过期时间' },
                { key: 'createdAt', title: '创建时间' },
            ] }); // Set empty data with default columns on error
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleViewAnnouncement = (announcement: any) => {
        setSelectedAnnouncement(announcement);
        setShowDetailModal(true);
    };

    const handleDeleteAnnouncement = async (announcementId: number) => {
        if (window.confirm('确定要删除此公告吗?')) {
            try {
                await deleteAnnouncement(announcementId);
                fetchAnnouncements(); // Refresh data
                setShowDetailModal(false); // Close detail modal if open
                console.log(`Deleted announcement ${announcementId}`);
            } catch (error) {
                console.error("删除公告失败", error);
                alert('删除公告失败，请重试。');
            }
        }
    };

    const handleOpenUpdateForm = (announcement: any) => {
        setEditingAnnouncement(announcement);
        setShowFormModal(true);
        setShowDetailModal(false); // Close detail modal if editing from there
    };

    const handleFormSubmit = async (formData: AnnouncementFormData) => {
        try {
            if (editingAnnouncement) {
                await updateAnnouncement(editingAnnouncement.id, formData);
                console.log(`Updated announcement ${editingAnnouncement.id}`);
            } else {
                await createAnnouncement(formData);
                console.log('Created new announcement');
            }
            fetchAnnouncements(); // Refresh data
            setShowFormModal(false);
            setEditingAnnouncement(null);
        } catch (error) {
            console.error("保存公告失败", error);
            alert('保存公告失败，请重试。');
        }
    };

    return (
        <SectionMain>
            <SectionTitleLineWithButton icon={mdiBullhornVariant} title="公告管理" main >
                <Button
                    label="新增公告"
                    color="info"
                    onClick={() => {
                        setEditingAnnouncement(null); // Clear any editing state
                        setShowFormModal(true); // Show the form for new announcement
                    }}
                />
            </SectionTitleLineWithButton>

            <NotificationBar color="info" icon={mdiBullhornVariant}>
                <b>公告信息.</b> 这里管理系统的所有公告。
            </NotificationBar>

            <CardBox className="mb-6" hasTable>
                <AnnouncementTable
                    data={tableData.data || []}
                    column={tableData.column || []}
                    onView={handleViewAnnouncement}
                    onDelete={handleDeleteAnnouncement}
                    onUpdate={handleOpenUpdateForm} 
                />
            </CardBox>

            {showDetailModal && selectedAnnouncement && (
                <AnnouncementDetailModal
                    announcement={selectedAnnouncement}
                    onClose={() => setShowDetailModal(false)}
                    onDelete={handleDeleteAnnouncement} // Pass the general delete handler
                    onUpdate={handleOpenUpdateForm} // Pass handler to open form for editing
                />
            )}

            {showFormModal && (
                <AnnouncementForm
                    initialData={editingAnnouncement} // Pass announcement data if editing, or null for new
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowFormModal(false);
                        setEditingAnnouncement(null); // Clear editing state on cancel
                    }}
                />
            )}
        </SectionMain>
    );
}