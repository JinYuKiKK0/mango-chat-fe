// app/admin/tips/_components/TipForm.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Button from '../../../_components/Button';

interface TipFormProps {
  initialData?: any; // For editing existing tips
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const TipForm: React.FC<TipFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        category: initialData.category || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg space-y-4 relative">
        <button
          onClick={onCancel}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">
          {initialData ? '编辑Tip' : '新增Tip'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
              标题
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
              内容
            </label>
            <textarea
              name="content"
              id="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
              分类
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Add other form fields here as needed */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              label="取消"
              color="white"
              onClick={onCancel}
            />
            <Button
              label={initialData ? '保存更改' : '创建Tip'}
              color="info"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TipForm;