"use client";

import React, { useEffect, useState } from "react";
import Buttons from "../../../_components/Buttons";
import Button from "../../../_components/Button";
import { mdiEye, mdiTrashCan, mdiKeyVariant } from "@mdi/js";

type ApiKeyRow = {
    id: number;
    name: string;
    apiKey: string;
    createdAt?: string;
    [key: string]: any;
};

type ColumnDefinition = {
    column: string;
    value: string;
};

type Props = {
    data: ApiKeyRow[];
    column: ColumnDefinition[];
    onView?: (row: ApiKeyRow) => void;
    onDelete?: (apiKeyId: number) => void;
    page?: number;
    totalPages?: number;
    totalElements?: number;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
};

const ApiKeyTable = ({ data, column, onView, onDelete, page = 0, totalPages = 1, totalElements = 0, onPageChange, isLoading = false }: Props) => {
    const canGoPrev = page > 0;
    const canGoNext = page < Math.max(totalPages - 1, 0);

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        try {
            return new Date(dateString).toLocaleDateString('zh-CN');
        } catch {
            return dateString;
        }
    };

    const maskApiKey = (key: string) => {
        if (!key) return '-';
        return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`;
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>名称</th>
                    <th>API Key (部分)</th>
                    <th>创建时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {(data?.length ?? 0) === 0 ? (
                    <tr>
                        <td colSpan={5} className="text-center">
                            {isLoading ? '加载中...' : '暂无API Key数据'}
                        </td>
                    </tr>
                ) : (
                    data.map((row) => (
                        <tr key={row.id}>
                            <td data-label="ID">{row.id}</td>
                            <td data-label="名称">
                                <div className="flex items-center">
                                    <Button
                                        icon={mdiKeyVariant}
                                        color="whiteDark"
                                        small
                                        className="mr-2"
                                    />
                                    {row.name}
                                </div>
                            </td>
                            <td data-label="API Key (部分)">{maskApiKey(row.apiKey)}</td>
                            <td data-label="创建时间">{formatDate(row.createdAt)}</td>
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
                    </Buttons>
                    <small className="mt-6 md:mt-0">
                        第 {page + 1} 页，共 {Math.max(totalPages, 1)} 页（共 {totalElements ?? 0} 条）
                    </small>
                </div>
            </div>
        </>
    );
};

export default ApiKeyTable; 