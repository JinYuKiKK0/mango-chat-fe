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
import type { GroupResponse } from './GroupResponse';
import {
    GroupResponseFromJSON,
    GroupResponseFromJSONTyped,
    GroupResponseToJSON,
    GroupResponseToJSONTyped,
} from './GroupResponse';

/**
 * 分页响应
 * @export
 * @interface PageResponseGroupResponse
 */
export interface PageResponseGroupResponse {
    /**
     * 分页数据列表
     * @type {Array<GroupResponse>}
     * @memberof PageResponseGroupResponse
     */
    content?: Array<GroupResponse>;
    /**
     * 当前页码（从0开始）
     * @type {number}
     * @memberof PageResponseGroupResponse
     */
    page?: number;
    /**
     * 每页数量
     * @type {number}
     * @memberof PageResponseGroupResponse
     */
    pageSize?: number;
    /**
     * 总记录数
     * @type {number}
     * @memberof PageResponseGroupResponse
     */
    totalElements?: number;
    /**
     * 总页数
     * @type {number}
     * @memberof PageResponseGroupResponse
     */
    totalPages?: number;
}

/**
 * Check if a given object implements the PageResponseGroupResponse interface.
 */
export function instanceOfPageResponseGroupResponse(value: object): value is PageResponseGroupResponse {
    return true;
}

export function PageResponseGroupResponseFromJSON(json: any): PageResponseGroupResponse {
    return PageResponseGroupResponseFromJSONTyped(json, false);
}

export function PageResponseGroupResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageResponseGroupResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'content': json['content'] == null ? undefined : ((json['content'] as Array<any>).map(GroupResponseFromJSON)),
        'page': json['page'] == null ? undefined : json['page'],
        'pageSize': json['pageSize'] == null ? undefined : json['pageSize'],
        'totalElements': json['totalElements'] == null ? undefined : json['totalElements'],
        'totalPages': json['totalPages'] == null ? undefined : json['totalPages'],
    };
}

export function PageResponseGroupResponseToJSON(json: any): PageResponseGroupResponse {
    return PageResponseGroupResponseToJSONTyped(json, false);
}

export function PageResponseGroupResponseToJSONTyped(value?: PageResponseGroupResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'content': value['content'] == null ? undefined : ((value['content'] as Array<any>).map(GroupResponseToJSON)),
        'page': value['page'],
        'pageSize': value['pageSize'],
        'totalElements': value['totalElements'],
        'totalPages': value['totalPages'],
    };
}

