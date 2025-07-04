'use client';

import { useEffect, useState } from 'react';
import { 
    getRolePermissionList, 
    addRolePermission, 
    deleteRolePermission, 
    getPermissionList, 
    getRoleTypes 
} from '../../../api/api';
import DetailModal, { FieldConfig, TabConfig, RelationConfig } from '../../../_components/DetailModal';
import { generateFieldConfigs, COMMON_OPTIONS } from '../../../_components/DetailModal/fieldMappings';

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
    const [isOpen, setIsOpen] = useState(true);
    
    // 权限管理相关状态
    const [rolePermissions, setRolePermissions] = useState<any[]>([]);
    const [allPermissions, setAllPermissions] = useState<any[]>([]);
    const [roleTypes, setRoleTypes] = useState<{value: number; label: string}[]>([]);

    useEffect(() => {
        if (!isCreating && role?.id) {
            fetchRolePermissions();
        }
        fetchRoleTypes();
        fetchAllPermissions();
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
            const response = await getPermissionList(0, 100);
            if (response.code === 200) {
                setAllPermissions(response.data?.content || []);
            }
        } catch (error) {
            console.error('获取权限列表失败:', error);
        }
    };

    // 配置角色字段
    const roleFields: FieldConfig[] = generateFieldConfigs(
        role,
        [], // 不排除任何字段
        {
            // 自定义字段配置
            name: { required: true, placeholder: '请输入角色名称' },
            roleType: {
                type: 'select',
                options: roleTypes.length > 0 ? roleTypes : COMMON_OPTIONS.roleType
            },
            rank: {
                type: 'number',
                label: '优先级',
                placeholder: '数字越小优先级越高'
            },
            autoAdd: {
                type: 'checkbox',
                label: '自动分配',
                placeholder: '新用户注册时自动分配此角色'
            }
        }
    );

    // 配置标签页 (仅在非创建模式下显示权限管理)
    const tabs: TabConfig[] = !isCreating ? [
        {
            key: 'permissions',
            label: '权限管理'
        }
    ] : [];

    // 配置权限关联数据
    const relations: { [key: string]: RelationConfig } = !isCreating ? {
        permissions: {
            title: '角色权限列表',
            currentItems: rolePermissions,
            availableItems: allPermissions,
            displayField: 'id',
            idField: 'id',
            onAdd: async (permissionIds: number[]) => {
                await addRolePermission(role.id, permissionIds);
                await fetchRolePermissions();
            },
            onRemove: async (permissionId: number) => {
            await deleteRolePermission(role.id, [permissionId]);
            await fetchRolePermissions();
            },
            customRenderer: (permission: any) => (
                                                <div>
                                                    <span className="font-medium">权限ID: {permission.id}</span>
                                                    <span className="ml-4 text-sm text-gray-600">
                                                        {permission.limitCount}次/{permission.timeWindow}{permission.timeWindowUnit}
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

    const handleDelete = (roleId: number) => {
        setIsOpen(false);
        onDelete(roleId);
    };

    return (
        <DetailModal
            isOpen={isOpen}
            title="角色"
            data={role}
            isCreating={isCreating}
            onClose={handleClose}
            onSave={handleSave}
            onDelete={!isCreating ? handleDelete : undefined}
            fields={roleFields}
            tabs={tabs}
            relations={relations}
            modalSize="xl"
            showDeleteButton={!isCreating}
        />
    );
} 