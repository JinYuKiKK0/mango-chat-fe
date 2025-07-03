'use client';

import { useEffect, useState } from 'react';
import { 
    getUserGroupMemberList, 
    addUserGroupMember, 
    deleteUserGroupMember,
    getUserGroupRoleList,
    addUserGroupRole,
    deleteUserGroupRole,
    getUserList,
    getRoleList
} from '../../../api/api';
import Button from '../../../_components/Button';
import { mdiPlus, mdiDelete, mdiCheck } from '@mdi/js';

interface GroupDetailModalProps {
    group: any;
    isCreating: boolean;
    onClose: () => void;
    onDelete: (groupId: number) => void;
    onSave: (group: any) => void;
}

export default function GroupDetailModal({ 
    group, 
    isCreating, 
    onClose, 
    onDelete, 
    onSave 
}: GroupDetailModalProps) {
    const [isEditing, setIsEditing] = useState(isCreating);
    const [formData, setFormData] = useState(group);
    const [activeTab, setActiveTab] = useState<'basic' | 'members' | 'roles'>('basic');
    
    // 成员管理相关状态
    const [groupMembers, setGroupMembers] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [showAddMembers, setShowAddMembers] = useState(false);

    // 角色管理相关状态
    const [groupRoles, setGroupRoles] = useState<any[]>([]);
    const [allRoles, setAllRoles] = useState<any[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
    const [showAddRoles, setShowAddRoles] = useState(false);

    useEffect(() => {
        setFormData(group);
        setIsEditing(isCreating);
        if (!isCreating && group?.id) {
            fetchGroupMembers();
            fetchGroupRoles();
        }
    }, [group, isCreating]);

    const fetchGroupMembers = async () => {
        try {
            const response = await getUserGroupMemberList(group.id);
            if (response.code === 200) {
                setGroupMembers(response.data?.content || []);
            }
        } catch (error) {
            console.error('获取群组成员失败:', error);
        }
    };

    const fetchGroupRoles = async () => {
        try {
            const response = await getUserGroupRoleList(group.id);
            if (response.code === 200) {
                setGroupRoles(response.data?.content || []);
            }
        } catch (error) {
            console.error('获取群组角色失败:', error);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const response = await getUserList(0, 100);
            if (response.code === 200) {
                setAllUsers(response.data?.content || []);
            }
        } catch (error) {
            console.error('获取用户列表失败:', error);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    // 成员管理功能
    const handleAddMembers = async () => {
        if (selectedUsers.length === 0) return;
        
        try {
            await addUserGroupMember(group.id, selectedUsers);
            await fetchGroupMembers();
            setSelectedUsers([]);
            setShowAddMembers(false);
        } catch (error) {
            console.error('添加成员失败:', error);
        }
    };

    const handleRemoveMember = async (userId: number) => {
        try {
            await deleteUserGroupMember(group.id, [userId]);
            await fetchGroupMembers();
        } catch (error) {
            console.error('删除成员失败:', error);
        }
    };

    const toggleUserSelection = (userId: number) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    // 角色管理功能
    const handleAddRoles = async () => {
        if (selectedRoles.length === 0) return;
        
        try {
            await addUserGroupRole(group.id, selectedRoles);
            await fetchGroupRoles();
            setSelectedRoles([]);
            setShowAddRoles(false);
        } catch (error) {
            console.error('添加角色失败:', error);
        }
    };

    const handleRemoveRole = async (roleId: number) => {
        try {
            await deleteUserGroupRole(group.id, [roleId]);
            await fetchGroupRoles();
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

    const groupTypes = [
        { value: 'DEFAULT', label: '默认群组' },
        { value: 'ADMIN', label: '管理群组' },
        { value: 'VIP', label: 'VIP群组' },
        { value: 'CUSTOM', label: '自定义群组' },
    ];

    const availableUsers = allUsers.filter(user => 
        !groupMembers.some(member => member.id === user.id)
    );

    const availableRoles = allRoles.filter(role => 
        !groupRoles.some(groupRole => groupRole.id === role.id)
    );

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl space-y-4 relative max-h-[90vh] overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg z-10"
                >
                    ✕
                </button>
                
                <h2 className="text-xl font-bold mb-4">
                    {isCreating ? '新增群组' : '群组详情'}
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
                            className={`px-4 py-2 font-medium ${activeTab === 'members' 
                                ? 'text-blue-600 border-b-2 border-blue-600' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => {
                                setActiveTab('members');
                                if (allUsers.length === 0) {
                                    fetchAllUsers();
                                }
                            }}
                        >
                            成员管理
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
                )}

                <div className="overflow-y-auto max-h-[60vh]">
                    {/* 基本信息标签页 */}
                    {activeTab === 'basic' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold">ID</label>
                                <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                                    {formData.id || '新群组'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold">群组名称</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name ?? ''}
                                        onChange={handleChange}
                                        className="w-full border rounded px-2 py-1 mt-1"
                                        placeholder="请输入群组名称"
                                    />
                                ) : (
                                    <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                                        {formData.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold">群组类型</label>
                                {isEditing ? (
                                    <select
                                        name="type"
                                        value={formData.type ?? ''}
                                        onChange={handleChange}
                                        className="w-full border rounded px-2 py-1 mt-1"
                                    >
                                        <option value="">请选择群组类型</option>
                                        {groupTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                                        {groupTypes.find(t => t.value === formData.type)?.label || formData.type || '未设置'}
                                    </p>
                                )}
                            </div>

                            {!isCreating && (
                                <>
                                    <div>
                                        <label className="block text-sm font-semibold">创建时间</label>
                                        <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                                            {formData.createdAt ? new Date(formData.createdAt).toLocaleString('zh-CN') : '-'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold">更新时间</label>
                                        <p className="border rounded px-2 py-1 mt-1 bg-gray-100">
                                            {formData.updatedAt ? new Date(formData.updatedAt).toLocaleString('zh-CN') : '-'}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* 成员管理标签页 */}
                    {activeTab === 'members' && !isCreating && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">群组成员列表</h3>
                                <Button
                                    icon={mdiPlus}
                                    color="info"
                                    onClick={() => setShowAddMembers(true)}
                                    label="添加成员"
                                    small
                                />
                            </div>

                            {/* 现有成员列表 */}
                            <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                                {groupMembers.length === 0 ? (
                                    <p className="text-gray-500 text-center">暂无成员</p>
                                ) : (
                                    <div className="space-y-2">
                                        {groupMembers.map((member) => (
                                            <div key={member.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                <div>
                                                    <span className="font-medium">{member.name}</span>
                                                    <span className="ml-4 text-sm text-gray-600">{member.email}</span>
                                                </div>
                                                <Button
                                                    icon={mdiDelete}
                                                    color="danger"
                                                    onClick={() => handleRemoveMember(member.id)}
                                                    small
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 添加成员模态框 */}
                            {showAddMembers && (
                                <div className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-semibold">选择要添加的成员</h4>
                                        <button
                                            onClick={() => setShowAddMembers(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            取消
                                        </button>
                                    </div>
                                    
                                    <div className="max-h-48 overflow-y-auto space-y-2 mb-3">
                                        {availableUsers.length === 0 ? (
                                            <p className="text-gray-500">没有可添加的用户</p>
                                        ) : (
                                            availableUsers.map((user) => (
                                                <div key={user.id} className="flex items-center p-2 bg-white rounded">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUsers.includes(user.id)}
                                                        onChange={() => toggleUserSelection(user.id)}
                                                        className="mr-3"
                                                    />
                                                    <div>
                                                        <span className="font-medium">{user.name}</span>
                                                        <span className="ml-4 text-sm text-gray-600">{user.email}</span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    
                                    {selectedUsers.length > 0 && (
                                        <Button
                                            icon={mdiCheck}
                                            color="success"
                                            onClick={handleAddMembers}
                                            label={`添加选中的成员 (${selectedUsers.length})`}
                                            small
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 角色管理标签页 */}
                    {activeTab === 'roles' && !isCreating && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">群组角色列表</h3>
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
                                {groupRoles.length === 0 ? (
                                    <p className="text-gray-500 text-center">暂无角色</p>
                                ) : (
                                    <div className="space-y-2">
                                        {groupRoles.map((role) => (
                                            <div key={role.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                <div>
                                                    <span className="font-medium">{role.name}</span>
                                                    <span className="ml-4 text-sm text-gray-600">优先级: {role.rank}</span>
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
                                                        <span className="ml-4 text-sm text-gray-600">优先级: {role.rank}</span>
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
                                                setFormData(group);
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
                                    onClick={() => onDelete(group.id)}
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