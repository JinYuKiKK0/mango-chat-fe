// DetailModal/index.tsx

'use client';

import { useEffect, useState } from 'react';
import Button from '../Button';
import { mdiPlus, mdiDelete, mdiCheck, mdiPencil, mdiContentSave, mdiCancel } from '@mdi/js';

// 字段配置接口
export interface FieldConfig {
    key: string;
    label: string;
    type: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'datetime' | 'readonly';
    editable?: boolean;
    options?: { value: any; label: string }[];
    placeholder?: string;
    required?: boolean;
    validator?: (value: any) => string | null;
}

// 标签页配置接口
export interface TabConfig {
    key: string;
    label: string;
    component?: React.ReactNode;
}

// 关联数据管理配置
export interface RelationConfig {
    title: string;
    currentItems: any[];
    availableItems: any[];
    displayField: string;
    idField: string;
    onAdd: (selectedIds: number[]) => Promise<void>;
    onRemove: (id: number) => Promise<void>;
    customRenderer?: (item: any) => React.ReactNode;
}

export interface DetailModalProps {
    // 基础属性
    isOpen: boolean;
    title: string;
    data: any;
    isCreating?: boolean;
    
    // 回调函数
    onClose: () => void;
    onSave: (data: any) => void;
    onDelete?: (id: number) => void;
    
    // 配置
    fields: FieldConfig[];
    tabs?: TabConfig[];
    relations?: { [tabKey: string]: RelationConfig };
    
    // 样式配置
    modalSize?: 'sm' | 'md' | 'lg' | 'xl';
    showDeleteButton?: boolean;
}

const MODAL_SIZES = {
    sm: 'max-w-lg',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
};

export default function DetailModal({
    isOpen,
    title,
    data,
    isCreating = false,
    onClose,
    onSave,
    onDelete,
    fields,
    tabs,
    relations,
    modalSize = 'lg',
    showDeleteButton = true
}: DetailModalProps) {
    const [isEditing, setIsEditing] = useState(isCreating);
    const [formData, setFormData] = useState(data || {});
    const [activeTab, setActiveTab] = useState<string>(tabs?.[0]?.key || 'basic');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
    // 关联数据状态
    const [selectedItems, setSelectedItems] = useState<{ [tabKey: string]: number[] }>({});
    const [showAddItems, setShowAddItems] = useState<{ [tabKey: string]: boolean }>({});

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
        setIsEditing(isCreating);
        setErrors({});
    }, [data, isCreating]);

    useEffect(() => {
        if (!isOpen) {
            setActiveTab(tabs?.[0]?.key || 'basic');
            setSelectedItems({});
            setShowAddItems({});
        }
    }, [isOpen, tabs]);

    const handleInputChange = (fieldKey: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [fieldKey]: value
        }));
        
        // 清除该字段的错误信息
        if (errors[fieldKey]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldKey];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        
        fields.forEach(field => {
            if (field.required && (!formData[field.key] || formData[field.key] === '')) {
                newErrors[field.key] = `${field.label}不能为空`;
            }
            
            if (field.validator && formData[field.key]) {
                const error = field.validator(formData[field.key]);
                if (error) {
                    newErrors[field.key] = error;
                }
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            onSave(formData);
            if (isCreating) {
                onClose();
            } else {
                setIsEditing(false);
            }
        }
    };

    const handleCancel = () => {
        if (isCreating) {
            onClose();
        } else {
            setFormData(data);
            setIsEditing(false);
            setErrors({});
        }
    };

    const toggleItemSelection = (tabKey: string, itemId: number) => {
        setSelectedItems(prev => ({
            ...prev,
            [tabKey]: prev[tabKey]?.includes(itemId) 
                ? prev[tabKey].filter(id => id !== itemId)
                : [...(prev[tabKey] || []), itemId]
        }));
    };

    const handleAddItems = async (tabKey: string) => {
        const relation = relations?.[tabKey];
        if (!relation || !selectedItems[tabKey]?.length) return;
        
        try {
            await relation.onAdd(selectedItems[tabKey]);
            setSelectedItems(prev => ({ ...prev, [tabKey]: [] }));
            setShowAddItems(prev => ({ ...prev, [tabKey]: false }));
        } catch (error) {
            console.error('添加关联项失败:', error);
        }
    };

    const handleRemoveItem = async (tabKey: string, itemId: number) => {
        const relation = relations?.[tabKey];
        if (!relation) return;
        
        try {
            await relation.onRemove(itemId);
        } catch (error) {
            console.error('删除关联项失败:', error);
        }
    };

    const renderField = (field: FieldConfig) => {
        const value = formData[field.key];
        const isFieldEditable = isEditing && field.editable !== false;
        const hasError = errors[field.key];

        return (
            <div key={field.key} className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {isFieldEditable ? (
                    <div>
                        {field.type === 'textarea' ? (
                            <textarea
                                value={value || ''}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    hasError ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder={field.placeholder}
                                rows={4}
                            />
                        ) : field.type === 'select' ? (
                            <select
                                value={value || ''}
                                onChange={(e) => handleInputChange(field.key, 
                                    field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value
                                )}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    hasError ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                {field.options?.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === 'checkbox' ? (
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={value || false}
                                    onChange={(e) => handleInputChange(field.key, e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">{field.placeholder}</span>
                            </label>
                        ) : (
                            <input
                                type={field.type === 'number' ? 'number' : field.type === 'datetime' ? 'datetime-local' : 'text'}
                                value={value || ''}
                                onChange={(e) => handleInputChange(field.key, 
                                    field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
                                )}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    hasError ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder={field.placeholder}
                            />
                        )}
                        {hasError && (
                            <p className="text-red-500 text-xs mt-1">{hasError}</p>
                        )}
                    </div>
                ) : (
                    <div className="border rounded-md px-3 py-2 bg-gray-50 min-h-[42px] flex items-center">
                        {field.type === 'checkbox' ? (
                            <span className="text-sm">{value ? '是' : '否'}</span>
                        ) : field.type === 'select' && field.options ? (
                            <span className="text-sm">
                                {field.options.find(opt => opt.value === value)?.label || '未知'}
                            </span>
                        ) : (
                            <span className="text-sm break-words whitespace-pre-wrap">
                                {value?.toString() || '暂无数据'}
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const renderRelationTab = (tabKey: string, relation: RelationConfig) => {
        const currentSelected = selectedItems[tabKey] || [];
        const showAdd = showAddItems[tabKey] || false;
        const availableItems = relation.availableItems.filter(item => 
            !relation.currentItems.some(current => current[relation.idField] === item[relation.idField])
        );

        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{relation.title}</h3>
                    <Button
                        icon={mdiPlus}
                        color="info"
                        onClick={() => setShowAddItems(prev => ({ ...prev, [tabKey]: true }))}
                        label="添加"
                        small
                    />
                </div>

                {/* 当前项列表 */}
                <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                    {relation.currentItems.length === 0 ? (
                        <p className="text-gray-500 text-center">暂无数据</p>
                    ) : (
                        <div className="space-y-2">
                            {relation.currentItems.map((item) => (
                                <div key={item[relation.idField]} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                    <div className="flex-1">
                                        {relation.customRenderer ? (
                                            relation.customRenderer(item)
                                        ) : (
                                            <span className="font-medium">{item[relation.displayField]}</span>
                                        )}
                                    </div>
                                    <Button
                                        icon={mdiDelete}
                                        color="danger"
                                        onClick={() => handleRemoveItem(tabKey, item[relation.idField])}
                                        small
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 添加项模态框 */}
                {showAdd && (
                    <div className="border rounded-lg p-4 bg-blue-50">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold">选择要添加的项目</h4>
                            <button
                                onClick={() => setShowAddItems(prev => ({ ...prev, [tabKey]: false }))}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                取消
                            </button>
                        </div>
                        
                        <div className="max-h-48 overflow-y-auto space-y-2 mb-3">
                            {availableItems.length === 0 ? (
                                <p className="text-gray-500">没有可添加的项目</p>
                            ) : (
                                availableItems.map((item) => (
                                    <div key={item[relation.idField]} className="flex items-center p-2 bg-white rounded">
                                        <input
                                            type="checkbox"
                                            checked={currentSelected.includes(item[relation.idField])}
                                            onChange={() => toggleItemSelection(tabKey, item[relation.idField])}
                                            className="mr-3"
                                        />
                                        <div className="flex-1">
                                            {relation.customRenderer ? (
                                                relation.customRenderer(item)
                                            ) : (
                                                <span className="font-medium">{item[relation.displayField]}</span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {currentSelected.length > 0 && (
                            <Button
                                icon={mdiCheck}
                                color="success"
                                onClick={() => handleAddItems(tabKey)}
                                label={`添加选中项目 (${currentSelected.length})`}
                                small
                            />
                        )}
                    </div>
                )}
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50">
            <div className={`bg-white rounded-xl shadow-2xl p-6 w-full ${MODAL_SIZES[modalSize]} space-y-4 relative max-h-[90vh] overflow-hidden`}>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl z-10 transition-colors"
                >
                    ✕
                </button>
                
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {isCreating ? `新建${title}` : `${title}详情`}
                </h2>

                {/* 标签页导航 */}
                {tabs && tabs.length > 0 && (
                    <div className="flex border-b border-gray-200 mb-4">
                        <button
                            className={`px-4 py-2 font-medium transition-colors ${
                                activeTab === 'basic' 
                                    ? 'text-blue-600 border-b-2 border-blue-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('basic')}
                        >
                            基本信息
                        </button>
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                className={`px-4 py-2 font-medium transition-colors ${
                                    activeTab === tab.key 
                                        ? 'text-blue-600 border-b-2 border-blue-600' 
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}

                <div className="overflow-y-auto max-h-[60vh] px-1">
                    {/* 基本信息标签页 */}
                    {activeTab === 'basic' && (
                        <div className="space-y-1">
                            {fields.map(renderField)}
                        </div>
                    )}

                    {/* 自定义标签页 */}
                    {tabs?.map(tab => (
                        activeTab === tab.key && (
                            <div key={tab.key}>
                                {tab.component || (
                                    relations?.[tab.key] && renderRelationTab(tab.key, relations[tab.key])
                                )}
                            </div>
                        )
                    ))}
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    {activeTab === 'basic' && (
                        <>
                            {!isCreating && !isEditing && (
                                <Button
                                    icon={mdiPencil}
                                    color="warning"
                                    onClick={() => setIsEditing(true)}
                                    label="编辑"
                                />
                            )}
                            {isEditing && (
                                <>
                                    <Button
                                        icon={mdiContentSave}
                                        color="success"
                                        onClick={handleSave}
                                        label="保存"
                                    />
                                    <Button
                                        icon={mdiCancel}
                                        color="lightDark"
                                        onClick={handleCancel}
                                        label="取消"
                                    />
                                </>
                            )}
                            {!isCreating && showDeleteButton && onDelete && (
                                <Button
                                    icon={mdiDelete}
                                    color="danger"
                                    onClick={() => onDelete(formData.id)}
                                    label="删除"
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}