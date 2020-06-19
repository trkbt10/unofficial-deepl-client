import "jasmine";
import * as DeepL from "../../src";
import fs from "fs";
describe("translatingDocuments", () => {
  const deepL = new DeepL.WebClient(process.env.DEEPL_AUTH_KEY ?? "");
  const documentInfo = {
    documentId: "9F1844F36ED659755056B431846D3281",
    documentKey: "DF45228236942DBC77A544A6F1113E9F0D0A4276AD94F20DB6AB091A6329DE2F",
  };
  it("upload document", async () => {
    const sampleDocFile = await fs.promises.readFile(__dirname + "/../support/file-sample_100kB.docx");
    const response = await deepL.uploadDocument({
      targetLang: "JA",
      file: sampleDocFile,
      filename: "mydoc.docx",
    });
    expect(typeof response.documentId).toEqual("string");
    expect(typeof response.documentKey).toEqual("string");
  });
  it("checking translation status", async () => {
    const response = await deepL.checkDocumentsTranslationStatus(documentInfo);
    expect(response.documentId).toEqual(documentInfo.documentId);
    expect(typeof response.status).toEqual("string");
  });

  it("downloading translated documents", async () => {
    const translatedDocumentBuffer = await deepL.downloadTranslatedDocument(documentInfo);
    fs.writeFileSync("translatedDocumentBuffer.docx", translatedDocumentBuffer);
    expect(translatedDocumentBuffer instanceof Buffer).toBeTruthy();
  });
});
