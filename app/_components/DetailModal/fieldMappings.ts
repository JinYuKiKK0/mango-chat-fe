// fieldMappings.ts

import type { FieldConfig } from './index';

// 通用字段中文映射
export const FIELD_LABELS: { [key: string]: string } = {
    // 基础字段
    'id': 'ID',
    'name': '名称',
    'title': '标题',
    'content': '内容',
    'description': '描述',
    'status': '状态',
    'type': '类型',
    'category': '分类',
    'priority': '优先级',
    'rank': '优先级',
    'order': '排序',
    'sort': '排序',
    
    // 用户相关
    'username': '用户名',
    'password': '密码',
    'email': '邮箱',
    'phone': '手机号',
    'nickname': '昵称',
    'avatar': '头像',
    'gender': '性别',
    'age': '年龄',
    'birthday': '生日',
    'address': '地址',
    'realName': '真实姓名',
    'idCard': '身份证号',
    'banStatus': '账户状态',
    
    // 角色权限相关
    'roleName': '角色名称',
    'roleType': '角色类型', 
    'roleCode': '角色代码',
    'roleDescription': '角色描述',
    'autoAdd': '自动分配',
    'permissionName': '权限名称',
    'permissionCode': '权限代码',
    'permissionType': '权限类型',
    'limitCount': '限制次数',
    'timeWindow': '时间窗口',
    'timeWindowUnit': '时间单位',
    
    // 群组相关
    'groupName': '群组名称',
    'groupType': '群组类型',
    'groupCode': '群组代码',
    'groupDescription': '群组描述',
    'maxMembers': '最大成员数',
    'isActive': '是否激活',
    'isPublic': '是否公开',
    
    // API Key相关
    'keyName': 'Key名称',
    'apiKey': 'API密钥',
    'keyValue': '密钥值',
    'keyDescription': 'Key描述',
    'expiryDate': '过期时间',
    'isEnabled': '是否启用',
    'lastUsedTime': '最后使用时间',
    'usageCount': '使用次数',
    
    // 公告相关
    'announcementTitle': '公告标题',
    'announcementContent': '公告内容',
    'publishTime': '发布时间',
    'endTime': '结束时间',
    'isPublished': '是否发布',
    'targetUsers': '目标用户',
    'readCount': '阅读次数',
    
    // 提示相关
    'tipTitle': '提示标题',
    'tipContent': '提示内容',
    'tipType': '提示类型',
    'tipLevel': '提示级别',
    'showCount': '显示次数',
    'isVisible': '是否可见',
    
    // 时间相关
    'createTime': '创建时间',
    'updateTime': '更新时间',
    'deleteTime': '删除时间',
    'createdAt': '创建时间',
    'updatedAt': '更新时间',
    'deletedAt': '删除时间',
    'createdBy': '创建者',
    'updatedBy': '更新者',
    'lastLoginTime': '最后登录时间',
    
    // 其他常用
    'remark': '备注',
    'note': '备注',
    'comment': '评论',
    'tag': '标签',
    'tags': '标签',
    'url': '链接',
    'link': '链接',
    'image': '图片',
    'logo': '图标',
    'code': '代码',
    'value': '值',
    'count': '数量',
    'amount': '金额',
    'price': '价格',
    'weight': '权重',
    'score': '分数',
    'rating': '评分',
    'version': '版本',
    'config': '配置',
    'settings': '设置',
    'metadata': '元数据',
    'extra': '额外信息',
    'extension': '扩展信息'
};

// 常用字段类型映射
export const FIELD_TYPES: { [key: string]: FieldConfig['type'] } = {
    'id': 'readonly',
    'password': 'text',
    'email': 'text',
    'phone': 'text',
    'age': 'number',
    'count': 'number',
    'amount': 'number',
    'price': 'number',
    'weight': 'number',
    'score': 'number',
    'rating': 'number',
    'rank': 'number',
    'priority': 'number',
    'order': 'number',
    'sort': 'number',
    'limitCount': 'number',
    'timeWindow': 'number',
    'maxMembers': 'number',
    'usageCount': 'number',
    'readCount': 'number',
    'showCount': 'number',
    'content': 'textarea',
    'description': 'textarea',
    'remark': 'textarea',
    'note': 'textarea',
    'comment': 'textarea',
    'config': 'textarea',
    'metadata': 'textarea',
    'extra': 'textarea',
    'extension': 'textarea',
    'createTime': 'readonly',
    'updateTime': 'readonly',
    'deleteTime': 'readonly',
    'createdAt': 'readonly',
    'updatedAt': 'readonly',
    'deletedAt': 'readonly',
    'lastLoginTime': 'readonly',
    'lastUsedTime': 'readonly',
    'publishTime': 'datetime',
    'endTime': 'datetime',
    'expiryDate': 'datetime',
    'birthday': 'datetime',
    'autoAdd': 'checkbox',
    'isActive': 'checkbox',
    'isPublic': 'checkbox',
    'isEnabled': 'checkbox',
    'isPublished': 'checkbox',
    'isVisible': 'checkbox',
    'banStatus': 'select'
};

// 常用选项配置
export const COMMON_OPTIONS = {
    // 性别选项
    gender: [
        { value: 'male', label: '男' },
        { value: 'female', label: '女' },
        { value: 'other', label: '其他' }
    ],
    
    // 状态选项
    status: [
        { value: 'active', label: '激活' },
        { value: 'inactive', label: '未激活' },
        { value: 'suspended', label: '已暂停' },
        { value: 'deleted', label: '已删除' }
    ],
    
    // 角色类型选项
    roleType: [
        { value: 0, label: '默认角色' },
        { value: 1, label: '管理员角色' },
        { value: 2, label: 'VIP角色' },
        { value: 3, label: '自定义角色' }
    ],
    
    // 群组类型选项
    groupType: [
        { value: 'DEFAULT', label: '默认群组' },
        { value: 'ADMIN', label: '管理群组' },
        { value: 'VIP', label: 'VIP群组' },
        { value: 'CUSTOM', label: '自定义群组' }
    ],
    
    // 权限类型选项
    permissionType: [
        { value: 'CHAT', label: '聊天权限' },
        { value: 'FILE', label: '文件权限' },
        { value: 'ADMIN', label: '管理权限' },
        { value: 'API', label: 'API权限' }
    ],
    
    // 时间单位选项
    timeWindowUnit: [
        { value: '秒', label: '秒' },
        { value: '分钟', label: '分钟' },
        { value: '小时', label: '小时' },
        { value: '天', label: '天' },
        { value: '月', label: '月' }
    ],
    
    // 提示类型选项
    tipType: [
        { value: 'info', label: '信息' },
        { value: 'warning', label: '警告' },
        { value: 'error', label: '错误' },
        { value: 'success', label: '成功' }
    ],
    
    // 提示级别选项
    tipLevel: [
        { value: 1, label: '低' },
        { value: 2, label: '中' },
        { value: 3, label: '高' },
        { value: 4, label: '紧急' }
    ],
    
    // 账户状态选项
    banStatus: [
        { value: 0, label: '正常' },
        { value: 1, label: '封禁' }
    ]
};

/**
 * 根据字段名和数据自动生成字段配置
 * @param fieldKey 字段键名
 * @param value 字段值
 * @param customConfig 自定义配置
 * @returns FieldConfig
 */
export function generateFieldConfig(
    fieldKey: string, 
    value: any, 
    customConfig: Partial<FieldConfig> = {}
): FieldConfig {
    const baseConfig: FieldConfig = {
        key: fieldKey,
        label: FIELD_LABELS[fieldKey] || formatFieldLabel(fieldKey),
        type: FIELD_TYPES[fieldKey] || inferFieldType(value),
        editable: !fieldKey.toLowerCase().includes('time') && fieldKey !== 'id'
    };
    
    // 为特定字段添加选项
    if (COMMON_OPTIONS[fieldKey as keyof typeof COMMON_OPTIONS]) {
        baseConfig.type = 'select';
        baseConfig.options = COMMON_OPTIONS[fieldKey as keyof typeof COMMON_OPTIONS];
    }
    
    // 为必填字段添加验证
    if (['name', 'title', 'username', 'email'].includes(fieldKey)) {
        baseConfig.required = true;
    }
    
    // 合并自定义配置
    return { ...baseConfig, ...customConfig };
}

/**
 * 批量生成字段配置
 * @param data 数据对象
 * @param excludeFields 要排除的字段
 * @param customConfigs 自定义配置映射
 * @returns FieldConfig[]
 */
export function generateFieldConfigs(
    data: any,
    excludeFields: string[] = [],
    customConfigs: { [key: string]: Partial<FieldConfig> } = {}
): FieldConfig[] {
    if (!data || typeof data !== 'object') return [];
    
    return Object.keys(data)
        .filter(key => !excludeFields.includes(key))
        .map(key => generateFieldConfig(key, data[key], customConfigs[key]))
        .sort((a, b) => {
            // ID字段放在最前面
            if (a.key === 'id') return -1;
            if (b.key === 'id') return 1;
            
            // 时间字段放在最后面
            const aIsTime = a.key.toLowerCase().includes('time');
            const bIsTime = b.key.toLowerCase().includes('time');
            if (aIsTime && !bIsTime) return 1;
            if (!aIsTime && bIsTime) return -1;
            
            // 其他按字母顺序
            return a.key.localeCompare(b.key);
        });
}

/**
 * 格式化字段标签（将驼峰命名转换为中文标签）
 * @param fieldKey 字段键名
 * @returns 格式化后的标签
 */
function formatFieldLabel(fieldKey: string): string {
    return fieldKey
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

/**
 * 根据值推断字段类型
 * @param value 字段值
 * @returns 字段类型
 */
function inferFieldType(value: any): FieldConfig['type'] {
    if (typeof value === 'boolean') return 'checkbox';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'string') {
        if (value.length > 100) return 'textarea';
        if (value.includes('@')) return 'text'; // email
        if (/^\d{4}-\d{2}-\d{2}/.test(value)) return 'datetime';
    }
    return 'text';
} 