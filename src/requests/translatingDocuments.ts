import { AuthParams, deepLRequestParamStringify, camelizeObjectKeyName, request } from "../utilities";
import FormData from "form-data";
import fetch from "node-fetch";
import { DeepL } from "../deepl";

export type DocumentInfo = {
  documentId: string;
  documentKey: string;
};
export type UploadDocumentParameters = {
  sourceLang?: DeepL.SourceLanguage;
  targetLang: DeepL.TargetLanguage;
  file: Buffer;
  filename?: string;
};
export type UploadDocumentResponse = DocumentInfo;
export async function uploadDocument(params: UploadDocumentParameters, authParams: AuthParams): Promise<UploadDocumentResponse> {
  const { authKey, uri } = authParams;
  const form = new FormData();
  const fileOptions = params.filename
    ? {
        filename: params.filename,
      }
    : {};
  form.append("file", params.file, fileOptions);
  form.append("target_lang", params.targetLang);
  if (params.sourceLang) {
    form.append("source_lang", params.sourceLang);
  }
  form.append("auth_key", authKey);

  const result = await request(uri + "/document", {
    method: "post",
    body: form,
  });
  return camelizeObjectKeyName(result);
}

export type CheckingTranslationStatusParams = DocumentInfo;
export type CheckingTranslationStatusReturnValue = {
  documentId: string;
  status: "queued" | "translating" | "done" | "error" | string;
  secondsRemaining?: number;
  billedCharacters?: number;
};
export async function checkingTranslationStatus(
  params: CheckingTranslationStatusParams,
  authParams: AuthParams
): Promise<CheckingTranslationStatusReturnValue> {
  const { authKey, uri } = authParams;
  const query = deepLRequestParamStringify({ authKey, documentKey: params.documentKey });
  const endpoint = uri + "/document/" + params.documentId;
  return request(endpoint, {
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: query,
  });
}

export type DownloadTranslatedDocumentParams = DocumentInfo;
export type DownloadTranslatedDocumentReturnValue = Buffer;
export async function downloadTranslatedDocument(
  params: DownloadTranslatedDocumentParams,
  authParams: AuthParams
): Promise<DownloadTranslatedDocumentReturnValue> {
  const { authKey, uri } = authParams;
  const query = deepLRequestParamStringify({ authKey, documentKey: params.documentKey });
  const endpoint = uri + "/document/" + params.documentId + "/result";
  const res = await fetch(endpoint, {
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: query,
  });
  if (res.status >= 400) {
    if (res.size <= 0) {
      throw {
        message: res.statusText,
      };
    }
    const error = await res.json();
    throw error;
  }
  const data = await res.buffer();
  return data;
}
