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
import type { ApiChatStreamV2Post200ResponseFailureCauseStackTraceInner } from './ApiChatStreamV2Post200ResponseFailureCauseStackTraceInner';
import {
    ApiChatStreamV2Post200ResponseFailureCauseStackTraceInnerFromJSON,
    ApiChatStreamV2Post200ResponseFailureCauseStackTraceInnerFromJSONTyped,
    ApiChatStreamV2Post200ResponseFailureCauseStackTraceInnerToJSON,
    ApiChatStreamV2Post200ResponseFailureCauseStackTraceInnerToJSONTyped,
} from './ApiChatStreamV2Post200ResponseFailureCauseStackTraceInner';

/**
 * The throwable that caused this throwable to get thrown, or null if this
 * throwable was not caused by another throwable, or if the causative
 * throwable is unknown.  If this field is equal to this throwable itself,
 * it indicates that the cause of this throwable has not yet been
 * initialized.
 * @export
 * @interface ApiChatStreamV2Post200ResponseFailureCause
 */
export interface ApiChatStreamV2Post200ResponseFailureCause {
    /**
     * Specific details about the Throwable.  For example, for
     * {@code FileNotFoundException}, this contains the name of
     * the file that could not be found.
     * @type {string}
     * @memberof ApiChatStreamV2Post200ResponseFailureCause
     */
    detailMessage?: string;
    /**
     * The throwable that caused this throwable to get thrown, or null if this
     * throwable was not caused by another throwable, or if the causative
     * throwable is unknown.  If this field is equal to this throwable itself,
     * it indicates that the cause of this throwable has not yet been
     * initialized.
     * @type {object}
     * @memberof ApiChatStreamV2Post200ResponseFailureCause
     */
    cause?: object;
    /**
     * The stack trace, as returned by{@link #getStackTrace()}.
     * 
     * The field is initialized to a zero-length array.  A{@code
     *     * null} value of this field indicates subsequent calls to{@link
     *     * #setStackTrace(StackTraceElement[])} and{@link
     *     * #fillInStackTrace()} will be no-ops.
     * @type {Array<ApiChatStreamV2Post200ResponseFailureCauseStackTraceInner>}
     * @memberof ApiChatStreamV2Post200ResponseFailureCause
     */
    stackTrace?: Array<ApiChatStreamV2Post200ResponseFailureCauseStackTraceInner>;
    /**
     * The list of suppressed exceptions, as returned by{@link
     *     * #getSuppressed()}.  The list is initialized to a zero-element
     * unmodifiable sentinel list.  When a serialized Throwable is
     * read in, if the{@code suppressedExceptions} field points to a
     * zero-element list, the field is reset to the sentinel value.
     * @type {Array<object>}
     * @memberof ApiChatStreamV2Post200ResponseFailureCause
     */
    suppressedExceptions?: Array<object>;
}

/**
 * Check if a given object implements the ApiChatStreamV2Post200ResponseFailureCause interface.
 */
export function instanceOfApiChatStreamV2Post200ResponseFailureCause(value: object): value is ApiChatStreamV2Post200ResponseFailureCause {
    return true;
}

export function ApiChatStreamV2Post200ResponseFailureCauseFromJSON(json: any): ApiChatStreamV2Post200ResponseFailureCause {
    return ApiChatStreamV2Post200ResponseFailureCauseFromJSONTyped(json, false);
}

export function ApiChatStreamV2Post200ResponseFailureCauseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiChatStreamV2Post200ResponseFailureCause {
    if (json == null) {
        return json;
    }
    return {
        
        'detailMessage': json['detailMessage'] == null ? undefined : json['detailMessage'],
        'cause': json['cause'] == null ? undefined : json['cause'],
        'stackTrace': json['stackTrace'] == null ? undefined : ((json['stackTrace'] as Array<any>).map(ApiChatStreamV2Post200ResponseFailureCauseStackTraceInnerFromJSON)),
        'suppressedExceptions': json['suppressedExceptions'] == null ? undefined : json['suppressedExceptions'],
    };
}

export function ApiChatStreamV2Post200ResponseFailureCauseToJSON(json: any): ApiChatStreamV2Post200ResponseFailureCause {
    return ApiChatStreamV2Post200ResponseFailureCauseToJSONTyped(json, false);
}

export function ApiChatStreamV2Post200ResponseFailureCauseToJSONTyped(value?: ApiChatStreamV2Post200ResponseFailureCause | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'detailMessage': value['detailMessage'],
        'cause': value['cause'],
        'stackTrace': value['stackTrace'] == null ? undefined : ((value['stackTrace'] as Array<any>).map(ApiChatStreamV2Post200ResponseFailureCauseStackTraceInnerToJSON)),
        'suppressedExceptions': value['suppressedExceptions'],
    };
}

