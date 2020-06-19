import { AuthParams, deepLRequestParamStringify, camelizeObjectKeyName } from "../utilities";
import fetch from "node-fetch";

export type MonitoringUsageReturnValue = {
  characterCount: number;
  characterLimit: number;
};
export async function monitoringUsage(authParams: AuthParams): Promise<MonitoringUsageReturnValue> {
  const { authKey, uri } = authParams;
  const query = deepLRequestParamStringify({ authKey });
  const result = await fetch(`${uri}/usage?${query}`, {}).then((res) => res.json());
  return camelizeObjectKeyName(result);
}
