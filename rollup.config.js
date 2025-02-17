import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "./src/index.ts", // the entry declaration file from tsc
    output: [
      {
        file: "./dist/index.d.ts",
        format: "es",
      },
    ],
    plugins: [typescript()],
    external: ["axios"],
  },
  {
    input: "./src/index.ts",
    output: {
      file: "./dist/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      typescript({
        declaration: false, // don't emit declarations here
      }),
    ],
    external: ["axios"],
  },
];
