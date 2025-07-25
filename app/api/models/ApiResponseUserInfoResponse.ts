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
import type { UserInfoResponse } from './UserInfoResponse';
import {
    UserInfoResponseFromJSON,
    UserInfoResponseFromJSONTyped,
    UserInfoResponseToJSON,
    UserInfoResponseToJSONTyped,
} from './UserInfoResponse';

/**
 * 通用API响应
 * @export
 * @interface ApiResponseUserInfoResponse
 */
export interface ApiResponseUserInfoResponse {
    /**
     * 响应状态码
     * @type {number}
     * @memberof ApiResponseUserInfoResponse
     */
    code?: number;
    /**
     * 响应消息
     * @type {string}
     * @memberof ApiResponseUserInfoResponse
     */
    message?: string;
    /**
     * 
     * @type {UserInfoResponse}
     * @memberof ApiResponseUserInfoResponse
     */
    data?: UserInfoResponse;
    /**
     * 
     * @type {string}
     * @memberof ApiResponseUserInfoResponse
     */
    column?: string;
}

/**
 * Check if a given object implements the ApiResponseUserInfoResponse interface.
 */
export function instanceOfApiResponseUserInfoResponse(value: object): value is ApiResponseUserInfoResponse {
    return true;
}

export function ApiResponseUserInfoResponseFromJSON(json: any): ApiResponseUserInfoResponse {
    return ApiResponseUserInfoResponseFromJSONTyped(json, false);
}

export function ApiResponseUserInfoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiResponseUserInfoResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : json['message'],
        'data': json['data'] == null ? undefined : UserInfoResponseFromJSON(json['data']),
        'column': json['column'] == null ? undefined : json['column'],
    };
}

export function ApiResponseUserInfoResponseToJSON(json: any): ApiResponseUserInfoResponse {
    return ApiResponseUserInfoResponseToJSONTyped(json, false);
}

export function ApiResponseUserInfoResponseToJSONTyped(value?: ApiResponseUserInfoResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'code': value['code'],
        'message': value['message'],
        'data': UserInfoResponseToJSON(value['data']),
        'column': value['column'],
    };
}

