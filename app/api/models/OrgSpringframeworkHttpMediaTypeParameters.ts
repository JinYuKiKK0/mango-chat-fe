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
 * 
 * @export
 * @interface OrgSpringframeworkHttpMediaTypeParameters
 */
export interface OrgSpringframeworkHttpMediaTypeParameters {
    /**
     * 
     * @type {string}
     * @memberof OrgSpringframeworkHttpMediaTypeParameters
     */
    key?: string;
}

/**
 * Check if a given object implements the OrgSpringframeworkHttpMediaTypeParameters interface.
 */
export function instanceOfOrgSpringframeworkHttpMediaTypeParameters(value: object): value is OrgSpringframeworkHttpMediaTypeParameters {
    return true;
}

export function OrgSpringframeworkHttpMediaTypeParametersFromJSON(json: any): OrgSpringframeworkHttpMediaTypeParameters {
    return OrgSpringframeworkHttpMediaTypeParametersFromJSONTyped(json, false);
}

export function OrgSpringframeworkHttpMediaTypeParametersFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrgSpringframeworkHttpMediaTypeParameters {
    if (json == null) {
        return json;
    }
    return {
        
        'key': json['key'] == null ? undefined : json['key'],
    };
}

export function OrgSpringframeworkHttpMediaTypeParametersToJSON(json: any): OrgSpringframeworkHttpMediaTypeParameters {
    return OrgSpringframeworkHttpMediaTypeParametersToJSONTyped(json, false);
}

export function OrgSpringframeworkHttpMediaTypeParametersToJSONTyped(value?: OrgSpringframeworkHttpMediaTypeParameters | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'key': value['key'],
    };
}

