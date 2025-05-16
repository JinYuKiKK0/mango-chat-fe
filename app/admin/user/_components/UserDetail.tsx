// UserDetail.tsx

'use client';

import { useEffect, useState } from 'react';

interface UserDetailModalProps {
    user: any;
    onClose: () => void;
    onDelete: (userId: number) => void;
    onUpdate?: (updatedUser: any) => void; // 可选：用于更新数据
}

export default function UserDetailModal({ user, onClose, onDelete, onUpdate }: UserDetailModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">用户详情</h2>

                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label className="block text-sm font-semibold">{key}</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name={key}
                                value={formData[key] ?? ""}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 mt-1"
                            />
                        ) : (
                            <p className="border rounded px-2 py-1 mt-1 bg-gray-100">{formData[key]}</p>
                        )}
                    </div>
                ))}

                <div className="flex justify-end space-x-2 pt-4">
                    <button
                        onClick={handleEditToggle}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                        {isEditing ? '保存' : '编辑'}
                    </button>
                    <button
                        onClick={() => onDelete(user.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                        删除
                    </button>
                </div>
            </div>
        </div>
    );
}
