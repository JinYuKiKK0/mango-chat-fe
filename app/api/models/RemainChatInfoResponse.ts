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

import { mapValues } from '../runtime';
/**
 * 剩余聊天信息响应
 * @export
 * @interface RemainChatInfoResponse
 */
export interface RemainChatInfoResponse {
    /**
     * 剩余的消息数量
     * @type {number}
     * @memberof RemainChatInfoResponse
     */
    remainChatCount?: number;
    /**
     * 下一次限流刷新时间
     * @type {Date}
     * @memberof RemainChatInfoResponse
     */
    refreshAt?: Date;
    /**
     * 提示信息
     * @type {string}
     * @memberof RemainChatInfoResponse
     */
    message?: string;
}

/**
 * Check if a given object implements the RemainChatInfoResponse interface.
 */
export function instanceOfRemainChatInfoResponse(value: object): value is RemainChatInfoResponse {
    return true;
}

export function RemainChatInfoResponseFromJSON(json: any): RemainChatInfoResponse {
    return RemainChatInfoResponseFromJSONTyped(json, false);
}

export function RemainChatInfoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RemainChatInfoResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'remainChatCount': json['remainChatCount'] == null ? undefined : json['remainChatCount'],
        'refreshAt': json['refreshAt'] == null ? undefined : (new Date(json['refreshAt'])),
        'message': json['message'] == null ? undefined : json['message'],
    };
}

export function RemainChatInfoResponseToJSON(json: any): RemainChatInfoResponse {
    return RemainChatInfoResponseToJSONTyped(json, false);
}

export function RemainChatInfoResponseToJSONTyped(value?: RemainChatInfoResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'remainChatCount': value['remainChatCount'],
        'refreshAt': value['refreshAt'] == null ? undefined : ((value['refreshAt']).toISOString()),
        'message': value['message'],
    };
}

