"use client";

import React, { useState } from "react";
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
};

const PermissionTable = ({ data, column, onView, onDelete }: Props) => {
    const perPage = 10;

    const numPages = Math.ceil(data.length / perPage);
    const pagesList: number[] = Array.from({ length: numPages }, (_, i) => i);

    const [currentPage, setCurrentPage] = useState(0);

    const dataPaginated = data.slice(
        currentPage * perPage,
        (currentPage + 1) * perPage
    );

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
                {dataPaginated.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="text-center">
                            暂无权限数据
                        </td>
                    </tr>
                ) : (
                    dataPaginated.map((row, rowIndex) => (
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

export default PermissionTable; 