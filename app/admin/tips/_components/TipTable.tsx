// app/admin/tips/_components/TipTable.tsx

'use client';

import { mdiEye, mdiTrashCan, mdiSquareEditOutline } from '@mdi/js';
import React from 'react';
import Buttons from '../../../_components/Buttons';
import Icon from '../../../_components/Icon';

interface TipTableProps {
  data: any[];
  column: { key: string; title: string }[];
  onView: (item: any) => void;
  onDelete: (itemId: number) => void;
  onUpdate: (item: any) => void; // To initiate editing
}

const TipTable: React.FC<TipTableProps> = ({ data, column, onView, onDelete, onUpdate }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 py-4">暂无Tips数据</p>;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {column.map((col) => (
            <th
              key={col.key}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {col.title}
            </th>
          ))}
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            操作
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id}>
            {column.map((col) => (
              <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item[col.key]}
              </td>
            ))}
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Buttons type="justify-start lg:justify-end" noWrap>
                <button onClick={() => onView(item)} className="text-blue-600 hover:text-blue-900 mr-2">
                  <Icon path={mdiEye} size={20} />
                </button>
                <button onClick={() => onUpdate(item)} className="text-yellow-600 hover:text-yellow-900 mr-2">
                  <Icon path={mdiSquareEditOutline} size={20} />
                </button>
                <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-900">
                  <Icon path={mdiTrashCan} size={20} />
                </button>
              </Buttons>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TipTable;