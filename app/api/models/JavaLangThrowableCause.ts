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
import type { JavaLangThrowableCauseStackTraceInner } from './JavaLangThrowableCauseStackTraceInner';
import {
    JavaLangThrowableCauseStackTraceInnerFromJSON,
    JavaLangThrowableCauseStackTraceInnerFromJSONTyped,
    JavaLangThrowableCauseStackTraceInnerToJSON,
    JavaLangThrowableCauseStackTraceInnerToJSONTyped,
} from './JavaLangThrowableCauseStackTraceInner';

/**
 * The throwable that caused this throwable to get thrown, or null if this
 * throwable was not caused by another throwable, or if the causative
 * throwable is unknown.  If this field is equal to this throwable itself,
 * it indicates that the cause of this throwable has not yet been
 * initialized.
 * @export
 * @interface JavaLangThrowableCause
 */
export interface JavaLangThrowableCause {
    /**
     * Specific details about the Throwable.  For example, for
     * {@code FileNotFoundException}, this contains the name of
     * the file that could not be found.
     * @type {string}
     * @memberof JavaLangThrowableCause
     */
    detailMessage?: string;
    /**
     * The throwable that caused this throwable to get thrown, or null if this
     * throwable was not caused by another throwable, or if the causative
     * throwable is unknown.  If this field is equal to this throwable itself,
     * it indicates that the cause of this throwable has not yet been
     * initialized.
     * @type {object}
     * @memberof JavaLangThrowableCause
     */
    cause?: object;
    /**
     * The stack trace, as returned by{@link #getStackTrace()}.
     * 
     * The field is initialized to a zero-length array.  A{@code
     *     * null} value of this field indicates subsequent calls to{@link
     *     * #setStackTrace(StackTraceElement[])} and{@link
     *     * #fillInStackTrace()} will be no-ops.
     * @type {Array<JavaLangThrowableCauseStackTraceInner>}
     * @memberof JavaLangThrowableCause
     */
    stackTrace?: Array<JavaLangThrowableCauseStackTraceInner>;
    /**
     * The list of suppressed exceptions, as returned by{@link
     *     * #getSuppressed()}.  The list is initialized to a zero-element
     * unmodifiable sentinel list.  When a serialized Throwable is
     * read in, if the{@code suppressedExceptions} field points to a
     * zero-element list, the field is reset to the sentinel value.
     * @type {Array<object>}
     * @memberof JavaLangThrowableCause
     */
    suppressedExceptions?: Array<object>;
}

/**
 * Check if a given object implements the JavaLangThrowableCause interface.
 */
export function instanceOfJavaLangThrowableCause(value: object): value is JavaLangThrowableCause {
    return true;
}

export function JavaLangThrowableCauseFromJSON(json: any): JavaLangThrowableCause {
    return JavaLangThrowableCauseFromJSONTyped(json, false);
}

export function JavaLangThrowableCauseFromJSONTyped(json: any, ignoreDiscriminator: boolean): JavaLangThrowableCause {
    if (json == null) {
        return json;
    }
    return {
        
        'detailMessage': json['detailMessage'] == null ? undefined : json['detailMessage'],
        'cause': json['cause'] == null ? undefined : json['cause'],
        'stackTrace': json['stackTrace'] == null ? undefined : ((json['stackTrace'] as Array<any>).map(JavaLangThrowableCauseStackTraceInnerFromJSON)),
        'suppressedExceptions': json['suppressedExceptions'] == null ? undefined : json['suppressedExceptions'],
    };
}

export function JavaLangThrowableCauseToJSON(json: any): JavaLangThrowableCause {
    return JavaLangThrowableCauseToJSONTyped(json, false);
}

export function JavaLangThrowableCauseToJSONTyped(value?: JavaLangThrowableCause | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'detailMessage': value['detailMessage'],
        'cause': value['cause'],
        'stackTrace': value['stackTrace'] == null ? undefined : ((value['stackTrace'] as Array<any>).map(JavaLangThrowableCauseStackTraceInnerToJSON)),
        'suppressedExceptions': value['suppressedExceptions'],
    };
}

