"use client";

import React, { useEffect, useState } from "react";
import Buttons from "../../../_components/Buttons";
import Button from "../../../_components/Button";
import { mdiEye, mdiTrashCan } from "@mdi/js";

type PermissionRow = {
    id: number;
    limitCount: number;
    timeWindowUnit: string;
    timeWindow: number;
    [key: string]: any;
};

type ColumnDefinition = {
    column: string;
    value: string;
};

type Props = {
    data: PermissionRow[];
    column: ColumnDefinition[];
    onView?: (row: PermissionRow) => void;
    onDelete?: (permissionId: number) => void;
    page?: number;
    totalPages?: number;
    totalElements?: number;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
};

const PermissionTable = ({ data, column, onView, onDelete, page = 0, totalPages = 1, totalElements = 0, onPageChange, isLoading = false }: Props) => {
    const canGoPrev = page > 0;
    const canGoNext = page < Math.max(totalPages - 1, 0);

    const formatValue = (value: any, columnName: string) => {
        if (columnName === 'timeWindowUnit') {
            const unitMap: { [key: string]: string } = {
                'SECOND': '秒',
                'MINUTE': '分钟',
                'HOUR': '小时',
                'DAY': '天'
            };
            return unitMap[value] || value;
        }
        return value ?? "";
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>调用限制次数</th>
                    <th>时间窗口</th>
                    <th>时间单位</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {(data?.length ?? 0) === 0 ? (
                    <tr>
                        <td colSpan={5} className="text-center">
                            {isLoading ? '加载中...' : '暂无权限数据'}
                        </td>
                    </tr>
                ) : (
                    data.map((row, rowIndex) => (
                        <tr key={row.id || rowIndex}>
                            <td data-label="ID">{row.id}</td>
                            <td data-label="调用限制次数">{row.limitCount}</td>
                            <td data-label="时间窗口">{row.timeWindow}</td>
                            <td data-label="时间单位">{formatValue(row.timeWindowUnit, 'timeWindowUnit')}</td>
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
                        {/* 按需求：权限模块不需要跳页输入 */}
                    </Buttons>
                    <small className="mt-6 md:mt-0">
                        第 {page + 1} 页，共 {Math.max(totalPages, 1)} 页（共 {totalElements ?? 0} 条）
                    </small>
                </div>
            </div>
        </>
    );
};

export default PermissionTable; 