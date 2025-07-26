/* tslint:disable */
/* eslint-disable */
import {AIApi} from "./AIApi";
import {APIApi} from "./APIApi";
import {TipsApi} from "./TipsApi";
import {DefaultApi} from "./DefaultApi";
import {ApiKeyApi} from "./ApiKeyApi";

export * from './DefaultApi';
export * from './AIApi';
export * from './APIApi';
export * from './TipsApi';

export const aiApi = new AIApi();
export const adminApi = new APIApi();
export const tipsApi = new TipsApi();
export const defaultApi = new DefaultApi();
export const apiKeyApi = new ApiKeyApi()

