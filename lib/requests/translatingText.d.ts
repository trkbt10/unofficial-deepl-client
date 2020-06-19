import { AuthParams } from "../utilities";
import { DeepL } from "../deepl";
export declare type TranslatingTextRequestParameters = {
    text: string | string[];
    sourceLang?: DeepL.SourceLanguage;
    targetLang: DeepL.TargetLanguage;
    splitSentences?: boolean | "nonewlines";
    preserveFormatting: boolean;
    formality: "default" | "more" | "less" | string;
};
export declare type TranslatingTextResponse = {
    translations: {
        detectedSourceLanguage: DeepL.SourceLanguage;
        text: string;
    }[];
};
export declare function translate(params: TranslatingTextRequestParameters, authParams: AuthParams): Promise<TranslatingTextResponse>;
