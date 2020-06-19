import "jasmine";
import * as DeepL from "../../src";

describe("translatingText", () => {
  const deepL = new DeepL.WebClient(process.env.DEEPL_AUTH_KEY ?? "");
  it("translate", async () => {
    const response = await deepL.translate({
      text: "山路を登りながら、こう考えた。",
      sourceLang: "JA",
      targetLang: "EN",
      splitSentences: false,
      preserveFormatting: false,
      formality: "default",
    });
    expect(response).toEqual({
      translations: [
        {
          detectedSourceLanguage: "JA",
          text: "As I climbed the mountain road, I thought about this.",
        },
      ],
    });
  });
  it("Multiple sentences", async () => {
    const response = await deepL.translate({
      text: ["This is the first sentence.", "This is the second sentence.", "This is the third sentence."],
      sourceLang: "EN",
      targetLang: "DE",
      splitSentences: true,
      preserveFormatting: false,
      formality: "default",
    });
    expect(response).toEqual({
      translations: [
        { detectedSourceLanguage: "EN", text: "Dies ist der erste Satz." },
        { detectedSourceLanguage: "EN", text: "Dies ist der zweite Satz." },
        { detectedSourceLanguage: "EN", text: "Dies ist der dritte Satz." },
      ],
    });
  });
});
