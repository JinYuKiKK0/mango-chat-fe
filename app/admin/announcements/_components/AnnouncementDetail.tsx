// app/admin/announcements/_components/AnnouncementDetail.tsx

'use client';

import { useState } from 'react';
import DetailModal, { FieldConfig } from '../../../_components/DetailModal';
import { generateFieldConfigs } from '../../../_components/DetailModal/fieldMappings';

interface AnnouncementDetailModalProps {
    announcement: any;
    onClose: () => void;
    onDelete: (announcementId: number) => void;
    onUpdate?: (updatedAnnouncement: any) => void;
}

export default function AnnouncementDetailModal({
    announcement,
    onClose,
    onDelete,
    onUpdate
}: AnnouncementDetailModalProps) {
    const [isOpen, setIsOpen] = useState(true);

    // 配置公告字段
    const announcementFields: FieldConfig[] = generateFieldConfigs(
        announcement,
        [], // 不排除任何字段
        {
            // 自定义字段配置
            title: { required: true, placeholder: '请输入公告标题' },
            content: { type: 'textarea', required: true, placeholder: '请输入公告内容' },
            publishTime: { type: 'datetime', label: '发布时间' },
            endTime: { type: 'datetime', label: '结束时间' },
            isPublished: { 
                type: 'checkbox', 
                label: '是否发布',
                placeholder: '勾选表示立即发布此公告'
            },
            status: {
                type: 'select',
                options: [
                    { value: 'draft', label: '草稿' },
                    { value: 'published', label: '已发布' },
                    { value: 'expired', label: '已过期' },
                    { value: 'deleted', label: '已删除' }
                ]
            },
            priority: {
                type: 'select',
                options: [
                    { value: 1, label: '低' },
                    { value: 2, label: '中' },
                    { value: 3, label: '高' },
                    { value: 4, label: '紧急' }
                ]
            }
        }
    );

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    const handleSave = (updatedData: any) => {
        if (onUpdate) {
            onUpdate(updatedData);
        }
    };

    const handleDelete = (announcementId: number) => {
        setIsOpen(false);
        onDelete(announcementId);
    };

    return (
        <DetailModal
            isOpen={isOpen}
            title="公告"
            data={announcement}
            onClose={handleClose}
            onSave={handleSave}
            onDelete={handleDelete}
            fields={announcementFields}
            modalSize="lg"
            showDeleteButton={true}
        />
    );
}