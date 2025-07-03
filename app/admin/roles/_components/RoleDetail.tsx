'use client';

import { useEffect, useState } from 'react';
import { getRolePermissionList, addRolePermission, deleteRolePermission, getPermissionList, getRoleTypes } from '../../../api/api';
import Button from '../../../_components/Button';
import { mdiPlus, mdiDelete, mdiCheck } from '@mdi/js';

interface RoleDetailModalProps {
    role: any;
    isCreating: boolean;
    onClose: () => void;
    onDelete: (roleId: number) => void;
    onSave: (role: any) => void;
}

export default function RoleDetailModal({ 
    role, 
    isCreating, 
    onClose, 
    onDelete, 
    onSave 
}: RoleDetailModalProps) {
    const [isEditing, setIsEditing] = useState(isCreating);
    const [formData, setFormData] = useState(role);
    const [activeTab, setActiveTab] = useState<'basic' | 'permissions'>('basic');
    
    // 权限管理相关状态
    const [rolePermissions, setRolePermissions] = useState<any[]>([]);
    const [allPermissions, setAllPermissions] = useState<any[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const [showAddPermissions, setShowAddPermissions] = useState(false);
    const [roleTypes, setRoleTypes] = useState<{value: number; label: string}[]>([]);

    useEffect(() => {
        setFormData(role);
        setIsEditing(isCreating);
        if (!isCreating && role?.id) {
            fetchRolePermissions();
        }
        fetchRoleTypes();
    }, [role, isCreating]);

    const fetchRolePermissions = async () => {
        try {
            const response = await getRolePermissionList(role.id);
            if (response.code === 200) {
                setRolePermissions(response.data || []);
            }
        } catch (error) {
            console.error('获取角色权限失败:', error);
        }
    };

    const fetchRoleTypes = async () => {
        try {
            const response = await getRoleTypes();
            if (response.code === 200) {
                setRoleTypes(response.data || []);
            }
        } catch (error) {
            console.error('获取角色类型失败:', error);
        }
    };

    const fetchAllPermissions = async () => {
        try {
            const response = await getPermissionList(0, 100); // 获取所有权限
            if (response.code === 200) {
                setAllPermissions(response.data?.content || []);
            }
        } catch (error) {
            console.error('获取权限列表失败:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData((prev: any) => ({
                ...prev,
                [name]: target.checked,
            }));
        } else {
            setFormData((prev: any) => ({
                ...prev,
                [name]: name === 'roleType' || name === 'rank' ? parseInt(value) || 0 : value,
            }));
        }
    };

    const handleSave = () => {
        onSave(formData);
    };

    const handleAddPermissions = async () => {
        if (selectedPermissions.length === 0) return;
        
        try {
            await addRolePermission(role.id, selectedPermissions);
            await fetchRolePermissions();
            setSelectedPermissions([]);
            setShowAddPermissions(false);
        } catch (error) {
            console.error('添加权限失败:', error);
        }
    };

    const handleRemovePermission = async (permissionId: number) => {
        try {
            await deleteRolePermission(role.id, [permissionId]);
            await fetchRolePermissions();
        } catch (error) {
            console.error('删除权限失败:', error);
        }
    };

    const togglePermissionSelection = (permissionId: number) => {
        setSelectedPermissions(prev => 
            prev.includes(permissionId) 
                ? prev.filter(id => id !== permissionId)
                : [...prev, permissionId]
        );
    };

    const availablePermissions = allPermissions.filter(permission => 
        !rolePermissions.some(rp => rp.id === permission.id)
    );

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl space-y-4 relative max-h-[90vh] overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg z-10"
                >
                    ✕
                </button>
                
                <h2 className="text-xl font-bold mb-4">
                    {isCreating ? '新增角色' : '角色详情'}
                </h2>

                {/* 标签页导航 */}
                {!isCreating && (
                    <div className="flex border-b border-gray-200 mb-4">
                        <button
                            className={`px-4 py-2 font-medium ${activeTab === 'basic' 
                                ? 'text-blue-600 border-b-2 border-blue-600' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('basic')}
                        >
                            基本信息
                        </button>
                        <button
                            className={`px-4 py-2 font-medium ${activeTab === 'permissions' 
                                ? 'text-blue-600 border-b-2 border-blue-600' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => {
                                setActiveTab('permissions');
                                if (allPermissions.length === 0) {
                                    fetchAllPermissions();
                                }
                            }}
                        >
                            权限管理
                        </button>
                    </div>
                )}

                <div className="overflow-y-auto max-h-[60vh]">
                    {/* 基本信息标签页 */}
                    {activeTab === 'basic' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold">ID</label>
                                <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                                    {formData.id || '新角色'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold">角色名称</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name ?? ''}
                                        onChange={handleChange}
                                        className="w-full border rounded px-2 py-1 mt-1"
                                        placeholder="请输入角色名称"
                                    />
                                ) : (
                                    <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                                        {formData.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold">角色类型</label>
                                {isEditing ? (
                                    <select
                                        name="roleType"
                                        value={formData.roleType ?? 0}
                                        onChange={handleChange}
                                        className="w-full border rounded px-2 py-1 mt-1"
                                    >
                                        {roleTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                                        {roleTypes.find(t => t.value === formData.roleType)?.label || '未知类型'}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold">优先级</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        name="rank"
                                        value={formData.rank ?? 0}
                                        onChange={handleChange}
                                        className="w-full border rounded px-2 py-1 mt-1"
                                        min="0"
                                    />
                                ) : (
                                    <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                                        {formData.rank}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold">自动分配</label>
                                {isEditing ? (
                                    <div className="mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                name="autoAdd"
                                                checked={formData.autoAdd ?? false}
                                                onChange={handleChange}
                                                className="rounded border-gray-300"
                                            />
                                            <span className="ml-2">新用户注册时自动分配此角色</span>
                                        </label>
                                    </div>
                                ) : (
                                    <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                                        {formData.autoAdd ? '是' : '否'}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 权限管理标签页 */}
                    {activeTab === 'permissions' && !isCreating && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">角色权限列表</h3>
                                <Button
                                    icon={mdiPlus}
                                    color="info"
                                    onClick={() => setShowAddPermissions(true)}
                                    label="添加权限"
                                    small
                                />
                            </div>

                            {/* 现有权限列表 */}
                            <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                                {rolePermissions.length === 0 ? (
                                    <p className="text-gray-500 text-center">暂无权限</p>
                                ) : (
                                    <div className="space-y-2">
                                        {rolePermissions.map((permission) => (
                                            <div key={permission.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                <div>
                                                    <span className="font-medium">权限ID: {permission.id}</span>
                                                    <span className="ml-4 text-sm text-gray-600">
                                                        {permission.limitCount}次/{permission.timeWindow}{permission.timeWindowUnit}
                                                    </span>
                                                </div>
                                                <Button
                                                    icon={mdiDelete}
                                                    color="danger"
                                                    onClick={() => handleRemovePermission(permission.id)}
                                                    small
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 添加权限模态框 */}
                            {showAddPermissions && (
                                <div className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-semibold">选择要添加的权限</h4>
                                        <button
                                            onClick={() => setShowAddPermissions(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            取消
                                        </button>
                                    </div>
                                    
                                    <div className="max-h-48 overflow-y-auto space-y-2 mb-3">
                                        {availablePermissions.length === 0 ? (
                                            <p className="text-gray-500">没有可添加的权限</p>
                                        ) : (
                                            availablePermissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center p-2 bg-white rounded">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedPermissions.includes(permission.id)}
                                                        onChange={() => togglePermissionSelection(permission.id)}
                                                        className="mr-3"
                                                    />
                                                    <div>
                                                        <span className="font-medium">权限ID: {permission.id}</span>
                                                        <span className="ml-4 text-sm text-gray-600">
                                                            {permission.limitCount}次/{permission.timeWindow}{permission.timeWindowUnit}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    
                                    {selectedPermissions.length > 0 && (
                                        <Button
                                            icon={mdiCheck}
                                            color="success"
                                            onClick={handleAddPermissions}
                                            label={`添加选中的权限 (${selectedPermissions.length})`}
                                            small
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                    {activeTab === 'basic' && (
                        <>
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
                                                setFormData(role);
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
                                    onClick={() => onDelete(role.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                >
                                    删除
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
} 