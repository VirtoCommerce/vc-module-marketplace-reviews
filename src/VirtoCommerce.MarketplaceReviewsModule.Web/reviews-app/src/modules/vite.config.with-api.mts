import { defineConfig } from "vite";
import { resolve, join, dirname } from "node:path";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    manifest: "manifest.json",
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      fileName: (format, name) => `${name}.mjs`,
      formats: ["umd"],
      name: "vc-marketplace-reviews",
    },

    outDir: join(__dirname, "../../dist/packages/modules"),
    rollupOptions: {
      output: {
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
          "vee-validate": "VeeValidate",
          "vue-i18n": "VueI18n",
          moment: "moment",
          "lodash-es": "_",
          "@vueuse/core": "VueUse",
          "@vc-shell/framework": "VcShell",
        }
      },
      external: [
        /node_modules/,
        "@vc-shell/framework",
        "vue",
        "vue-router",
        "vee-validate",
        "vue-i18n",
        "moment",
        "lodash-es",
        "@vueuse/core",
      ],
    },
  },
  plugins: [vue()],
});
