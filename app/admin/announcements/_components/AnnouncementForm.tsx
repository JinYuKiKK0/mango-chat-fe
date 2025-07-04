// app/admin/announcements/_components/AnnouncementForm.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Button from '../../../_components/Button';

interface AnnouncementFormProps {
  initialData?: any; // For editing existing announcements
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    effectiveTime: '',
    expirationTime: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        effectiveTime: initialData.effectiveTime || '',
        expirationTime: initialData.expirationTime || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value || null // Convert empty string to null for datetime fields
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert empty strings to null for datetime fields before submitting
    const submissionData = {
      ...formData,
      effectiveTime: formData.effectiveTime || null,
      expirationTime: formData.expirationTime || null,
    };
    onSubmit(submissionData);
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
          {initialData ? '编辑公告' : '新增公告'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
              标题 <span className="text-red-500">*</span>
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
              内容 <span className="text-red-500">*</span>
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
            <label htmlFor="effectiveTime" className="block text-sm font-semibold text-gray-700">
              有效时间
            </label>
            <input
              type="datetime-local"
              name="effectiveTime"
              id="effectiveTime"
              value={formData.effectiveTime}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">公告开始生效的时间（可选）</p>
          </div>
          <div>
            <label htmlFor="expirationTime" className="block text-sm font-semibold text-gray-700">
              过期时间
            </label>
            <input
              type="datetime-local"
              name="expirationTime"
              id="expirationTime"
              value={formData.expirationTime}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">公告过期失效的时间（可选）</p>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              label="取消"
              color="white"
              onClick={onCancel}
            />
            <Button
              label={initialData ? '保存更改' : '创建公告'}
              color="info"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;