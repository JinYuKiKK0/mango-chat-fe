// app/admin/tips/_components/TipsClient.tsx

'use client'
import {
    mdiLightbulbOnOutline, // Changed icon to suit tips
} from "@mdi/js";
import CardBox from "../../../_components/CardBox";
import NotificationBar from "../../../_components/NotificationBar";
import SectionMain from "../../../_components/Section/Main";
import SectionTitleLineWithButton from "../../../_components/Section/TitleLineWithButton";
// import TableGeneric from "../../user/_components/GeneralTable"; // Placeholder, will use TipTable
import { getTipList, deleteTip, updateTip } from "../../../api/api"; // Assuming these API functions exist or will be created
import { useEffect, useState } from "react";
import TipDetailModal from './TipDetail'; // 导入TipDetail模态框组件
import TipTable from './TipTable'; // Placeholder

export default function TipsClient() {
    const [tableData, setTableData] = useState<any>({ data: [], column: [] });
    const [selectedTip, setSelectedTip] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        try {
            const response = await getTipList(); // 调用 API 获取 Tips 列表
            console.log("Tips列表返回:", response);

            // API 返回的 response 直接是 TipListResponse 类型
            // 它包含 content 数组和其他分页信息
            if (response && Array.isArray(response.content)) {
                setTableData({
                    data: response.content,
                    column: [
                        { key: 'id', title: 'ID' },
                        { key: 'title', title: '标题' },
                        { key: 'createdAt', title: '创建时间' },
                        { key: 'updatedAt', title: '更新时间' },
                    ]
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

    return (
        <SectionMain>
            <SectionTitleLineWithButton icon={mdiLightbulbOnOutline} title="Tips管理" main />

            <NotificationBar color="info" icon={mdiLightbulbOnOutline}>
                <b>Tips信息.</b> 这里管理系统的所有Tips。
            </NotificationBar>

            <CardBox className="mb-6" hasTable>
                <TipTable
                    data={tableData.data || []}
                    column={tableData.column || []}
                    onView={handleViewTip}
                    onDelete={handleDeleteTip}
                    onUpdate={handleUpdateTip} // Or pass to a form component
                />
            </CardBox>

            {showModal && selectedTip && (
                <TipDetailModal
                    tip={selectedTip}
                    onClose={() => setShowModal(false)}
                    onDelete={handleDeleteTip}
                    onUpdate={handleUpdateTip}
                />
            )}
        </SectionMain>
    );
}