// GeneralTable.tsx

"use client";

import React, { useState } from "react";
import Buttons from "../../../_components/Buttons";
import Button from "../../../_components/Button";
import { mdiEye, mdiTrashCan } from "@mdi/js";

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
};


const TableGeneric = ({ data, column, onView, onDelete, onUpdate }: Props) => {
    const perPage = 5;

    const numPages = Math.ceil(data.length / perPage);
    const pagesList: number[] = Array.from({ length: numPages }, (_, i) => i);

    const [currentPage, setCurrentPage] = useState(0);

    const dataPaginated = data.slice(
        currentPage * perPage,
        (currentPage + 1) * perPage
    );

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
                {dataPaginated.length === 0 ? (
                    <tr>
                        <td colSpan={column.length + 1} className="text-center">
                            No data available.
                        </td>
                    </tr>
                ) : (
                    dataPaginated.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {/* 对每个 column，从 row 中取对应的值 */}
                            {column.map((colDef, colIndex) => (
                                <td key={colIndex} data-label={colDef.value}>
                                    {row[colDef.column] ?? ""}
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

            {/* 分页控件和页码显示 */}
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
                        Page {currentPage + 1} of {numPages}
                    </small>
                </div>
            </div>
        </>
    );
};

export default TableGeneric;
