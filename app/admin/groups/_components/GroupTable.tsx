"use client";

import React, { useState } from "react";
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
};

const GroupTable = ({ data, column, onView, onDelete }: Props) => {
    const perPage = 10;

    const numPages = Math.ceil(data.length / perPage);
    const pagesList: number[] = Array.from({ length: numPages }, (_, i) => i);

    const [currentPage, setCurrentPage] = useState(0);

    const dataPaginated = data.slice(
        currentPage * perPage,
        (currentPage + 1) * perPage
    );

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
                {dataPaginated.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center">
                            暂无群组数据
                        </td>
                    </tr>
                ) : (
                    dataPaginated.map((row, rowIndex) => (
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
                    {numPages > 1 && (
                        <Buttons>
                            {pagesList.map((page) => (
                                <Button
                                    key={page}
                                    active={page === currentPage}
                                    label={(page + 1).toString()}
                                    color={page === currentPage ? "lightDark" : "whiteDark"}
                                    small
                                    onClick={() => setCurrentPage(page)}
                                    isGrouped
                                />
                            ))}
                        </Buttons>
                    )}
                    <small className="mt-6 md:mt-0">
                        第 {currentPage + 1} 页，共 {numPages} 页
                    </small>
                </div>
            </div>
        </>
    );
};

export default GroupTable; 