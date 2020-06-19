import "jasmine";
import * as DeepL from "../../src";

describe("monitoringUsage", () => {
  const deepL = new DeepL.WebClient(process.env.DEEPL_AUTH_KEY ?? "");
  it("should be successful", async () => {
    const response = await deepL.monitoringUsage();
    expect(typeof response.characterCount).toEqual("number");
    expect(typeof response.characterLimit).toEqual("number");
  });
});
