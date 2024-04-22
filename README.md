# be-latinizer

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run ./index.ts
# or
bun .
```

# Options

| name       | default value | description           |
| ---------- | ------------- | --------------------- |
| `--inp`    | ./input       | input directory       |
| `--out`    | ./output      | output directory      |
| `--inpenc` | win1251       | input files encoding  |
| `--outenc` | win1250       | output files encoding |

Example:

```bash
bun . --inp ./cyr-translation --out ./lat-translation
```
