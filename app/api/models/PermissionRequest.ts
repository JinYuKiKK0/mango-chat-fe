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
 * 权限信息
 * @export
 * @interface PermissionRequest
 */
export interface PermissionRequest {
    /**
     * 限制次数
     * @type {number}
     * @memberof PermissionRequest
     */
    limitCount: number;
    /**
     * 时间窗口单位
     * @type {string}
     * @memberof PermissionRequest
     */
    timeWindowUnit: PermissionRequestTimeWindowUnitEnum;
    /**
     * 时间窗口数值
     * @type {number}
     * @memberof PermissionRequest
     */
    timeWindow: number;
}


/**
 * @export
 */
export const PermissionRequestTimeWindowUnitEnum = {
    Minute: 'minute',
    Hour: 'hour',
    Day: 'day'
} as const;
export type PermissionRequestTimeWindowUnitEnum = typeof PermissionRequestTimeWindowUnitEnum[keyof typeof PermissionRequestTimeWindowUnitEnum];


/**
 * Check if a given object implements the PermissionRequest interface.
 */
export function instanceOfPermissionRequest(value: object): value is PermissionRequest {
    if (!('limitCount' in value) || value['limitCount'] === undefined) return false;
    if (!('timeWindowUnit' in value) || value['timeWindowUnit'] === undefined) return false;
    if (!('timeWindow' in value) || value['timeWindow'] === undefined) return false;
    return true;
}

export function PermissionRequestFromJSON(json: any): PermissionRequest {
    return PermissionRequestFromJSONTyped(json, false);
}

export function PermissionRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PermissionRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'limitCount': json['limitCount'],
        'timeWindowUnit': json['timeWindowUnit'],
        'timeWindow': json['timeWindow'],
    };
}

export function PermissionRequestToJSON(json: any): PermissionRequest {
    return PermissionRequestToJSONTyped(json, false);
}

export function PermissionRequestToJSONTyped(value?: PermissionRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'limitCount': value['limitCount'],
        'timeWindowUnit': value['timeWindowUnit'],
        'timeWindow': value['timeWindow'],
    };
}

