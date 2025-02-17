import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts", // the entry declaration file from tsc
  output: [
    {
      file: "./dist/index.d.ts",
      format: "es",
    },
  ],
  plugins: [typescript()],
  external: ["axios"],
};
