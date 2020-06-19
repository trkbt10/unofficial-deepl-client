/// <reference types="node" />
import { UploadDocumentParameters, CheckingTranslationStatusParams } from "./requests/translatingDocuments";
import { AuthParams } from "./utilities";
import { TranslatingTextRequestParameters } from "./requests/translatingText";
import { DeepL } from "./deepl";
import { DownloadTranslatedDocumentParams } from "./requests/translatingDocuments";
export declare class WebClient {
    authParams: AuthParams;
    sourceLanguages: DeepL.SourceLanguage[];
    targetLanguages: DeepL.TargetLanguage[];
    constructor(authKey: string, uri?: string);
    getSupportedLanguages: () => Promise<import("./requests/getSupportedLanguages").GetSupportedLanguagesResponse>;
    monitoringUsage: () => Promise<import("./requests/monitoringUsage").MonitoringUsageReturnValue>;
    uploadDocument: (params: UploadDocumentParameters) => Promise<import("./requests/translatingDocuments").DocumentInfo>;
    translate: (params: TranslatingTextRequestParameters) => Promise<import("./requests/translatingText").TranslatingTextResponse>;
    checkDocumentsTranslationStatus: (params: CheckingTranslationStatusParams) => Promise<import("./requests/translatingDocuments").CheckingTranslationStatusReturnValue>;
    downloadTranslatedDocument: (params: DownloadTranslatedDocumentParams) => Promise<Buffer>;
}
