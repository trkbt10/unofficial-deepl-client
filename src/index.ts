import { getSupportedLanguages } from "./requests/getSupportedLanguages";
import {
  uploadDocument,
  checkingTranslationStatus,
  UploadDocumentParameters,
  CheckingTranslationStatusParams,
  downloadTranslatedDocument,
} from "./requests/translatingDocuments";
import { AuthParams } from "./utilities";
import { TranslatingTextRequestParameters, translate } from "./requests/translatingText";
import { monitoringUsage } from "./requests/monitoringUsage";
import { DeepL } from "./deepl";
import { DownloadTranslatedDocumentParams } from "./requests/translatingDocuments";

export class WebClient {
  authParams: AuthParams = {
    authKey: "",
    uri: "https://api.deepl.com/v2",
  };
  sourceLanguages: DeepL.SourceLanguage[] = ["DE", "EN", "FR", "IT", "JA", "ES", "NL", "PL", "PT", "RU", "ZH"];
  targetLanguages: DeepL.TargetLanguage[] = ["DE", "EN", "FR", "IT", "JA", "ES", "NL", "PL", "PT-PT", "PT-BR", "PT", "RU", "ZH"];
  constructor(authKey: string, uri?: string) {
    this.authParams.authKey = authKey;
    if (uri) {
      this.authParams.uri = uri;
    }
  }
  getSupportedLanguages = () => getSupportedLanguages(this.authParams);
  monitoringUsage = () => monitoringUsage(this.authParams);
  uploadDocument = (params: UploadDocumentParameters) => uploadDocument(params, this.authParams);
  translate = (params: TranslatingTextRequestParameters) => translate(params, this.authParams);
  checkDocumentsTranslationStatus = (params: CheckingTranslationStatusParams) => checkingTranslationStatus(params, this.authParams);
  downloadTranslatedDocument = (params: DownloadTranslatedDocumentParams) => downloadTranslatedDocument(params, this.authParams);
}
