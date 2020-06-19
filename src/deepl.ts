export namespace DeepL {
  export type ErrorMessage = {
    message: string;
  };
  export type SourceLanguage = "DE" | "EN" | "FR" | "IT" | "JA" | "ES" | "NL" | "PL" | "PT" | "RU" | "ZH" | string;
  export type TargetLanguage = "DE" | "EN" | "FR" | "IT" | "JA" | "ES" | "NL" | "PL" | "PT-PT" | "PT-BR" | "PT" | "RU" | "ZH" | string;
  export type XMLOptions = {
    tagHandling: "xml";
    nonSplittingTags: string[];
    outlineDetection: boolean;
    splittingTags: string[];
    ignoreTags: string[];
  };
}
