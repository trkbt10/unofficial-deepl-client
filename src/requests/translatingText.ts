import { AuthParams, deepLRequestParamStringify, camelizeObjectKeyName } from "../utilities";
import fetch from "node-fetch";
import { DeepL } from "../deepl";

export type TranslatingTextRequestParameters = {
  text: string | string[];
  sourceLang?: DeepL.SourceLanguage;
  targetLang: DeepL.TargetLanguage;
  splitSentences?: boolean | "nonewlines";
  preserveFormatting: boolean;
  formality: "default" | "more" | "less" | string;
};
export type TranslatingTextResponse = {
  translations: {
    detectedSourceLanguage: DeepL.SourceLanguage;
    text: string;
  }[];
};
export async function translate(params: TranslatingTextRequestParameters, authParams: AuthParams): Promise<TranslatingTextResponse> {
  const { authKey, uri } = authParams;
  const query = deepLRequestParamStringify({ ...params, authKey });
  const result = await fetch(uri + "/translate?" + query, {
    method: "get",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  }).then((res) => res.json());
  return camelizeObjectKeyName(result);
}
