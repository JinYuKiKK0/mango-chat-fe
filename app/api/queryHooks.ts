/**
 * @fileoverview 为小芒聊天应用的API客户端提供React Query钩子。
 * @version 1.0.0
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    login,
    register,
    resetPassword,
    startStreamChat,
    getRateLimitReminder,
    getConversationList,
    getConversationDetails,
    getPublicAnnouncementList,
    getPublicAnnouncementDetails
} from './api'; // 假设API客户端文件在同级目录

// =================================================================
// React Query Hooks
// =================================================================

// --- 登录/鉴权 模块 ---

/**
 * 登录的 mutation hook
 */
export function useLoginMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            // 登录成功后，可以保存 token 并让相关查询失效
            // 例如，失效用户信息的查询
            if (data.data.token) {
                localStorage.setItem('jwt_token', data.data.token);
            }
            queryClient.invalidateQueries({ queryKey: ['userProfile'] }); // 假设有这样一个查询
        },
    });
}

/**
 * 注册的 mutation hook
 */
export function useRegisterMutation() {
    return useMutation({
        mutationFn: register,
    });
}

/**
 * 重置密码的 mutation hook
 */
export function useResetPasswordMutation() {
    return useMutation({
        mutationFn: resetPassword,
    });
}


// --- ai-chat 模块 ---

/**
 * 开始流式对话的 mutation hook
 * 注意：React Query 主要用于管理请求状态，流式数据的处理需要在 onSuccess 回调中自行实现。
 */
export function useStreamChatMutation() {
    return useMutation({
        mutationFn: startStreamChat,
        // 调用者需要在 onSuccess 中处理返回的 Response 对象以读取 SSE 流
    });
}

/**
 * 获取限流提醒信息的 query hook
 * @param {string} userId - 用户的 ID
 */
export function useRateLimitReminderQuery(userId: string) {
    return useQuery({
        queryKey: ['rateLimitReminder', userId],
        queryFn: () => getRateLimitReminder(userId),
        enabled: !!userId, // 只有在 userId 存在时才执行查询
    });
}

/**
 * 获取对话记录列表的 query hook
 * @param {string} userId - 用户的 ID
 * @param {number} [lastSessionId] - 分页游标
 * @param {number} [pageSize=10] - 每页大小
 */
export function useConversationListQuery(userId: string, lastSessionId?: number, pageSize: number = 10) {
    return useQuery({
        queryKey: ['conversationList', userId, lastSessionId, pageSize],
        queryFn: () => getConversationList(userId, lastSessionId, pageSize),
        enabled: !!userId,
        staleTime: 1000 * 60, // 1分钟内数据被认为是新鲜的
    });
}

/**
 * 获取会话详细信息的 query hook
 * @param {string} userId - 用户的 ID
 * @param {number} sessionId - 会话的 ID
 */
export function useConversationDetailsQuery(userId: string, sessionId: number) {
    return useQuery({
        queryKey: ['conversationDetails', userId, sessionId],
        queryFn: () => getConversationDetails(userId, sessionId),
        enabled: !!userId && !!sessionId,
    });
}

// --- 公告查询模块 ---

/**
 * 获取公开公告列表的 query hook
 */
export function usePublicAnnouncementListQuery() {
    return useQuery({
        queryKey: ['publicAnnouncements'],
        queryFn: getPublicAnnouncementList,
    });
}

/**
 * 获取单个公告详情的 query hook
 * @param {number} announcementId - 公告的 ID
 */
export function usePublicAnnouncementDetailsQuery(announcementId: number) {
    return useQuery({
        queryKey: ['publicAnnouncementDetails', announcementId],
        queryFn: () => getPublicAnnouncementDetails(announcementId),
        enabled: !!announcementId,
    });
}
