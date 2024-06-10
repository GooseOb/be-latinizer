import { dicts, tarask, pipelines, TaraskConfig } from "taraskevizer";

const cfg = new TaraskConfig({
  general: { abc: dicts.alphabets.latinJi },
});

export const transformContent = (content: string) => {
  return tarask(
    content.replace(/\\n/g, " \\n ").replace(/ і(?=зь? )/g, " i"),
    pipelines.plainText,
    cfg,
  )
    .replace(/(?:^| )\\n(?: |$)/g, "\\n")
    .replace(/(?<=[AOUEYIaoueyi]\s*\\n\s*)(?=i)/gu, "j")
    .replace(/(?<=[AOUEYIaoueyi]\s*\\n\s*)I(?=\p{Ll})/gu, "Ji")
    .replace(/(?<=[AOUEYIaoueyi]\s*\\n\s*)I(?=\p{Lu})/gu, "JI")
    .replace(/ŭ/g, "ů");
};
