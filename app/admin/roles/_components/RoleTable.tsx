"use client";

import React, { useState } from "react";
import Buttons from "../../../_components/Buttons";
import Button from "../../../_components/Button";
import { mdiEye, mdiTrashCan, mdiShieldAccount } from "@mdi/js";

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
};

const RoleTable = ({ data, column, onView, onDelete }: Props) => {
    const perPage = 10;

    const numPages = Math.ceil(data.length / perPage);
    const pagesList: number[] = Array.from({ length: numPages }, (_, i) => i);

    const [currentPage, setCurrentPage] = useState(0);

    const dataPaginated = data.slice(
        currentPage * perPage,
        (currentPage + 1) * perPage
    );

    const formatRoleType = (type: number) => {
        const types: { [key: number]: string } = {
            0: '普通角色',
            1: '管理员角色',
            2: '超级管理员'
        };
        return types[type] || '未知类型';
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>角色名称</th>
                    <th>角色类型</th>
                    <th>等级</th>
                    <th>自动分配</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {dataPaginated.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center">
                            暂无角色数据
                        </td>
                    </tr>
                ) : (
                    dataPaginated.map((row, rowIndex) => (
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
                            <td data-label="等级">{row.rank}</td>
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

export default RoleTable; 