"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebClient = void 0;
var getSupportedLanguages_1 = require("./requests/getSupportedLanguages");
var translatingDocuments_1 = require("./requests/translatingDocuments");
var translatingText_1 = require("./requests/translatingText");
var monitoringUsage_1 = require("./requests/monitoringUsage");
var WebClient = /** @class */ (function () {
    function WebClient(authKey, uri) {
        var _this = this;
        this.authParams = {
            authKey: "",
            uri: "https://api.deepl.com/v2",
        };
        this.sourceLanguages = ["DE", "EN", "FR", "IT", "JA", "ES", "NL", "PL", "PT", "RU", "ZH"];
        this.targetLanguages = ["DE", "EN", "FR", "IT", "JA", "ES", "NL", "PL", "PT-PT", "PT-BR", "PT", "RU", "ZH"];
        this.getSupportedLanguages = function () { return getSupportedLanguages_1.getSupportedLanguages(_this.authParams); };
        this.monitoringUsage = function () { return monitoringUsage_1.monitoringUsage(_this.authParams); };
        this.uploadDocument = function (params) { return translatingDocuments_1.uploadDocument(params, _this.authParams); };
        this.translate = function (params) { return translatingText_1.translate(params, _this.authParams); };
        this.checkDocumentsTranslationStatus = function (params) { return translatingDocuments_1.checkingTranslationStatus(params, _this.authParams); };
        this.downloadTranslatedDocument = function (params) { return translatingDocuments_1.downloadTranslatedDocument(params, _this.authParams); };
        this.authParams.authKey = authKey;
        if (uri) {
            this.authParams.uri = uri;
        }
    }
    return WebClient;
}());
exports.WebClient = WebClient;
