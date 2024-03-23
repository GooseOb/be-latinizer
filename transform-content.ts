import dict from "./dict";

export const transformContent = (content: string) =>
  dict.reduce(
    (acc, [pattern, result]) => acc.replace(pattern, result),
    content,
  );
