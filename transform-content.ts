import dict from "./dict";

export const transformContent = (content: string) => {
  const noFix: string[] = [];
  return dict
    .reduce(
      (acc, [pattern, result]) =>
        acc.replace(
          pattern,
          //@ts-ignore
          result,
        ),
      content.replace(/(?<=<).*?(?=>)/g, ($0) => {
        noFix.push($0);
        return "\ufffa";
      }),
    )
    .replace(/(?<=<)\ufffa(?=>)/g, () => noFix.shift()!);
};
