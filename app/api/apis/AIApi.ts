/* tslint:disable */
/* eslint-disable */
/**
 * mangochat
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  AiChatRequest,
  ApiResponseConversation,
  ApiResponseObject,
  ApiResponsePageResponseWithCursorConversationResponse,
  ApiResponseRemainChatInfoResponse,
  SseEmitter,
} from '../models/index';
import {
    AiChatRequestFromJSON,
    AiChatRequestToJSON,
    ApiResponseConversationFromJSON,
    ApiResponseConversationToJSON,
    ApiResponseObjectFromJSON,
    ApiResponseObjectToJSON,
    ApiResponsePageResponseWithCursorConversationResponseFromJSON,
    ApiResponsePageResponseWithCursorConversationResponseToJSON,
    ApiResponseRemainChatInfoResponseFromJSON,
    ApiResponseRemainChatInfoResponseToJSON,
    SseEmitterFromJSON,
    SseEmitterToJSON,
} from '../models/index';

export interface GetConversationInfoRequest {
    userId: number;
    sessionId: number;
    authorization?: string;
}

export interface GetConversationInfo0Request {
    userId: number;
    sessionId: number;
    authorization?: string;
}

export interface GetConversationListRequest {
    userId: number;
    lastSessionId?: number;
    pageSize?: number;
    authorization?: string;
}

export interface GetConversationList0Request {
    userId: number;
    lastSessionId?: number;
    pageSize?: number;
    authorization?: string;
}

export interface GetRemainChatInfoRequest {
    userId: number;
    authorization?: string;
}

export interface GetRemainChatInfo0Request {
    userId: number;
    authorization?: string;
}

export interface SendMessageBeautifiedRequest {
    authorization?: string;
    aiChatRequest?: AiChatRequest;
}

export interface SendMessageBeautified0Request {
    authorization?: string;
    aiChatRequest?: AiChatRequest;
}

export interface TestRequest {
    authorization?: string;
}

export interface Test0Request {
    authorization?: string;
}

/**
 * 
 */
export class AIApi extends runtime.BaseAPI {

    /**
     * 根据用户ID和会话ID查询对话的详细信息
     * 查询对话详情
     */
    async getConversationInfoRaw(requestParameters: GetConversationInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiResponseConversation>> {
        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling getConversationInfo().'
            );
        }

        if (requestParameters['sessionId'] == null) {
            throw new runtime.RequiredError(
                'sessionId',
                'Required parameter "sessionId" was null or undefined when calling getConversationInfo().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['userId'] != null) {
            queryParameters['user_id'] = requestParameters['userId'];
        }

        if (requestParameters['sessionId'] != null) {
            queryParameters['session_id'] = requestParameters['sessionId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api/chat/info`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiResponseConversationFromJSON(jsonValue));
    }

    /**
     * 根据用户ID和会话ID查询对话的详细信息
     * 查询对话详情
     */
    async getConversationInfo(requestParameters: GetConversationInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiResponseConversation> {
        const response = await this.getConversationInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 根据用户ID和会话ID查询对话的详细信息
     * 查询对话详情
     */
    async getConversationInfo_1Raw(requestParameters: GetConversationInfo0Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiResponseConversation>> {
        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling getConversationInfo_1().'
            );
        }

        if (requestParameters['sessionId'] == null) {
            throw new runtime.RequiredError(
                'sessionId',
                'Required parameter "sessionId" was null or undefined when calling getConversationInfo_1().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['userId'] != null) {
            queryParameters['user_id'] = requestParameters['userId'];
        }

        if (requestParameters['sessionId'] != null) {
            queryParameters['session_id'] = requestParameters['sessionId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api/chat/info`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiResponseConversationFromJSON(jsonValue));
    }

    /**
     * 根据用户ID和会话ID查询对话的详细信息
     * 查询对话详情
     */
    async getConversationInfo_1(requestParameters: GetConversationInfo0Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiResponseConversation> {
        const response = await this.getConversationInfo_1Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 使用游标分页查询用户的对话记录列表
     * 查询对话列表
     */
    async getConversationListRaw(requestParameters: GetConversationListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiResponsePageResponseWithCursorConversationResponse>> {
        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling getConversationList().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['userId'] != null) {
            queryParameters['user_id'] = requestParameters['userId'];
        }

        if (requestParameters['lastSessionId'] != null) {
            queryParameters['lastSessionId'] = requestParameters['lastSessionId'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['pageSize'] = requestParameters['pageSize'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api/chat/list`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiResponsePageResponseWithCursorConversationResponseFromJSON(jsonValue));
    }

    /**
     * 使用游标分页查询用户的对话记录列表
     * 查询对话列表
     */
    async getConversationList(requestParameters: GetConversationListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiResponsePageResponseWithCursorConversationResponse> {
        const response = await this.getConversationListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 使用游标分页查询用户的对话记录列表
     * 查询对话列表
     */
    async getConversationList_2Raw(requestParameters: GetConversationList0Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiResponsePageResponseWithCursorConversationResponse>> {
        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling getConversationList_2().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['userId'] != null) {
            queryParameters['user_id'] = requestParameters['userId'];
        }

        if (requestParameters['lastSessionId'] != null) {
            queryParameters['lastSessionId'] = requestParameters['lastSessionId'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['pageSize'] = requestParameters['pageSize'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api/chat/list`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiResponsePageResponseWithCursorConversationResponseFromJSON(jsonValue));
    }

    /**
     * 使用游标分页查询用户的对话记录列表
     * 查询对话列表
     */
    async getConversationList_2(requestParameters: GetConversationList0Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiResponsePageResponseWithCursorConversationResponse> {
        const response = await this.getConversationList_2Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 查询用户剩余的AI对话次数
     * 查询剩余对话次数
     */
    async getRemainChatInfoRaw(requestParameters: GetRemainChatInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiResponseRemainChatInfoResponse>> {
        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling getRemainChatInfo().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['userId'] != null) {
            queryParameters['user_id'] = requestParameters['userId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api/chat/remain_msg`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiResponseRemainChatInfoResponseFromJSON(jsonValue));
    }

    /**
     * 查询用户剩余的AI对话次数
     * 查询剩余对话次数
     */
    async getRemainChatInfo(requestParameters: GetRemainChatInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiResponseRemainChatInfoResponse> {
        const response = await this.getRemainChatInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 查询用户剩余的AI对话次数
     * 查询剩余对话次数
     */
    async getRemainChatInfo_3Raw(requestParameters: GetRemainChatInfo0Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiResponseRemainChatInfoResponse>> {
        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling getRemainChatInfo_3().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['userId'] != null) {
            queryParameters['user_id'] = requestParameters['userId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api/chat/remain_msg`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiResponseRemainChatInfoResponseFromJSON(jsonValue));
    }

    /**
     * 查询用户剩余的AI对话次数
     * 查询剩余对话次数
     */
    async getRemainChatInfo_3(requestParameters: GetRemainChatInfo0Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiResponseRemainChatInfoResponse> {
        const response = await this.getRemainChatInfo_3Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 发送消息并接收美化后的AI流式响应
     * 美化流式对话
     */
    async sendMessageBeautifiedRaw(requestParameters: SendMessageBeautifiedRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SseEmitter>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api/chat/stream/v2`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AiChatRequestToJSON(requestParameters['aiChatRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SseEmitterFromJSON(jsonValue));
    }

    /**
     * 发送消息并接收美化后的AI流式响应
     * 美化流式对话
     */
    async sendMessageBeautified(requestParameters: SendMessageBeautifiedRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SseEmitter> {
        const response = await this.sendMessageBeautifiedRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 发送消息并接收美化后的AI流式响应
     * 美化流式对话
     */
    async sendMessageBeautified_4Raw(requestParameters: SendMessageBeautified0Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SseEmitter>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api/chat/stream/v2`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AiChatRequestToJSON(requestParameters['aiChatRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SseEmitterFromJSON(jsonValue));
    }

    /**
     * 发送消息并接收美化后的AI流式响应
     * 美化流式对话
     */
    async sendMessageBeautified_4(requestParameters: SendMessageBeautified0Request = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SseEmitter> {
        const response = await this.sendMessageBeautified_4Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     * 限流测试接口
     */
    async testRaw(requestParameters: TestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiResponseObject>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api/chat/test`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiResponseObjectFromJSON(jsonValue));
    }

    /**
     * 
     * 限流测试接口
     */
    async test(requestParameters: TestRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiResponseObject> {
        const response = await this.testRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     * 限流测试接口
     */
    async test_5Raw(requestParameters: Test0Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ApiResponseObject>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api/chat/test`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ApiResponseObjectFromJSON(jsonValue));
    }

    /**
     * 
     * 限流测试接口
     */
    async test_5(requestParameters: Test0Request = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ApiResponseObject> {
        const response = await this.test_5Raw(requestParameters, initOverrides);
        return await response.value();
    }

}
