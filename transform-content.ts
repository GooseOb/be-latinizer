import { ALPHABET, Taraskevizer } from "taraskevizer";

const latinizer = new Taraskevizer({ general: { abc: ALPHABET.LATIN_JI } });

export const transformContent = (content: string) => {
  return latinizer
    .convertAlphabetOnly(
      content.replace(/\\n/g, " \\n ").replace(/ і(?=зь? )/g, " i"),
    )
    .replace(/(?:^| )\\n(?: |$)/g, "\\n")
    .replace(/(?<=[AOUEYIaoueyi]\s*\\n\s*)(?=i)/gu, "j")
    .replace(/(?<=[AOUEYIaoueyi]\s*\\n\s*)I(?=\p{Ll})/gu, "Ji")
    .replace(/(?<=[AOUEYIaoueyi]\s*\\n\s*)I(?=\p{Lu})/gu, "JI")
    .replace(/ŭ/g, "ů");
};
