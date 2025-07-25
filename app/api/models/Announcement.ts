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
 * 公告实体
 * @export
 * @interface Announcement
 */
export interface Announcement {
    /**
     * 公告ID
     * @type {number}
     * @memberof Announcement
     */
    id?: number;
    /**
     * 公告标题
     * @type {string}
     * @memberof Announcement
     */
    title?: string;
    /**
     * 公告内容
     * @type {string}
     * @memberof Announcement
     */
    content?: string;
    /**
     * 生效时间
     * @type {Date}
     * @memberof Announcement
     */
    effectiveTime?: Date;
    /**
     * 过期时间
     * @type {Date}
     * @memberof Announcement
     */
    expirationTime?: Date;
    /**
     * 创建时间
     * @type {Date}
     * @memberof Announcement
     */
    createdAt?: Date;
    /**
     * 更新时间
     * @type {Date}
     * @memberof Announcement
     */
    updatedAt?: Date;
}

/**
 * Check if a given object implements the Announcement interface.
 */
export function instanceOfAnnouncement(value: object): value is Announcement {
    return true;
}

export function AnnouncementFromJSON(json: any): Announcement {
    return AnnouncementFromJSONTyped(json, false);
}

export function AnnouncementFromJSONTyped(json: any, ignoreDiscriminator: boolean): Announcement {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'title': json['title'] == null ? undefined : json['title'],
        'content': json['content'] == null ? undefined : json['content'],
        'effectiveTime': json['effectiveTime'] == null ? undefined : (new Date(json['effectiveTime'])),
        'expirationTime': json['expirationTime'] == null ? undefined : (new Date(json['expirationTime'])),
        'createdAt': json['createdAt'] == null ? undefined : (new Date(json['createdAt'])),
        'updatedAt': json['updatedAt'] == null ? undefined : (new Date(json['updatedAt'])),
    };
}

export function AnnouncementToJSON(json: any): Announcement {
    return AnnouncementToJSONTyped(json, false);
}

export function AnnouncementToJSONTyped(value?: Announcement | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'content': value['content'],
        'effectiveTime': value['effectiveTime'] == null ? undefined : ((value['effectiveTime']).toISOString()),
        'expirationTime': value['expirationTime'] == null ? undefined : ((value['expirationTime']).toISOString()),
        'createdAt': value['createdAt'] == null ? undefined : ((value['createdAt']).toISOString()),
        'updatedAt': value['updatedAt'] == null ? undefined : ((value['updatedAt']).toISOString()),
    };
}

