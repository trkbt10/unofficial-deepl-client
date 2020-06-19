# unofficial-deepl-client
This is an unofficial, DeepL API wrapper for Nodejs written in Typescript.

Official documentation: https://www.deepl.com/api.html

## Install

```
$ npm install trkbt10/unofficial-deepl-client
```

## Usage

```typescript
import * as DeepL from "unofficial-deepl-client";
const token = process.env.DEEPL_AUTH_KEY ?? "";
const deepL = new DeepL.WebClient(token);

deepL.translate({
  text: "山路を登りながら、こう考えた。",
  sourceLang: "JA",
  targetLang: "EN",
  splitSentences: false,
  preserveFormatting: false,
  formality: "default",
}).then((data) => {
  /*
    {
      translations: [
        {
          detectedSourceLanguage: "JA",
          text: "As I climbed the mountain road, I thought about this.",
        },
      ],
    }
  */
  console.log(data);
})
```

## Methods

### Translating text
https://www.deepl.com/docs-api/translating-documents/#translating-text

```typescript
type TranslatingTextRequestParameters = {
  text: string | string[];
  sourceLang?: DeepL.SourceLanguage;
  targetLang: DeepL.TargetLanguage;
  splitSentences?: boolean | "nonewlines";
  preserveFormatting: boolean;
  formality: "default" | "more" | "less" | string;
};
const params:TranslatingTextRequestParameters = {
  text: "山路を登りながら、こう考えた。",
  sourceLang: "JA",
  targetLang: "EN",
  splitSentences: false,
  preserveFormatting: false,
  formality: "default",
};
const response = await deepL.translate(params);
/*
  {
    translations: [
      {
        detectedSourceLanguage: "JA",
        text: "As I climbed the mountain road, I thought about this.",
      },
    ],
  }
*/
console.log(response);
```
#### Multiple sentences
https://www.deepl.com/docs-api/translating-documents/#multiple-sentences

```typescript
const response = await deepL.translate({
  text: ["This is the first sentence.", "This is the second sentence.", "This is the third sentence."],
  sourceLang: "EN",
  targetLang: "DE",
  splitSentences: true,
  preserveFormatting: false,
  formality: "default",
});
/*
{
  translations: [
    { detectedSourceLanguage: "EN", text: "Dies ist der erste Satz." },
    { detectedSourceLanguage: "EN", text: "Dies ist der zweite Satz." },
    { detectedSourceLanguage: "EN", text: "Dies ist der dritte Satz." },
  ],
}
*/
console.log(response)
```

### Translating documents

#### Uploading document
https://www.deepl.com/docs-api/translating-documents/#uploading

```typescript
const sourceDocFile = fs.readFileSync("/document/path/doc.docx");

type UploadDocumentParameters = {
  sourceLang?: DeepL.SourceLanguage;
  targetLang: DeepL.TargetLanguage;
  file: Buffer;
  filename?: string;
};
const params:UploadDocumentParameters = {
  targetLang: "JA",
  file: sourceDocFile,
  filename: "mydoc.docx",
};
const response = await deepL.uploadDocument(params);

/*
{
  documentId: "DOCUMENT_ID",
  documentKey: "DOCUMENT_KEY"
}
*/
console.log(response);

```
#### Checking translation status
https://www.deepl.com/docs-api/translating-documents/#checking-status

```typescript

const documentInfo = {
  documentId: "DOCUMENT_ID",
  documentKey: "DOCUMENT_KEY"
}
const response = await deepL.checkDocumentsTranslationStatus(documentInfo);
/*
  {
    documentId: "DOCUMENT_ID",
    status: "done";
    billedCharacters: 10000;
  }
*/
console.log(response);
```

#### Downloading translated documents
https://www.deepl.com/docs-api/translating-documents/#downloading

```typescript
const documentInfo = {
  documentId: "DOCUMENT_ID",
  documentKey: "DOCUMENT_KEY"
}
const buffer = await deepL.downloadTranslatedDocument(documentInfo);

fs.writeFileSync('translatedDocument.docx', buffer);

```

### Other functions
#### Monitoring usage
https://www.deepl.com/docs-api/other-functions/monitoring-usage/#monitoring-usage
```typescript
const response = await deepL.monitoringUsage();
/*
  {
    "characterCount": 180118,
    "characterLimit": 1250000
  }
*/
console.log(response);
```


#### Listing supported languages

https://www.deepl.com/docs-api/other-functions/monitoring-usage/#listing-supported-languages
```typescript
const response = await deepL.getSupportedLanguages();
/*
[
  {
    "language": "DE",
    "name": "Deutsch"
  },
  {
    "language": "EN",
    "name": "English"
  },
  ...
]
*/
console.log(response);
```

