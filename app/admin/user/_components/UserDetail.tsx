// UserDetail.tsx

'use client';

import { useEffect, useState } from 'react';
import { 
    getUserRole, 
    addUserRole, 
    deleteUserRole, 
    getRoleList, 
    getRoleTypes 
} from '../../../api/api';
import DetailModal, { FieldConfig, TabConfig, RelationConfig } from '../../../_components/DetailModal';
import { generateFieldConfigs, COMMON_OPTIONS } from '../../../_components/DetailModal/fieldMappings';

interface UserDetailModalProps {
    user: any;
    onClose: () => void;
    onDelete: (userId: number) => void;
    onUpdate?: (updatedUser: any) => void;
}

export default function UserDetailModal({ 
    user, 
    onClose, 
    onDelete, 
    onUpdate 
}: UserDetailModalProps) {
    const [isOpen, setIsOpen] = useState(true);
    
    // 角色管理相关状态
    const [userRoles, setUserRoles] = useState<any[]>([]);
    const [allRoles, setAllRoles] = useState<any[]>([]);
    const [roleTypes, setRoleTypes] = useState<{value: number; label: string}[]>([]);

    useEffect(() => {
        if (user?.id) {
            fetchUserRoles();
        }
        fetchRoleTypes();
        fetchAllRoles();
    }, [user]);

    const fetchUserRoles = async () => {
        try {
            const response = await getUserRole(user.id);
            if (response.code === 200) {
                const rolesData = response.data;
                if (Array.isArray(rolesData)) {
                    setUserRoles(rolesData);
                } else if (rolesData) {
                    setUserRoles([rolesData]);
                } else {
                    setUserRoles([]);
                }
            } else {
                setUserRoles([]);
            }
        } catch (error) {
            console.error('获取用户角色失败:', error);
            setUserRoles([]);
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

    // 配置用户字段
    const userFields: FieldConfig[] = generateFieldConfigs(
        user,
        [], // 不排除任何字段
        {
            // 自定义字段配置
            password: { type: 'text', editable: false, placeholder: '密码已隐藏' },
            email: { required: true, placeholder: '请输入邮箱地址' },
            username: { required: true, placeholder: '请输入用户名' },
            nickname: { placeholder: '请输入昵称' },
            phone: { placeholder: '请输入手机号码' },
            status: { 
                type: 'select',
                options: COMMON_OPTIONS.status
            },
            banStatus: {
                type: 'select',
                label: '账户状态',
                options: COMMON_OPTIONS.banStatus,
                placeholder: '选择账户状态'
            }
        }
    );

    // 配置标签页
    const tabs: TabConfig[] = [
        {
            key: 'roles',
            label: '角色管理'
        }
    ];

    // 配置角色关联数据
    const relations: { [key: string]: RelationConfig } = {
        roles: {
            title: '用户角色列表',
            currentItems: userRoles,
            availableItems: allRoles,
            displayField: 'name',
            idField: 'id',
            onAdd: async (roleIds: number[]) => {
                await addUserRole(user.id, roleIds);
            await fetchUserRoles();
            },
            onRemove: async (roleId: number) => {
            await deleteUserRole(user.id, [roleId]);
            await fetchUserRoles();
            },
            customRenderer: (role: any) => (
                <div>
                    <span className="font-medium">{role.name}</span>
                    <span className="ml-4 text-sm text-gray-600">
                        优先级: {role.rank} | 类型: {formatRoleType(role.roleType)}
                    </span>
                </div>
            )
        }
    };

    const formatRoleType = (type: number) => {
        const roleType = roleTypes.find(rt => rt.value === type);
        return roleType ? roleType.label : '未知';
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    const handleSave = (updatedData: any) => {
        if (onUpdate) {
            onUpdate(updatedData);
        }
    };

    const handleDelete = (userId: number) => {
        setIsOpen(false);
        onDelete(userId);
    };

    return (
        <DetailModal
            isOpen={isOpen}
            title="用户"
            data={user}
            onClose={handleClose}
            onSave={handleSave}
            onDelete={handleDelete}
            fields={userFields}
            tabs={tabs}
            relations={relations}
            modalSize="xl"
            showDeleteButton={true}
        />
    );
}
