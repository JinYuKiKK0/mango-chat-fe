
// =================================================================
// TypeScript 类型定义
// =================================================================

/**
 * 通用响应体结构
 * @template T - data 字段的具体类型
 */
type BaseResponse<T> = {
    code: number;
    message: string;
    data: T;
};

/**
 * 登录 (POST /auth/login) - 请求体
 */
type LoginRequest = {
    email: string;
    password?: string;
};

/**
 * 登录 (POST /auth/login) - 成功响应的 data 字段
 */
type LoginResponseData = {
    token: string;
};

/**
 * 注册 (POST /auth/register) - 请求体
 */
type RegisterRequest = {
    name: string;
    email: string;
    password: string;
    code: string;
};

/**
 * 重置密码 (POST /api/auth/reset) - 请求体
 */
type ResetPasswordRequest = {
    email: string;
    password?: string;
    code: string;
};

/**
 * 基础对话 (POST /api/chat/stream/v2) - 请求体
 */
type StreamChatRequest = {
    message: string;
    conversation_id: string; // 留空以开启新会话
};

/**
 * 限流提醒 (GET /api/chat/remain_msg) - 成功响应的 data 字段
 */
type RateLimitReminderData = {
    remainChatCount: number;
    refreshAt: string | null;
    message: string | null;
};

/**
 * 限流提醒 (GET /api/chat/remain_msg) - 完整响应体
 */
type RateLimitReminderResponse = BaseResponse<RateLimitReminderData>;


/**
 * 对话记录列表中的单个会话项
 */
type ConversationListItem = {
    id: number;
    title: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
};

/**
 * 获取对话记录列表 (GET /api/chat/list) - 成功响应的 data 字段
 */
type ConversationListData = {
    list: ConversationListItem[];
    nextCursor: number | null;
    hasMore: boolean;
};

/**
 * 获取对话记录列表 (GET /api/chat/list) - 完整响应体
 */
type ConversationListResponse = BaseResponse<ConversationListData>;

/**
 * 对话上下文消息格式
 */
type ChatMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

/**
 * 对话上下文格式 (conversation.context 字段)
 */
type ConversationContext = {
    messages: ChatMessage[];
    state: {
        topic: string;
        [key: string]: any;
    };
    variables: {
        user_name: string;
        [key: string]: any;
    };
};

/**
 * 查询会话详细信息 (GET /api/chat/info) - 成功响应的 data 字段
 */
type ConversationDetailData = {
    id: number;
    conversationId: string;
    userId: number;
    context: ConversationContext;
    createdAt: string;
    updatedAt: string;
};

/**
 * 查询有效公告列表 (GET /api/announcement/list) - 列表中的单个公告项
 */
type AnnouncementListItem = {
    id: number;
    title: string;
    effectiveTime: string;
    expirationTime: string;
    createdAt: string;
    updatedAt: string;
};

/**
 * 查询公告详细信息 (GET /api/announcement) - 成功响应的 data 字段
 */
type AnnouncementDetailData = {
    id: number;
    title: string;
    content: string;
    effectiveTime: string;
    expirationTime: string;
    createdAt: string;
    updatedAt: string;
};