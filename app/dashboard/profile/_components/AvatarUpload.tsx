'use client'

import { useState, useRef } from "react";
import { mdiUpload, mdiCamera } from "@mdi/js";
import Button from "../../../_components/Button";

interface AvatarUploadProps {
  isOpen: boolean;
  currentAvatar: string | null;
  onClose: () => void;
  onSave: (avatarUrl: string) => void;
}

export default function AvatarUpload({
  isOpen,
  currentAvatar,
  onClose,
  onSave
}: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    // 验证文件大小 (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不能超过2MB');
      return;
    }

    // 创建预览URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!previewUrl || previewUrl === currentAvatar) {
      alert('请先选择新的头像');
      return;
    }

    setIsUploading(true);
    
    try {
      // 这里应该调用实际的文件上传API
      // 目前使用base64作为示例，实际应用中应该上传到服务器并返回URL
      
      // 模拟上传延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 在实际应用中，这里应该是从服务器返回的图片URL
      onSave(previewUrl);
    } catch (error) {
      console.error('头像上传失败:', error);
      alert('头像上传失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setPreviewUrl(currentAvatar);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md space-y-6 relative">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl transition-colors"
          disabled={isUploading}
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6">更换头像</h2>

        {/* 头像预览 */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-gray-100">
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="头像预览" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl text-gray-400">👤</div>
              )}
            </div>
          </div>
        </div>

        {/* 文件选择 */}
        <div className="space-y-4">
          <div className="text-center">
            <Button
              icon={mdiCamera}
              label="选择图片"
              color="info"
              onClick={handleSelectFile}
              disabled={isUploading}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          <div className="text-sm text-gray-500 text-center space-y-1">
            <p>支持 JPG、PNG、GIF 格式</p>
            <p>文件大小不超过 2MB</p>
            <p>建议尺寸：400x400 像素</p>
          </div>
        </div>

        {/* 按钮组 */}
        <div className="flex justify-between space-x-3">
          <Button
            label="重置"
            color="lightDark"
            onClick={handleReset}
            disabled={isUploading}
          />
          
          <div className="flex space-x-3">
            <Button
              label="取消"
              color="lightDark"
              onClick={onClose}
              disabled={isUploading}
            />
            <Button
              icon={mdiUpload}
              label={isUploading ? "上传中..." : "保存"}
              color="success"
              onClick={handleUpload}
              disabled={isUploading || !previewUrl || previewUrl === currentAvatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 