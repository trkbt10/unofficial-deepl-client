"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usage = void 0;
var utilities_1 = require("../utilities");
var node_fetch_1 = __importDefault(require("node-fetch"));
function usage(authParams) {
    var _a = utilities_1.useAuthParams(authParams), authKey = _a.authKey, uri = _a.uri;
    var query = utilities_1.deepLRequestParamStringify({ authKey: authKey });
    return node_fetch_1.default(uri + "?" + query, {}).then(function (res) { return res.json(); });
}
exports.usage = usage;
