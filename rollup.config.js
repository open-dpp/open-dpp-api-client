import dts from "rollup-plugin-dts";

export default {
  input: "./dist/index.d.ts", // the entry declaration file from tsc
  output: [
    {
      file: "./dist/index.d.ts",
      format: "es",
    },
  ],
  plugins: [dts()],
};
