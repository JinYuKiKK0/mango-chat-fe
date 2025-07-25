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
 * 用户信息响应
 * @export
 * @interface UserInfoResponse
 */
export interface UserInfoResponse {
    /**
     * 用户ID
     * @type {number}
     * @memberof UserInfoResponse
     */
    id?: number;
    /**
     * 用户头像URL
     * @type {string}
     * @memberof UserInfoResponse
     */
    avatar?: string;
    /**
     * 用户昵称
     * @type {string}
     * @memberof UserInfoResponse
     */
    name?: string;
    /**
     * 用户邮箱
     * @type {string}
     * @memberof UserInfoResponse
     */
    email?: string;
    /**
     * 封禁状态（0-正常，1-封禁）
     * @type {number}
     * @memberof UserInfoResponse
     */
    banStatus?: UserInfoResponseBanStatusEnum;
    /**
     * 注册时间
     * @type {Date}
     * @memberof UserInfoResponse
     */
    registeredAt?: Date;
    /**
     * 更新时间
     * @type {Date}
     * @memberof UserInfoResponse
     */
    updatedAt?: Date;
}


/**
 * @export
 */
export const UserInfoResponseBanStatusEnum = {
    NUMBER_0: 0,
    NUMBER_1: 1
} as const;
export type UserInfoResponseBanStatusEnum = typeof UserInfoResponseBanStatusEnum[keyof typeof UserInfoResponseBanStatusEnum];


/**
 * Check if a given object implements the UserInfoResponse interface.
 */
export function instanceOfUserInfoResponse(value: object): value is UserInfoResponse {
    return true;
}

export function UserInfoResponseFromJSON(json: any): UserInfoResponse {
    return UserInfoResponseFromJSONTyped(json, false);
}

export function UserInfoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserInfoResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'avatar': json['avatar'] == null ? undefined : json['avatar'],
        'name': json['name'] == null ? undefined : json['name'],
        'email': json['email'] == null ? undefined : json['email'],
        'banStatus': json['banStatus'] == null ? undefined : json['banStatus'],
        'registeredAt': json['registeredAt'] == null ? undefined : (new Date(json['registeredAt'])),
        'updatedAt': json['updatedAt'] == null ? undefined : (new Date(json['updatedAt'])),
    };
}

export function UserInfoResponseToJSON(json: any): UserInfoResponse {
    return UserInfoResponseToJSONTyped(json, false);
}

export function UserInfoResponseToJSONTyped(value?: UserInfoResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'avatar': value['avatar'],
        'name': value['name'],
        'email': value['email'],
        'banStatus': value['banStatus'],
        'registeredAt': value['registeredAt'] == null ? undefined : ((value['registeredAt']).toISOString()),
        'updatedAt': value['updatedAt'] == null ? undefined : ((value['updatedAt']).toISOString()),
    };
}

