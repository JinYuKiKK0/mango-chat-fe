// app/admin/tips/_components/TipTable.tsx

'use client';

import { mdiEye, mdiTrashCan, mdiSquareEditOutline, mdiLightbulbOutline } from '@mdi/js';
import React, { useEffect, useState } from 'react';
import Buttons from '../../../_components/Buttons';
import Button from '../../../_components/Button';

interface TipTableProps {
  data: any[];
  column: { key: string; title: string }[];
  onView: (item: any) => void;
  onDelete: (itemId: number) => void;
  onUpdate: (item: any) => void;
  page?: number;
  totalPages?: number;
  totalElements?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

const TipTable: React.FC<TipTableProps> = ({ data, column, onView, onDelete, onUpdate, page = 0, totalPages = 1, totalElements = 0, onPageChange, isLoading = false }) => {
  const [pageInput, setPageInput] = useState<string>(String((page ?? 0) + 1));
  useEffect(() => {
    setPageInput(String((page ?? 0) + 1));
  }, [page]);
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

  const formatCellValue = (value: any, columnKey: string) => {
    if (columnKey.includes('At') || columnKey.includes('Time')) {
      return formatDate(value);
    }
    return value || '-';
  };

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 py-4">{isLoading ? '加载中...' : '暂无Tips数据'}</p>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {column.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {column.map((col) => (
                <td key={col.key} data-label={col.title}>
                  {col.key === 'title' ? (
                    <div className="flex items-center">
                      <Button
                        icon={mdiLightbulbOutline}
                        color="whiteDark"
                        small
                        className="mr-2"
                      />
                      {item[col.key]}
                    </div>
                  ) : (
                    formatCellValue(item[col.key], col.key)
                  )}
                </td>
              ))}
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button
                    color="info"
                    icon={mdiEye}
                    onClick={() => onView(item)}
                    small
                    isGrouped
                  />
                  <Button
                    color="warning"
                    icon={mdiSquareEditOutline}
                    onClick={() => onUpdate(item)}
                    small
                    isGrouped
                  />
                  <Button
                    color="danger"
                    icon={mdiTrashCan}
                    onClick={() => onDelete(item.id)}
                    small
                    isGrouped
                  />
                </Buttons>
              </td>
            </tr>
          ))}
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
            <span className="mx-2 text-sm mb-3">跳转到</span>
            <input
              className="border rounded px-2 py-1 w-16 text-sm mr-2 mb-3"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleJump(); }}
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

export default TipTable;