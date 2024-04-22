import { ALPHABET, Taraskevizer } from "taraskevizer";

const latinizer = new Taraskevizer({ general: { abc: ALPHABET.LATIN_JI } });

export const transformContent = (content: string) => {
  return latinizer
    .convertAlphabetOnly(
      content.replace(/\\n/g, " \\n ").replace(/ і(?=зь? )/g, " i"),
    )
    .replace(/ \\n /g, "\\n")
    .replace(/ŭ/g, "ů");
};
