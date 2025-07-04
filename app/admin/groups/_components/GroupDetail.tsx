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
import DetailModal, { FieldConfig, TabConfig, RelationConfig } from '../../../_components/DetailModal';
import { generateFieldConfigs, COMMON_OPTIONS } from '../../../_components/DetailModal/fieldMappings';

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
    const [isOpen, setIsOpen] = useState(true);
    
    // 成员和角色管理相关状态
    const [groupMembers, setGroupMembers] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [groupRoles, setGroupRoles] = useState<any[]>([]);
    const [allRoles, setAllRoles] = useState<any[]>([]);

    useEffect(() => {
        if (!isCreating && group?.id) {
            fetchGroupMembers();
            fetchGroupRoles();
        }
        fetchAllUsers();
        fetchAllRoles();
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

    // 配置群组字段
    const groupFields: FieldConfig[] = generateFieldConfigs(
        group,
        [], // 不排除任何字段
        {
            // 自定义字段配置
            name: { required: true, placeholder: '请输入群组名称' },
            groupType: {
                type: 'select',
                options: COMMON_OPTIONS.groupType
            },
            description: {
                type: 'textarea',
                placeholder: '请输入群组描述'
            },
            maxMembers: {
                type: 'number',
                label: '最大成员数',
                placeholder: '0表示不限制'
            },
            isActive: {
                type: 'checkbox',
                label: '是否激活',
                placeholder: '勾选表示群组处于激活状态'
            },
            isPublic: {
                type: 'checkbox',
                label: '是否公开',
                placeholder: '勾选表示任何人都可以加入此群组'
            }
        }
    );

    // 配置标签页 (仅在非创建模式下显示成员和角色管理)
    const tabs: TabConfig[] = !isCreating ? [
        {
            key: 'members',
            label: '成员管理'
        },
        {
            key: 'roles',
            label: '角色管理'
        }
    ] : [];

    // 配置关联数据
    const relations: { [key: string]: RelationConfig } = !isCreating ? {
        members: {
            title: '群组成员列表',
            currentItems: groupMembers,
            availableItems: allUsers,
            displayField: 'username',
            idField: 'id',
            onAdd: async (userIds: number[]) => {
                await addUserGroupMember(group.id, userIds);
                await fetchGroupMembers();
            },
            onRemove: async (userId: number) => {
                await deleteUserGroupMember(group.id, [userId]);
                await fetchGroupMembers();
            },
            customRenderer: (user: any) => (
                <div>
                    <span className="font-medium">{user.username}</span>
                    <span className="ml-4 text-sm text-gray-600">
                        {user.nickname ? `(${user.nickname})` : ''} | {user.email}
                    </span>
                </div>
            )
        },
        roles: {
            title: '群组角色列表',
            currentItems: groupRoles,
            availableItems: allRoles,
            displayField: 'name',
            idField: 'id',
            onAdd: async (roleIds: number[]) => {
                await addUserGroupRole(group.id, roleIds);
                await fetchGroupRoles();
            },
            onRemove: async (roleId: number) => {
                await deleteUserGroupRole(group.id, [roleId]);
                await fetchGroupRoles();
            },
            customRenderer: (role: any) => (
                <div>
                    <span className="font-medium">{role.name}</span>
                    <span className="ml-4 text-sm text-gray-600">
                        优先级: {role.rank} | 类型: {role.roleType}
                    </span>
                </div>
            )
        }
    } : {};

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    const handleSave = (updatedData: any) => {
        onSave(updatedData);
        if (!isCreating) {
            setIsOpen(false);
        }
    };

    const handleDelete = (groupId: number) => {
        setIsOpen(false);
        onDelete(groupId);
    };

    return (
        <DetailModal
            isOpen={isOpen}
            title="群组"
            data={group}
            isCreating={isCreating}
            onClose={handleClose}
            onSave={handleSave}
            onDelete={!isCreating ? handleDelete : undefined}
            fields={groupFields}
            tabs={tabs}
            relations={relations}
            modalSize="xl"
            showDeleteButton={!isCreating}
        />
    );
} 