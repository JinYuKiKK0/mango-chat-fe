'use client';

import { useEffect, useState } from 'react';
import { mdiContentCopy, mdiCheck } from '@mdi/js';
import Button from '../../../_components/Button';
import NotificationBar from '../../../_components/NotificationBar';

interface ApiKeyDetailModalProps {
    apiKey: any;
    isCreating: boolean;
    newlyCreatedKey: string | null;
    onClose: () => void;
    onDelete: (apiKeyId: number) => void;
    onSave: (apiKey: any) => void;
}

export default function ApiKeyDetailModal({ 
    apiKey, 
    isCreating, 
    newlyCreatedKey,
    onClose, 
    onDelete, 
    onSave 
}: ApiKeyDetailModalProps) {
    const [formData, setFormData] = useState(apiKey);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setFormData(apiKey);
    }, [apiKey]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (!formData.name) {
            alert("名称不能为空");
            return;
        }
        onSave(formData);
    };

    const handleCopy = () => {
        if (newlyCreatedKey) {
            navigator.clipboard.writeText(newlyCreatedKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    
    if (newlyCreatedKey) {
        return (
            <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4 relative">
                    <h2 className="text-xl font-bold mb-4">API Key已创建</h2>
                    <NotificationBar color="warning">
                        <b>请妥善保管您的API Key。</b> 这是您唯一一次看到完整Key的机会。
                    </NotificationBar>
                    <div className="relative p-2 border rounded bg-gray-100 font-mono text-sm break-all">
                        {newlyCreatedKey}
                        <Button 
                            icon={copied ? mdiCheck : mdiContentCopy}
                            onClick={handleCopy}
                            small
                            className="absolute top-1 right-1"
                            color={copied ? "success" : "white"}
                        />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button
                            label="关闭"
                            color="info"
                            onClick={onClose}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">
                    {isCreating ? '新增 API Key' : 'API Key 详情'}
                </h2>

                {!isCreating && (
                    <div>
                        <label className="block text-sm font-semibold">ID</label>
                        <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                            {formData.id}
                        </p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-semibold">名称</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name ?? ''}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1 mt-1"
                        placeholder="为此Key设置一个名称"
                    />
                </div>

                {!isCreating && (
                     <div>
                        <label className="block text-sm font-semibold">API Key (部分)</label>
                        <p className="border rounded px-2 py-1 mt-1 bg-gray-100 font-mono">
                            {`${formData.apiKey.substring(0, 4)}...${formData.apiKey.substring(formData.apiKey.length - 4)}`}
                        </p>
                    </div>
                )}

                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        label="取消"
                        color="white"
                        onClick={onClose}
                    />
                    <Button
                        label={isCreating ? '创建' : '保存'}
                        color="info"
                        onClick={handleSave}
                    />
                    {!isCreating && (
                        <Button
                            label="删除"
                            color="danger"
                            onClick={() => onDelete(apiKey.id)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
} 