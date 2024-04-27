import { mkdir, readdir, stat } from "fs/promises";
import * as path from "path";
import { transformContent } from "./transform-content";
import iconv from "iconv-lite";

const getArg = (name: string, defaultValue: string) => {
  const index = process.argv.indexOf(name) + 1;
  return index ? process.argv[index] : defaultValue;
};

const sourceDir = path.resolve(getArg("--inp", "./input"));
const targetDir = getArg("--out", "./output");
const sourceEncoding = getArg("--inpenc", "win1251");
const targetEncoding = getArg("--outenc", "win1250");

for (const relFilePath of await readdir(sourceDir, { recursive: true })) {
  if (relFilePath.endsWith("desktop.ini")) continue;
  const sourcePath = path.join(sourceDir, relFilePath);
  if ((await stat(sourcePath)).isDirectory()) {
    await mkdir(path.join(targetDir, relFilePath), { recursive: true });
    continue;
  }

  const targetPath = path.join(targetDir, relFilePath);
  Bun.file(sourcePath)
    .arrayBuffer()
    .then((buffer) =>
      Bun.write(
        targetPath,
        iconv.encode(
          transformContent(
            iconv.decode(Buffer.from(buffer), sourceEncoding).toString(),
          ),
          targetEncoding,
        ),
      ),
    )
    .then(() => {
      process.stdout.write(`[done] ${targetPath}\n`);
    });
}
