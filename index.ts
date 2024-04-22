import { readFile, writeFile, mkdir, exists, readdir, stat } from "fs/promises";
import * as path from "path";
import { transformContent } from "./transform-content";
import iconv from "iconv-lite";

const readFilesRecursively = (
  dir: string,
  callback: (filePath: string) => void,
) => {
  readdir(dir).then((dirs) =>
    Promise.all(
      dirs.map(async (filePath) => {
        filePath = path.resolve(dir, filePath);
        if ((await stat(filePath)).isDirectory()) {
          readFilesRecursively(filePath, callback);
        } else {
          callback(filePath);
        }
      }),
    ),
  );
};

const sourceDir = "./input";
const targetDir = "./output";

const createDirIfNotExist = (dirPath: string) =>
  exists(dirPath).then((does) => {
    if (!does) return mkdir(dirPath, { recursive: true });
  });

await createDirIfNotExist(targetDir);

readFilesRecursively(sourceDir, async (filePath) => {
  const data = iconv.decode(
    (await readFile(filePath, "binary")) as unknown as Buffer,
    "win1251",
  );

  const transformedContent = transformContent(data.toString());

  const relativePath = path.relative(sourceDir, filePath);
  const targetFilePath = path.join(targetDir, relativePath);

  const targetDirPath = path.dirname(targetFilePath);

  await createDirIfNotExist(targetDirPath);

  await writeFile(
    targetFilePath,
    iconv.encode(transformedContent, "win1250"),
    "utf8",
  );
  process.stdout.write(`[done] ${targetFilePath}\n`);
});
