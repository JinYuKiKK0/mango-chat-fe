'use client';

import { useEffect, useState } from 'react';
import { TimeWindowUnit } from '../../../api/api';

interface PermissionDetailModalProps {
    permission: any;
    isCreating: boolean;
    onClose: () => void;
    onDelete: (permissionId: number) => void;
    onSave: (permission: any) => void;
}

export default function PermissionDetailModal({ 
    permission, 
    isCreating, 
    onClose, 
    onDelete, 
    onSave 
}: PermissionDetailModalProps) {
    const [isEditing, setIsEditing] = useState(isCreating);
    const [formData, setFormData] = useState(permission);

    useEffect(() => {
        setFormData(permission);
        setIsEditing(isCreating);
    }, [permission, isCreating]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: name === 'limitCount' || name === 'timeWindow' ? parseInt(value) || 0 : value,
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const timeWindowUnits = [
        { value: TimeWindowUnit.SECOND, label: '秒' },
        { value: TimeWindowUnit.MINUTE, label: '分钟' },
        { value: TimeWindowUnit.HOUR, label: '小时' },
        { value: TimeWindowUnit.DAY, label: '天' },
    ];

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
                    {isCreating ? '新增权限' : '权限详情'}
                </h2>

                <div>
                    <label className="block text-sm font-semibold">ID</label>
                    <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                        {formData.id || '新权限'}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-semibold">调用限制次数</label>
                    {isEditing ? (
                        <input
                            type="number"
                            name="limitCount"
                            value={formData.limitCount ?? 0}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1 mt-1"
                            min="0"
                        />
                    ) : (
                        <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                            {formData.limitCount}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold">时间窗口</label>
                    {isEditing ? (
                        <input
                            type="number"
                            name="timeWindow"
                            value={formData.timeWindow ?? 1}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1 mt-1"
                            min="1"
                        />
                    ) : (
                        <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                            {formData.timeWindow}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold">时间单位</label>
                    {isEditing ? (
                        <select
                            name="timeWindowUnit"
                            value={formData.timeWindowUnit}
                            onChange={handleChange}
                            className="w-full border rounded px-2 py-1 mt-1"
                        >
                            {timeWindowUnits.map((unit) => (
                                <option key={unit.value} value={unit.value}>
                                    {unit.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                            {timeWindowUnits.find(u => u.value === formData.timeWindowUnit)?.label || formData.timeWindowUnit}
                        </p>
                    )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    {!isCreating && !isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                        >
                            编辑
                        </button>
                    )}
                    {isEditing && (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                            >
                                保存
                            </button>
                            {!isCreating && (
                                <button
                                    onClick={() => {
                                        setFormData(permission);
                                        setIsEditing(false);
                                    }}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                >
                                    取消
                                </button>
                            )}
                        </>
                    )}
                    {!isCreating && (
                        <button
                            onClick={() => onDelete(permission.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                            删除
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
} 