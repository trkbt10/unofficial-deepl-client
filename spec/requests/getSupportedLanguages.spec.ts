import "jasmine";
import * as DeepL from "../../src";

describe("getSupportedLanguages", () => {
  const deepL = new DeepL.WebClient(process.env.DEEPL_AUTH_KEY ?? "");
  it("should be successful", async () => {
    const response = await deepL.getSupportedLanguages();
    expect(Array.isArray(response)).toBeTruthy();
    if (response.length > 0) {
      expect(typeof response[0].language).toEqual("string");
      expect(typeof response[0].name).toEqual("string");
    }
  });
});
