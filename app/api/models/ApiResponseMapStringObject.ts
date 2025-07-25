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
 * 通用API响应
 * @export
 * @interface ApiResponseMapStringObject
 */
export interface ApiResponseMapStringObject {
    /**
     * 响应状态码
     * @type {number}
     * @memberof ApiResponseMapStringObject
     */
    code?: number;
    /**
     * 响应消息
     * @type {string}
     * @memberof ApiResponseMapStringObject
     */
    message?: string;
    /**
     * 响应数据
     * @type {{ [key: string]: string; }}
     * @memberof ApiResponseMapStringObject
     */
    data?: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof ApiResponseMapStringObject
     */
    column?: string;
}

/**
 * Check if a given object implements the ApiResponseMapStringObject interface.
 */
export function instanceOfApiResponseMapStringObject(value: object): value is ApiResponseMapStringObject {
    return true;
}

export function ApiResponseMapStringObjectFromJSON(json: any): ApiResponseMapStringObject {
    return ApiResponseMapStringObjectFromJSONTyped(json, false);
}

export function ApiResponseMapStringObjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiResponseMapStringObject {
    if (json == null) {
        return json;
    }
    return {
        
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : json['message'],
        'data': json['data'] == null ? undefined : json['data'],
        'column': json['column'] == null ? undefined : json['column'],
    };
}

export function ApiResponseMapStringObjectToJSON(json: any): ApiResponseMapStringObject {
    return ApiResponseMapStringObjectToJSONTyped(json, false);
}

export function ApiResponseMapStringObjectToJSONTyped(value?: ApiResponseMapStringObject | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'code': value['code'],
        'message': value['message'],
        'data': value['data'],
        'column': value['column'],
    };
}

