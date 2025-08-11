"use client";

import React, { useState, useEffect } from "react";
import Buttons from "../../../_components/Buttons";
import Button from "../../../_components/Button";
import { mdiEye, mdiTrashCan, mdiShieldAccount } from "@mdi/js";
import { getRoleTypes } from "../../../api/api";

type RoleRow = {
    id: number;
    name: string;
    roleType: number;
    rank: number;
    autoAdd: boolean;
    [key: string]: any;
};

type ColumnDefinition = {
    column: string;
    value: string;
};

type Props = {
    data: RoleRow[];
    column: ColumnDefinition[];
    onView?: (row: RoleRow) => void;
    onDelete?: (roleId: number) => void;
    page?: number;
    totalPages?: number;
    totalElements?: number;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
};

const RoleTable = ({ data, column, onView, onDelete, page = 0, totalPages = 1, totalElements = 0, onPageChange, isLoading = false }: Props) => {
    const [roleTypes, setRoleTypes] = useState<{value: number; label: string}[]>([]);
    const [pageInput, setPageInput] = useState<string>(String((page ?? 0) + 1));
    useEffect(() => { setPageInput(String((page ?? 0) + 1)); }, [page]);
    const canGoPrev = page > 0;
    const canGoNext = page < Math.max(totalPages - 1, 0);
    const handleJump = () => {
        const target = Math.max(1, Math.min(parseInt(pageInput || '1', 10) || 1, Math.max(totalPages, 1)));
        onPageChange?.(target - 1);
    };

    useEffect(() => {
        fetchRoleTypes();
    }, []);

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

    const formatRoleType = (type: number) => {
        const roleType = roleTypes.find(rt => rt.value === type);
        return roleType ? roleType.label : '未知类型';
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>角色名称</th>
                    <th>角色类型</th>
                    <th>优先级</th>
                    <th>自动分配</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {(data?.length ?? 0) === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center">
                            {isLoading ? '加载中...' : '暂无角色数据'}
                        </td>
                    </tr>
                ) : (
                    data.map((row, rowIndex) => (
                        <tr key={row.id || rowIndex}>
                            <td data-label="ID">{row.id}</td>
                            <td data-label="角色名称">
                                <div className="flex items-center">
                                    <Button
                                        icon={mdiShieldAccount}
                                        color="whiteDark"
                                        small
                                        className="mr-2"
                                    />
                                    {row.name}
                                </div>
                            </td>
                            <td data-label="角色类型">{formatRoleType(row.roleType)}</td>
                            <td data-label="优先级">{row.rank}</td>
                            <td data-label="自动分配">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    row.autoAdd ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {row.autoAdd ? '是' : '否'}
                                </span>
                            </td>
                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <Buttons type="justify-start lg:justify-end" noWrap>
                                    <Button
                                        color="info"
                                        icon={mdiEye}
                                        onClick={() => onView?.(row)}
                                        small
                                        isGrouped
                                    />
                                    <Button
                                        color="danger"
                                        icon={mdiTrashCan}
                                        onClick={() => onDelete?.(row.id)}
                                        small
                                        isGrouped
                                    />
                                </Buttons>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                    <Buttons>
                        <Button
                            label="上一页"
                            color="whiteDark"
                            small
                            disabled={!canGoPrev || isLoading}
                            onClick={() => canGoPrev && onPageChange?.(page - 1)}
                            isGrouped
                        />
                        <Button
                            label="下一页"
                            color="whiteDark"
                            small
                            disabled={!canGoNext || isLoading}
                            onClick={() => canGoNext && onPageChange?.(page + 1)}
                            isGrouped
                        />
                        {/* 按需求：角色模块不需要跳页输入 */}
                    </Buttons>
                    <small className="mt-6 md:mt-0">
                        第 {page + 1} 页，共 {Math.max(totalPages, 1)} 页（共 {totalElements ?? 0} 条）
                    </small>
                </div>
            </div>
        </>
    );
};

export default RoleTable; 