import { exists, mkdir, readdir, stat } from "fs/promises";
import * as path from "path";
import { transformContent } from "./transform-content";
import iconv from "iconv-lite";

const getArg = (name: string, defaultValue: string) => {
  const index = process.argv.indexOf(name) + 1;
  return index ? process.argv[index] : defaultValue;
};

const sourceDir = getArg("--inp", "./input");
const targetDir = getArg("--out", "./output");
const sourceEncoding = getArg("--inpenc", "win1251");
const targetEncoding = getArg("--outenc", "win1250");

if (!(await exists(sourceDir))) {
  process.stderr.write(
    `\x1b[31m[be-latinizer]\x1b[0m Source directory \x1b[33m${sourceDir}\x1b[0m does not exist\n`,
  );
  process.exit(1);
}

for (const relFilePath of await readdir(sourceDir, { recursive: true })) {
  const sourcePath = path.join(sourceDir, relFilePath);
  if ((await stat(sourcePath)).isDirectory()) {
    await mkdir(path.join(targetDir, relFilePath), { recursive: true });
    continue;
  }

  const data = iconv.decode(
    Buffer.from(await Bun.file(sourcePath).arrayBuffer()),
    sourceEncoding,
  );

  const targetPath = path.join(targetDir, relFilePath);

  await Bun.write(
    targetPath,
    iconv.encode(transformContent(data.toString()), targetEncoding),
  );

  process.stdout.write(`[done] ${targetPath}\n`);
}
