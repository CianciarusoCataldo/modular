import typescript from "rollup-plugin-typescript2";
import analyze from "rollup-plugin-analyzer";

import pkg from "../package.json";

export default [
  {
    input: "src/index.ts",
    output: [],
    plugins: [typescript(), analyze()],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
