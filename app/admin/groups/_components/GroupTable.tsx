"use client";

import React, { useEffect, useState } from "react";
import Buttons from "../../../_components/Buttons";
import Button from "../../../_components/Button";
import { mdiEye, mdiTrashCan, mdiAccountMultiple } from "@mdi/js";

type GroupRow = {
    id: number;
    name: string;
    type: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any;
};

type ColumnDefinition = {
    column: string;
    value: string;
};

type Props = {
    data: GroupRow[];
    column: ColumnDefinition[];
    onView?: (row: GroupRow) => void;
    onDelete?: (groupId: number) => void;
    page?: number;
    totalPages?: number;
    totalElements?: number;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
};

const GroupTable = ({ data, column, onView, onDelete, page = 0, totalPages = 1, totalElements = 0, onPageChange, isLoading = false }: Props) => {
    const [pageInput, setPageInput] = useState<string>(String((page ?? 0) + 1));
    useEffect(() => { setPageInput(String((page ?? 0) + 1)); }, [page]);
    const canGoPrev = page > 0;
    const canGoNext = page < Math.max(totalPages - 1, 0);
    const handleJump = () => {
        const target = Math.max(1, Math.min(parseInt(pageInput || '1', 10) || 1, Math.max(totalPages, 1)));
        onPageChange?.(target - 1);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        try {
            return new Date(dateString).toLocaleDateString('zh-CN');
        } catch {
            return dateString;
        }
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>群组名称</th>
                    <th>群组类型</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {(data?.length ?? 0) === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center">
                            {isLoading ? '加载中...' : '暂无群组数据'}
                        </td>
                    </tr>
                ) : (
                    data.map((row, rowIndex) => (
                        <tr key={row.id || rowIndex}>
                            <td data-label="ID">{row.id}</td>
                            <td data-label="群组名称">
                                <div className="flex items-center">
                                    <Button
                                        icon={mdiAccountMultiple}
                                        color="whiteDark"
                                        small
                                        className="mr-2"
                                    />
                                    {row.name}
                                </div>
                            </td>
                            <td data-label="群组类型">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {row.type || '默认'}
                                </span>
                            </td>
                            <td data-label="创建时间">{formatDate(row.createdAt)}</td>
                            <td data-label="更新时间">{formatDate(row.updatedAt)}</td>
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
                        {/* 按需求：群组模块不需要跳页输入 */}
                    </Buttons>
                    <small className="mt-6 md:mt-0">
                        第 {page + 1} 页，共 {Math.max(totalPages, 1)} 页（共 {totalElements ?? 0} 条）
                    </small>
                </div>
            </div>
        </>
    );
};

export default GroupTable; 