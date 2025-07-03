// UserDetail.tsx

'use client';

import { useEffect, useState } from 'react';
import { getUserRole, addUserRole, deleteUserRole, getRoleList, getRoleTypes } from '../../../api/api';
import Button from '../../../_components/Button';
import { mdiPlus, mdiDelete, mdiCheck } from '@mdi/js';

interface UserDetailModalProps {
    user: any;
    onClose: () => void;
    onDelete: (userId: number) => void;
    onUpdate?: (updatedUser: any) => void;
}

export default function UserDetailModal({ user, onClose, onDelete, onUpdate }: UserDetailModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);
    const [activeTab, setActiveTab] = useState<'basic' | 'roles'>('basic');
    
    // 角色管理相关状态
    const [userRoles, setUserRoles] = useState<any[]>([]);
    const [allRoles, setAllRoles] = useState<any[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
    const [showAddRoles, setShowAddRoles] = useState(false);
    const [roleTypes, setRoleTypes] = useState<{value: number; label: string}[]>([]);

    useEffect(() => {
        setFormData(user);
        if (user?.id) {
            fetchUserRoles();
        }
        fetchRoleTypes();
    }, [user]);

    const fetchUserRoles = async () => {
        try {
            const response = await getUserRole(user.id);
            if (response.code === 200) {
                const rolesData = response.data;
                if (Array.isArray(rolesData)) {
                    setUserRoles(rolesData);
                } else if (rolesData) { // If it's a single object
                    setUserRoles([rolesData]);
                } else { // If it's null or undefined
                    setUserRoles([]);
                }
            } else {
                setUserRoles([]); // Also handle API error case
            }
        } catch (error) {
            console.error('获取用户角色失败:', error);
            setUserRoles([]); // Ensure it's an array on error
        }
    };

    const fetchAllRoles = async () => {
        try {
            const response = await getRoleList(0, 100);
            if (response.code === 200) {
                setAllRoles(response.data?.content || []);
            }
        } catch (error) {
            console.error('获取角色列表失败:', error);
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

    // 角色管理功能
    const handleAddRoles = async () => {
        if (selectedRoles.length === 0) return;
        
        try {
            await addUserRole(user.id, selectedRoles);
            await fetchUserRoles();
            setSelectedRoles([]);
            setShowAddRoles(false);
        } catch (error) {
            console.error('添加角色失败:', error);
        }
    };

    const handleRemoveRole = async (roleId: number) => {
        try {
            await deleteUserRole(user.id, [roleId]);
            await fetchUserRoles();
        } catch (error) {
            console.error('删除角色失败:', error);
        }
    };

    const toggleRoleSelection = (roleId: number) => {
        setSelectedRoles(prev => 
            prev.includes(roleId) 
                ? prev.filter(id => id !== roleId)
                : [...prev, roleId]
        );
    };

    const availableRoles = allRoles.filter(role => 
        !userRoles.some(userRole => userRole.id === role.id)
    );

    const formatRoleType = (type: number) => {
        const roleType = roleTypes.find(rt => rt.value === type);
        return roleType ? roleType.label : '未知';
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl space-y-4 relative max-h-[90vh] overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg z-10"
                >
                    ✕
                </button>
                
                <h2 className="text-xl font-bold mb-4">用户详情</h2>

                {/* 标签页导航 */}
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
                        className={`px-4 py-2 font-medium ${activeTab === 'roles' 
                            ? 'text-blue-600 border-b-2 border-blue-600' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => {
                            setActiveTab('roles');
                            if (allRoles.length === 0) {
                                fetchAllRoles();
                            }
                        }}
                    >
                        角色管理
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[60vh]">
                    {/* 基本信息标签页 */}
                    {activeTab === 'basic' && (
                        <div className="space-y-4">
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
                        </div>
                    )}

                    {/* 角色管理标签页 */}
                    {activeTab === 'roles' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">用户角色列表</h3>
                                <Button
                                    icon={mdiPlus}
                                    color="info"
                                    onClick={() => setShowAddRoles(true)}
                                    label="添加角色"
                                    small
                                />
                            </div>

                            {/* 现有角色列表 */}
                            <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                                {userRoles.length === 0 ? (
                                    <p className="text-gray-500 text-center">暂无角色</p>
                                ) : (
                                    <div className="space-y-2">
                                        {userRoles.map((role) => (
                                            <div key={role.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                <div>
                                                    <span className="font-medium">{role.name}</span>
                                                    <span className="ml-4 text-sm text-gray-600">
                                                        优先级: {role.rank} | 类型: {formatRoleType(role.roleType)}
                                                    </span>
                                                </div>
                                                <Button
                                                    icon={mdiDelete}
                                                    color="danger"
                                                    onClick={() => handleRemoveRole(role.id)}
                                                    small
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 添加角色模态框 */}
                            {showAddRoles && (
                                <div className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-semibold">选择要添加的角色</h4>
                                        <button
                                            onClick={() => setShowAddRoles(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            取消
                                        </button>
                                    </div>
                                    
                                    <div className="max-h-48 overflow-y-auto space-y-2 mb-3">
                                        {availableRoles.length === 0 ? (
                                            <p className="text-gray-500">没有可添加的角色</p>
                                        ) : (
                                            availableRoles.map((role) => (
                                                <div key={role.id} className="flex items-center p-2 bg-white rounded">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRoles.includes(role.id)}
                                                        onChange={() => toggleRoleSelection(role.id)}
                                                        className="mr-3"
                                                    />
                                                    <div>
                                                        <span className="font-medium">{role.name}</span>
                                                        <span className="ml-4 text-sm text-gray-600">
                                                            优先级: {role.rank} | 类型: {formatRoleType(role.roleType)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    
                                    {selectedRoles.length > 0 && (
                                        <Button
                                            icon={mdiCheck}
                                            color="success"
                                            onClick={handleAddRoles}
                                            label={`添加选中的角色 (${selectedRoles.length})`}
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
