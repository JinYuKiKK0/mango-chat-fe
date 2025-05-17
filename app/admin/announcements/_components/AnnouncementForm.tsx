// app/admin/announcements/_components/AnnouncementForm.tsx

'use client';

import React, { useState, useEffect } from 'react';

interface AnnouncementFormProps {
  initialData?: any; // For editing existing announcements
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    // Add other relevant fields here, e.g., category, tags, status
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        // ... map other fields
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
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg space-y-4 relative">
        <button
          onClick={onCancel}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">
          {initialData ? '编辑公告' : '新增公告'}
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
          {/* Add other form fields here as needed */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition duration-150 ease-in-out"
            >
              取消
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-150 ease-in-out"
            >
              {initialData ? '保存更改' : '创建公告'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;