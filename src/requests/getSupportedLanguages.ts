import { AuthParams, deepLRequestParamStringify, camelizeObjectKeyName } from "../utilities";
import fetch from "node-fetch";

export type GetSupportedLanguagesResponse = {
  language: string;
  name: string;
}[];

export async function getSupportedLanguages(authParams: AuthParams): Promise<GetSupportedLanguagesResponse> {
  const { authKey, uri } = authParams;
  const query = deepLRequestParamStringify({ authKey });
  const result = await fetch(uri + "/languages?" + query, {}).then((res) => res.json());
  return camelizeObjectKeyName(result);
}
