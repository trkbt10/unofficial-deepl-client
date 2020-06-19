import { AuthParams } from "../utilities";
export declare type GetSupportedLanguagesResponse = {
    language: string;
    name: string;
}[];
export declare function getSupportedLanguages(authParams: AuthParams): Promise<GetSupportedLanguagesResponse>;
