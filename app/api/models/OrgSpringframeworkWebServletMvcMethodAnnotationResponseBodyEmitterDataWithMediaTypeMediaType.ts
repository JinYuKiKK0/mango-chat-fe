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
import type { OrgSpringframeworkHttpMediaTypeParameters } from './OrgSpringframeworkHttpMediaTypeParameters';
import {
    OrgSpringframeworkHttpMediaTypeParametersFromJSON,
    OrgSpringframeworkHttpMediaTypeParametersFromJSONTyped,
    OrgSpringframeworkHttpMediaTypeParametersToJSON,
    OrgSpringframeworkHttpMediaTypeParametersToJSONTyped,
} from './OrgSpringframeworkHttpMediaTypeParameters';

/**
 * 
 * @export
 * @interface OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType
 */
export interface OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType {
    /**
     * 
     * @type {string}
     * @memberof OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType
     */
    subtype?: string;
    /**
     * 
     * @type {OrgSpringframeworkHttpMediaTypeParameters}
     * @memberof OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType
     */
    parameters?: OrgSpringframeworkHttpMediaTypeParameters;
    /**
     * 
     * @type {string}
     * @memberof OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType
     */
    toStringValue?: string | null;
}

/**
 * Check if a given object implements the OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType interface.
 */
export function instanceOfOrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType(value: object): value is OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType {
    return true;
}

export function OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaTypeFromJSON(json: any): OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType {
    return OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaTypeFromJSONTyped(json, false);
}

export function OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType {
    if (json == null) {
        return json;
    }
    return {
        
        'type': json['type'] == null ? undefined : json['type'],
        'subtype': json['subtype'] == null ? undefined : json['subtype'],
        'parameters': json['parameters'] == null ? undefined : OrgSpringframeworkHttpMediaTypeParametersFromJSON(json['parameters']),
        'toStringValue': json['toStringValue'] == null ? undefined : json['toStringValue'],
    };
}

export function OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaTypeToJSON(json: any): OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType {
    return OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaTypeToJSONTyped(json, false);
}

export function OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaTypeToJSONTyped(value?: OrgSpringframeworkWebServletMvcMethodAnnotationResponseBodyEmitterDataWithMediaTypeMediaType | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'type': value['type'],
        'subtype': value['subtype'],
        'parameters': OrgSpringframeworkHttpMediaTypeParametersToJSON(value['parameters']),
        'toStringValue': value['toStringValue'],
    };
}

