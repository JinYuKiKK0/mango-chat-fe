// app/admin/tips/_components/TipDetail.tsx

'use client';

import { useState } from 'react';
import DetailModal, { FieldConfig } from '../../../_components/DetailModal';
import { generateFieldConfigs, COMMON_OPTIONS } from '../../../_components/DetailModal/fieldMappings';

interface TipDetailModalProps {
    tip: any;
    onClose: () => void;
    onDelete: (tipId: number) => void;
    onUpdate?: (updatedTip: any) => void;
}

export default function TipDetailModal({
    tip,
    onClose,
    onDelete,
    onUpdate
}: TipDetailModalProps) {
    const [isOpen, setIsOpen] = useState(true);

    // 配置Tips字段
    const tipFields: FieldConfig[] = generateFieldConfigs(
        tip,
        [], // 不排除任何字段
        {
            // 自定义字段配置
            title: { required: true, placeholder: '请输入提示标题' },
            content: { type: 'textarea', required: true, placeholder: '请输入提示内容' },
            tipType: {
                type: 'select',
                options: COMMON_OPTIONS.tipType
            },
            tipLevel: {
                type: 'select', 
                options: COMMON_OPTIONS.tipLevel
            },
            isVisible: {
                type: 'checkbox',
                label: '是否可见',
                placeholder: '勾选表示用户可以看到此提示'
            },
            showCount: {
                type: 'number',
                label: '显示次数',
                placeholder: '0表示无限制显示'
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

    const handleDelete = (tipId: number) => {
        setIsOpen(false);
        onDelete(tipId);
    };

    return (
        <DetailModal
            isOpen={isOpen}
            title="提示"
            data={tip}
            onClose={handleClose}
            onSave={handleSave}
            onDelete={handleDelete}
            fields={tipFields}
            modalSize="lg"
            showDeleteButton={true}
        />
    );
}