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
 * @interface StackTraceElement
 */
export interface StackTraceElement {
    /**
     * The name of the class loader.
     * @type {string}
     * @memberof StackTraceElement
     */
    classLoaderName?: string;
    /**
     * The module name.
     * @type {string}
     * @memberof StackTraceElement
     */
    moduleName?: string;
    /**
     * The module version.
     * @type {string}
     * @memberof StackTraceElement
     */
    moduleVersion?: string;
    /**
     * The declaring class.
     * @type {string}
     * @memberof StackTraceElement
     */
    declaringClass?: string;
    /**
     * The method name.
     * @type {string}
     * @memberof StackTraceElement
     */
    methodName?: string;
    /**
     * The source file name.
     * @type {string}
     * @memberof StackTraceElement
     */
    fileName?: string;
    /**
     * The source line number.
     * @type {number}
     * @memberof StackTraceElement
     */
    lineNumber?: number;
    /**
     * Control to show full or partial module, package, and class names.
     * @type {number}
     * @memberof StackTraceElement
     */
    format?: number;
}

/**
 * Check if a given object implements the StackTraceElement interface.
 */
export function instanceOfStackTraceElement(value: object): value is StackTraceElement {
    return true;
}

export function StackTraceElementFromJSON(json: any): StackTraceElement {
    return StackTraceElementFromJSONTyped(json, false);
}

export function StackTraceElementFromJSONTyped(json: any, ignoreDiscriminator: boolean): StackTraceElement {
    if (json == null) {
        return json;
    }
    return {
        
        'classLoaderName': json['classLoaderName'] == null ? undefined : json['classLoaderName'],
        'moduleName': json['moduleName'] == null ? undefined : json['moduleName'],
        'moduleVersion': json['moduleVersion'] == null ? undefined : json['moduleVersion'],
        'declaringClass': json['declaringClass'] == null ? undefined : json['declaringClass'],
        'methodName': json['methodName'] == null ? undefined : json['methodName'],
        'fileName': json['fileName'] == null ? undefined : json['fileName'],
        'lineNumber': json['lineNumber'] == null ? undefined : json['lineNumber'],
        'format': json['format'] == null ? undefined : json['format'],
    };
}

export function StackTraceElementToJSON(json: any): StackTraceElement {
    return StackTraceElementToJSONTyped(json, false);
}

export function StackTraceElementToJSONTyped(value?: StackTraceElement | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'classLoaderName': value['classLoaderName'],
        'moduleName': value['moduleName'],
        'moduleVersion': value['moduleVersion'],
        'declaringClass': value['declaringClass'],
        'methodName': value['methodName'],
        'fileName': value['fileName'],
        'lineNumber': value['lineNumber'],
        'format': value['format'],
    };
}

