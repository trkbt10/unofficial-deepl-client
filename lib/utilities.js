"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.request = exports.deepLRequestParamStringify = exports.camelizeObjectKeyName = void 0;
var QueryString = __importStar(require("querystring"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var decamelize = function (str) { return str.replace(/([A-Z])/g, "_$1").toLowerCase(); };
var camelCase = function (str) {
    return str.replace(/[-|_|\s]([a-zA-Z0-9]+?)/g, function (match, index) {
        if (+match === 0) {
            return "";
        }
        var value = match.replace(/[-|_|\s]/g, "");
        if (index !== 0) {
            return value.toUpperCase();
        }
        return value.toLowerCase();
    });
};
exports.camelizeObjectKeyName = function (object) {
    var walker = function (obj) {
        if (Array.isArray(obj)) {
            return obj.map(function (value) { return walker(value); });
        }
        if (obj && obj.constructor.name === "Object") {
            return Object.entries(obj).reduce(function (acc, _a) {
                var key = _a[0], value = _a[1];
                acc[camelCase(key)] = walker(value);
                return acc;
            }, {});
        }
        return obj;
    };
    return walker(object);
};
exports.deepLRequestParamStringify = function (obj) {
    var decamelizedObject = Object.entries(obj).reduce(function (acc, _a) {
        var key = _a[0], value = _a[1];
        var decamelizedKey = decamelize(key);
        if (typeof value === "boolean") {
            acc[decamelizedKey] = value ? "1" : "0";
            return acc;
        }
        acc[decamelizedKey] = value;
        return acc;
    }, {});
    return QueryString.stringify(decamelizedObject, "&", "=", {});
};
exports.request = function (uri, options) { return __awaiter(void 0, void 0, void 0, function () {
    var res, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fetch_1.default(uri, options)];
            case 1:
                res = _a.sent();
                if (res.status >= 400) {
                    if (res.size <= 0) {
                        throw {
                            message: res.statusText,
                        };
                    }
                    throw res.json();
                }
                return [4 /*yield*/, res.json()];
            case 2:
                result = _a.sent();
                return [2 /*return*/, exports.camelizeObjectKeyName(result)];
        }
    });
}); };
