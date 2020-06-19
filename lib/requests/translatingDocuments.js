"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadTranslatedDocument = exports.checkingTranslationStatus = exports.uploadDocument = void 0;
var utilities_1 = require("../utilities");
var form_data_1 = __importDefault(require("form-data"));
var node_fetch_1 = __importDefault(require("node-fetch"));
function uploadDocument(params, authParams) {
    return __awaiter(this, void 0, void 0, function () {
        var authKey, uri, form, fileOptions, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authKey = authParams.authKey, uri = authParams.uri;
                    form = new form_data_1.default();
                    fileOptions = params.filename
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
                    return [4 /*yield*/, utilities_1.request(uri + "/document", {
                            method: "post",
                            body: form,
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, utilities_1.camelizeObjectKeyName(result)];
            }
        });
    });
}
exports.uploadDocument = uploadDocument;
function checkingTranslationStatus(params, authParams) {
    return __awaiter(this, void 0, void 0, function () {
        var authKey, uri, query, endpoint;
        return __generator(this, function (_a) {
            authKey = authParams.authKey, uri = authParams.uri;
            query = utilities_1.deepLRequestParamStringify({ authKey: authKey, documentKey: params.documentKey });
            endpoint = uri + "/document/" + params.documentId;
            return [2 /*return*/, utilities_1.request(endpoint, {
                    method: "post",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                    },
                    body: query,
                })];
        });
    });
}
exports.checkingTranslationStatus = checkingTranslationStatus;
function downloadTranslatedDocument(params, authParams) {
    return __awaiter(this, void 0, void 0, function () {
        var authKey, uri, query, endpoint, res, error, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authKey = authParams.authKey, uri = authParams.uri;
                    query = utilities_1.deepLRequestParamStringify({ authKey: authKey, documentKey: params.documentKey });
                    endpoint = uri + "/document/" + params.documentId + "/result";
                    return [4 /*yield*/, node_fetch_1.default(endpoint, {
                            method: "post",
                            headers: {
                                "content-type": "application/x-www-form-urlencoded",
                            },
                            body: query,
                        })];
                case 1:
                    res = _a.sent();
                    if (!(res.status >= 400)) return [3 /*break*/, 3];
                    if (res.size <= 0) {
                        throw {
                            message: res.statusText,
                        };
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    error = _a.sent();
                    throw error;
                case 3: return [4 /*yield*/, res.buffer()];
                case 4:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.downloadTranslatedDocument = downloadTranslatedDocument;
