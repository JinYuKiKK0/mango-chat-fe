// GeneralTable.tsx

"use client";

import React, { useEffect, useState } from "react";
import Buttons from "../../../_components/Buttons";
import Button from "../../../_components/Button";
import { mdiEye, mdiTrashCan, mdiAccount } from "@mdi/js";

// 类型定义，表示传入的数据格式
type RawRow = {
    [key: string]: any;
};

type ColumnDefinition = {
    column: string;
    value: string;
};

type Props = {
    data: RawRow[];
    column: ColumnDefinition[];
    onView?: (row: RawRow) => void;
    onDelete?: (userId: number) => void;
    onUpdate?: (updatedUser: any) => void;
    page?: number; // 当前页（0-based）
    pageSize?: number;
    totalPages?: number;
    totalElements?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    isLoading?: boolean;
};

const TableGeneric = ({ data, column, onView, onDelete, onUpdate, page = 0, totalPages = 1, totalElements = 0, onPageChange, isLoading = false }: Props) => {

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        try {
            return new Date(dateString).toLocaleDateString('zh-CN');
        } catch {
            return dateString;
        }
    };

    const formatCellValue = (value: any, columnKey: string) => {
        if (columnKey.includes('At') || columnKey.includes('Time') || columnKey.includes('time')) {
            return formatDate(value);
        }
        
        // 处理封禁状态
        if (columnKey === 'banStatus') {
            return value === 0 ? '正常' : '封禁';
        }
        
        return value || '-';
    };

    const canGoPrev = page > 0;
    const canGoNext = page < Math.max(totalPages - 1, 0);
    const [pageInput, setPageInput] = useState<string>(String((page ?? 0) + 1));

    useEffect(() => {
        setPageInput(String((page ?? 0) + 1));
    }, [page]);

    const handleJump = () => {
        const target = Math.max(1, Math.min(parseInt(pageInput || '1', 10) || 1, Math.max(totalPages, 1)));
        onPageChange?.(target - 1);
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    {/* 根据 column 定义动态生成表头 */}
                    {column.map((colDef, index) => (
                        <th key={index}>{colDef.value}</th>
                    ))}
                    {/* 额外的操作列 */}
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {/* 如果无数据，显示空消息 */}
                {(data?.length ?? 0) === 0 ? (
                    <tr>
                        <td colSpan={column.length + 1} className="text-center">
                            {isLoading ? '加载中...' : '暂无用户数据'}
                        </td>
                    </tr>
                ) : (
                    data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {/* 对每个 column，从 row 中取对应的值 */}
                            {column.map((colDef, colIndex) => (
                                <td key={colIndex} data-label={colDef.value}>
                                    {colDef.column === 'name' ? (
                                        <div className="flex items-center">
                                            <Button
                                                icon={mdiAccount}
                                                color="whiteDark"
                                                small
                                                className="mr-2"
                                            />
                                            {row[colDef.column] || '-'}
                                        </div>
                                    ) : (
                                        formatCellValue(row[colDef.column], colDef.column)
                                    )}
                                </td>
                            ))}

                            {/* 操作按钮 */}
                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <Buttons type="justify-start lg:justify-end" noWrap>
                                    <Button
                                        color="info"
                                        icon={mdiEye}
                                        onClick={() => onView?.(row)} // 调用传入的查看回调
                                        small
                                        isGrouped
                                    />
                                    <Button
                                        color="danger"
                                        icon={mdiTrashCan}
                                        onClick={() => onDelete?.(row.id)} // 调用传入的删除回调（假设 row.id 是用户 ID）
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

            {/* 分页控件和页码显示（服务端分页） */}
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
                        <span className="mx-2 text-sm mb-3">跳转到</span>
                        <input
                            className="border rounded px-2 py-1 w-16 text-sm mr-2 mb-3"
                            value={pageInput}
                            onChange={(e) => setPageInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleJump();
                            }}
                        />
                        <Button
                            label="跳转"
                            color="whiteDark"
                            small
                            disabled={isLoading}
                            onClick={handleJump}
                            isGrouped
                        />
                    </Buttons>
                    <small className="mt-6 md:mt-0">
                        第 {page + 1} 页，共 {Math.max(totalPages, 1)} 页（共 {totalElements ?? 0} 条）
                    </small>
                </div>
            </div>
        </>
    );
};

export default TableGeneric;
