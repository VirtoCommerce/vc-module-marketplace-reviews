import { defineConfig } from "vite";
import { resolve, join, dirname } from "node:path";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { externalizeDeps } from "vite-plugin-externalize-deps";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    manifest: "manifest.json",
    copyPublicDir: false,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      fileName: (format, name) => `${name}.mjs`,
      formats: ["es"],
    },

    outDir: join(__dirname, "../../dist/packages/modules"),
    rollupOptions: {
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
