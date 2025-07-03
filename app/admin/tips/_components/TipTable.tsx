// app/admin/tips/_components/TipTable.tsx

'use client';

import { mdiEye, mdiTrashCan, mdiSquareEditOutline, mdiLightbulbOutline } from '@mdi/js';
import React, { useState } from 'react';
import Buttons from '../../../_components/Buttons';
import Button from '../../../_components/Button';

interface TipTableProps {
  data: any[];
  column: { key: string; title: string }[];
  onView: (item: any) => void;
  onDelete: (itemId: number) => void;
  onUpdate: (item: any) => void;
}

const TipTable: React.FC<TipTableProps> = ({ data, column, onView, onDelete, onUpdate }) => {
  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const dataPaginated = data.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );

  const numPages = Math.ceil(data.length / perPage);
  const pagesList: number[] = Array.from({ length: numPages }, (_, i) => i);

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
    return <p className="text-center text-gray-500 py-4">暂无Tips数据</p>;
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
          {dataPaginated.map((item) => (
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

export default TipTable;