import { defineConfig } from "vite";
import { resolve, join, dirname } from "node:path";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import pkg from "./../../package.json";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get dependencies versions from package.json
const { version, dependencies = {} } = pkg;

// Function to read framework version from dependencies
const getFrameworkVersion = () => {
  const frameworkDep = dependencies["@vc-shell/framework"] || "^1.0.0";
  return frameworkDep.replace(/^\^|~/, ""); // Remove ^ or ~ prefixes
};

export default defineConfig({
  build: {
    manifest: "manifest.json",
    copyPublicDir: false,
    sourcemap: true,
    minify: false,
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      fileName: (format, name) => `${name}.js`,
      formats: ["umd"],
      name: "VcShellDynamicModules",
    },
    outDir: join(__dirname, "../../dist/packages/new-modules"),
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
          "@vc-shell/framework": "VcShellFramework",
        },
        // Add version information to generated code
        banner: () => {
          const versionInfo = {
            version,
            compatibleWith: {
              framework: "^" + getFrameworkVersion(),
              // Specify dependencies from other modules if they exist
              modules: {},
            },
          };

          return `
            /* Module Version Info */
            (function() {
              if (typeof window !== 'undefined') {
                window.__VC_SHELL_MODULE_VERSION_INFO__ = window.__VC_SHELL_MODULE_VERSION_INFO__ || {};
                window.__VC_SHELL_MODULE_VERSION_INFO__["${pkg.name}"] = ${JSON.stringify(versionInfo)};
              }
            })();
          `;
        },
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
  plugins: [
    vue(),
    {
      name: "module-version-plugin",
      apply: "build",
      enforce: "post",

      // Modify manifest.json after it is created
      closeBundle: async () => {
        const manifestPath = join(__dirname, "../../dist/packages/modules/manifest.json");

        if (fs.existsSync(manifestPath)) {
          try {
            // Read generated manifest
            const manifestContent = await fs.promises.readFile(manifestPath, "utf-8");
            const manifest = JSON.parse(manifestContent);

            // Add file with metadata about version
            const versionFileName = "version.json";
            const versionFilePath = join(__dirname, "../../dist/packages/modules/", versionFileName);

            // Create information about version
            const versionInfo = {
              version: pkg.version,
              compatibleWith: {
                framework: "^" + getFrameworkVersion(),
                modules: {},
              },
            };

            // Write file with version
            await fs.promises.writeFile(versionFilePath, JSON.stringify(versionInfo, null, 2));

            // Add information about version file to manifest
            manifest[versionFileName] = {
              file: versionFileName,
              src: versionFileName,
              isVersionInfo: true, // Add special marker
            };

            // Write updated manifest
            await fs.promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

            console.log(`✓ Version information added to manifest: ${manifestPath}`);
          } catch (error) {
            console.error("Error updating manifest with version info:", error);
          }
        } else {
          console.warn(`Manifest file not found at ${manifestPath}`);
        }
      },
    },
  ],
});
