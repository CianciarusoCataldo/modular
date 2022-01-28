import typescript from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";
import { terser } from "rollup-plugin-terser";
import banner2 from "rollup-plugin-banner2";

import pkg from "../package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "playground/src/modular-preview",
        format: "cjs",
        plugins: [terser()],
        strict: false,
      },
      {
        dir: "playground/src/modular-preview",
        format: "esm",
        strict: false,
      },
      {
        dir: pkg.module,
        format: "cjs",
        strict: false,
        plugins: [terser()],
      },
      {
        dir: pkg.module,
        format: "esm",
        strict: false,
      },
    ],
    plugins: [
      del({ targets: ["dist/*", "playground/src/modular-preview"] }),
      banner2(() => `/* eslint-disable */`),
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
