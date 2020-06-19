/// <reference types="node" />
import { AuthParams } from "../utilities";
import { DeepL } from "../deepl";
export declare type DocumentInfo = {
    documentId: string;
    documentKey: string;
};
export declare type UploadDocumentParameters = {
    sourceLang?: DeepL.SourceLanguage;
    targetLang: DeepL.TargetLanguage;
    file: Buffer;
    filename?: string;
};
export declare type UploadDocumentResponse = DocumentInfo;
export declare function uploadDocument(params: UploadDocumentParameters, authParams: AuthParams): Promise<UploadDocumentResponse>;
export declare type CheckingTranslationStatusParams = DocumentInfo;
export declare type CheckingTranslationStatusReturnValue = {
    documentId: string;
    status: "queued" | "translating" | "done" | "error" | string;
    secondsRemaining?: number;
    billedCharacters?: number;
};
export declare function checkingTranslationStatus(params: CheckingTranslationStatusParams, authParams: AuthParams): Promise<CheckingTranslationStatusReturnValue>;
export declare type DownloadTranslatedDocumentParams = DocumentInfo;
export declare type DownloadTranslatedDocumentReturnValue = Buffer;
export declare function downloadTranslatedDocument(params: DownloadTranslatedDocumentParams, authParams: AuthParams): Promise<DownloadTranslatedDocumentReturnValue>;
