import { AuthParams } from "../utilities";
export declare type MonitoringUsageReturnValue = {
    characterCount: number;
    characterLimit: number;
};
export declare function monitoringUsage(authParams: AuthParams): Promise<MonitoringUsageReturnValue>;
