// app/admin/announcements/_components/AnnouncementDetail.tsx

'use client';

import { useEffect, useState } from 'react';

interface AnnouncementDetailModalProps {
    announcement: any; // Changed from 'user' to 'announcement'
    onClose: () => void;
    onDelete: (announcementId: number) => void; // Changed from 'userId' to 'announcementId'
    onUpdate?: (updatedAnnouncement: any) => void; // Optional: for updating data
}

export default function AnnouncementDetailModal({
    announcement,
    onClose,
    onDelete,
    onUpdate
}: AnnouncementDetailModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(announcement);

    useEffect(() => {
        setFormData(announcement);
    }, [announcement]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditToggle = () => {
        if (isEditing && onUpdate) {
            onUpdate(formData);
        }
        setIsEditing(!isEditing);
    };

    // Define which fields are editable and their types
    const editableFields: { [key: string]: { type: string, label: string } } = {
        title: { type: 'text', label: '标题' },
        content: { type: 'textarea', label: '内容' },
        // Add other fields like 'category', 'tags' if needed
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg space-y-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">公告详情</h2>

                {Object.keys(formData).map((key) => {
                    const fieldConfig = editableFields[key];
                    const isFieldEditable = isEditing && fieldConfig;

                    return (
                        <div key={key}>
                            <label className="block text-sm font-semibold capitalize">
                                {fieldConfig?.label || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} {/* Fallback label */}
                            </label>
                            {isFieldEditable ? (
                                fieldConfig.type === 'textarea' ? (
                                    <textarea
                                        name={key}
                                        value={formData[key] ?? ""}
                                        onChange={handleChange}
                                        className="w-full border rounded px-2 py-1 mt-1 h-32 resize-none"
                                        rows={4}
                                    />
                                ) : (
                                    <input
                                        type={fieldConfig.type}
                                        name={key}
                                        value={formData[key] ?? ""}
                                        onChange={handleChange}
                                        className="w-full border rounded px-2 py-1 mt-1"
                                    />
                                )
                            ) : (
                                <p className="border rounded px-2 py-1 mt-1 bg-gray-100 min-h-[34px] break-words whitespace-pre-wrap">
                                    {formData[key]?.toString() || 'N/A'}
                                </p>
                            )}
                        </div>
                    );
                })}

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        onClick={handleEditToggle}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition duration-150 ease-in-out"
                    >
                        {isEditing ? '保存' : '编辑'}
                    </button>
                    <button
                        onClick={() => onDelete(announcement.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-150 ease-in-out"
                    >
                        删除
                    </button>
                     <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition duration-150 ease-in-out"
                    >
                        关闭
                    </button>
                </div>
            </div>
        </div>
    );
}