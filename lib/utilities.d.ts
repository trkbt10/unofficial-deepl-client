import { RequestInit } from "node-fetch";
export declare type AuthParams = {
    authKey: string;
    uri?: string;
};
export declare const camelizeObjectKeyName: <T extends {}>(object: T) => T;
export declare const deepLRequestParamStringify: <T extends {}>(obj: T) => string;
export declare const request: (uri: string, options?: RequestInit | undefined) => Promise<any>;
