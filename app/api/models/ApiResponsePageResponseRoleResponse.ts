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
import type { PageResponseRoleResponse } from './PageResponseRoleResponse';
import {
    PageResponseRoleResponseFromJSON,
    PageResponseRoleResponseFromJSONTyped,
    PageResponseRoleResponseToJSON,
    PageResponseRoleResponseToJSONTyped,
} from './PageResponseRoleResponse';

/**
 * 通用API响应
 * @export
 * @interface ApiResponsePageResponseRoleResponse
 */
export interface ApiResponsePageResponseRoleResponse {
    /**
     * 响应状态码
     * @type {number}
     * @memberof ApiResponsePageResponseRoleResponse
     */
    code?: number;
    /**
     * 响应消息
     * @type {string}
     * @memberof ApiResponsePageResponseRoleResponse
     */
    message?: string;
    /**
     * 
     * @type {PageResponseRoleResponse}
     * @memberof ApiResponsePageResponseRoleResponse
     */
    data?: PageResponseRoleResponse;
    /**
     * 
     * @type {string}
     * @memberof ApiResponsePageResponseRoleResponse
     */
    column?: string;
}

/**
 * Check if a given object implements the ApiResponsePageResponseRoleResponse interface.
 */
export function instanceOfApiResponsePageResponseRoleResponse(value: object): value is ApiResponsePageResponseRoleResponse {
    return true;
}

export function ApiResponsePageResponseRoleResponseFromJSON(json: any): ApiResponsePageResponseRoleResponse {
    return ApiResponsePageResponseRoleResponseFromJSONTyped(json, false);
}

export function ApiResponsePageResponseRoleResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiResponsePageResponseRoleResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : json['message'],
        'data': json['data'] == null ? undefined : PageResponseRoleResponseFromJSON(json['data']),
        'column': json['column'] == null ? undefined : json['column'],
    };
}

export function ApiResponsePageResponseRoleResponseToJSON(json: any): ApiResponsePageResponseRoleResponse {
    return ApiResponsePageResponseRoleResponseToJSONTyped(json, false);
}

export function ApiResponsePageResponseRoleResponseToJSONTyped(value?: ApiResponsePageResponseRoleResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'code': value['code'],
        'message': value['message'],
        'data': PageResponseRoleResponseToJSON(value['data']),
        'column': value['column'],
    };
}

