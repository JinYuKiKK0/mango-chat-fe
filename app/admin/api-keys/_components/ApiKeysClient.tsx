'use client'
import {
    mdiKey,
    mdiMonitorCellphone,
} from "@mdi/js";
import CardBox from "../../../_components/CardBox";
import NotificationBar from "../../../_components/NotificationBar";
import SectionMain from "../../../_components/Section/Main";
import SectionTitleLineWithButton from "../../../_components/Section/TitleLineWithButton";
import ApiKeyTable from "./ApiKeyTable";
import { getApiKeyList, deleteApiKey, updateApiKey, createApiKey } from "../../../api/api";
import { useEffect, useState } from "react";
import ApiKeyDetailModal from './ApiKeyDetail';
import Button from "../../../_components/Button";
import { mdiPlus } from "@mdi/js";

export default function ApiKeysClient() {
    const [tableData, setTableData] = useState<any>({ data: [], column: [] });
    const [selectedApiKey, setSelectedApiKey] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);

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
            const response = await getApiKeyList(nextPage, pageSize);
            if (response.code === 200 && response.data) {
                setTableData({
                    data: response.data.content || [],
                    column: response.column || []
                });
                setPage(response.data.page ?? nextPage);
                setTotalPages(response.data.totalPages ?? 1);
                setTotalElements(response.data.totalElements ?? 0);
            } else {
                console.error("API Key数据格式不正确:", response);
            }
        } catch (error) {
            console.error("获取API Key失败:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleViewApiKey = (apiKey: any) => {
        setSelectedApiKey(apiKey);
        setIsCreating(false);
        setShowModal(true);
        setNewlyCreatedKey(null);
    };

    const handleCreateApiKey = () => {
        setSelectedApiKey({ name: '', apiKey: '' });
        setIsCreating(true);
        setShowModal(true);
        setNewlyCreatedKey(null);
    };

    const handleDeleteApiKey = async (apiKeyId: number) => {
        try {
            await deleteApiKey(apiKeyId);
            await fetchData(page);
            setShowModal(false);
        } catch (error) {
            console.error("删除API Key失败", error);
        }
    };

    const handleSaveApiKey = async (apiKeyData: any) => {
        try {
            if (isCreating) {
                const response = await createApiKey({ 
                    name: apiKeyData.name,
                    apiKey: apiKeyData.apiKey 
                });
                if (response.code === 200 && response.data?.apiKey) {
                    setNewlyCreatedKey(response.data.apiKey);
                }
            } else {
                await updateApiKey(apiKeyData.id, { name: apiKeyData.name });
                setShowModal(false);
            }
            await fetchData(page);
        } catch (error) {
            console.error("保存API Key失败", error);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewlyCreatedKey(null);
    };

    return (
        <SectionMain>
            <SectionTitleLineWithButton 
                icon={mdiKey} 
                title="API Key管理" 
                main
            >
                <Button
                    icon={mdiPlus}
                    color="info"
                    onClick={handleCreateApiKey}
                    label="新增API Key"
                />
            </SectionTitleLineWithButton>

            <NotificationBar color="info" icon={mdiMonitorCellphone}>
                <b>API Key管理</b> - 管理应用访问凭证
            </NotificationBar>

            <CardBox className="mb-6" hasTable>
                <ApiKeyTable
                    data={tableData.data || []}
                    column={tableData.column || []}
                    onView={handleViewApiKey}
                    onDelete={handleDeleteApiKey}
                    page={page}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    onPageChange={(p) => fetchData(p)}
                    isLoading={loading}
                />
            </CardBox>

            {showModal && (
                <ApiKeyDetailModal
                    apiKey={selectedApiKey}
                    isCreating={isCreating}
                    newlyCreatedKey={newlyCreatedKey}
                    onClose={handleModalClose}
                    onDelete={handleDeleteApiKey}
                    onSave={handleSaveApiKey}
                />
            )}
        </SectionMain>
    );
} 