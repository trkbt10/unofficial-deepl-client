import * as QueryString from "querystring";
import fetch, { RequestInit } from "node-fetch";
export type AuthParams = {
  authKey: string;
  uri?: string;
};
const decamelize = (str: string) => str.replace(/([A-Z])/g, "_$1").toLowerCase();
const camelCase = (str: string) => {
  return str.replace(/[-|_|\s]([a-zA-Z0-9]+?)/g, (match, index: number) => {
    if (+match === 0) {
      return "";
    }
    const value = match.replace(/[-|_|\s]/g, "");
    if (index !== 0) {
      return value.toUpperCase();
    }
    return value.toLowerCase();
  });
};

export const camelizeObjectKeyName = <T extends {}>(object: T) => {
  const walker: (obj: {} | Array<any> | string | number) => any = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map((value) => walker(value));
    }
    if (obj && obj.constructor.name === "Object") {
      return Object.entries(obj).reduce((acc: Record<string, any>, [key, value]) => {
        acc[camelCase(key)] = walker(value);
        return acc;
      }, {});
    }
    return obj;
  };
  return walker(object) as T;
};
export const deepLRequestParamStringify = <T extends {}>(obj: T) => {
  let decamelizedObject = Object.entries(obj).reduce((acc: Record<string, any>, [key, value]) => {
    const decamelizedKey = decamelize(key);
    if (typeof value === "boolean") {
      acc[decamelizedKey] = value ? "1" : "0";
      return acc;
    }
    acc[decamelizedKey] = value;
    return acc;
  }, {});

  return QueryString.stringify(decamelizedObject, "&", "=", {});
};
export const request = async (uri: string, options?: RequestInit) => {
  const res = await fetch(uri, options);
  if (res.status >= 400) {
    if (res.size <= 0) {
      throw {
        message: res.statusText,
      };
    }
    throw res.json();
  }
  const result = await res.json();
  return camelizeObjectKeyName(result);
};
