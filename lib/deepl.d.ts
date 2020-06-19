export declare namespace DeepL {
    type ErrorMessage = {
        message: string;
    };
    type SourceLanguage = "DE" | "EN" | "FR" | "IT" | "JA" | "ES" | "NL" | "PL" | "PT" | "RU" | "ZH" | string;
    type TargetLanguage = "DE" | "EN" | "FR" | "IT" | "JA" | "ES" | "NL" | "PL" | "PT-PT" | "PT-BR" | "PT" | "RU" | "ZH" | string;
    type XMLOptions = {
        tagHandling: "xml";
        nonSplittingTags: string[];
        outlineDetection: boolean;
        splittingTags: string[];
        ignoreTags: string[];
    };
}
