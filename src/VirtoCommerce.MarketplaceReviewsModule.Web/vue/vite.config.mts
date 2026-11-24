import path from "node:path";
import { getDynamicModuleConfiguration } from "@vc-shell/mf-module";

// Builds the Marketplace Reviews admin UI as a Module Federation remote of the Admin Shell host.
// Output: <module>/plugins/admin-shell/ (remoteEntry.js + public/plugin.json),
// served by the platform at /modules/$(VirtoCommerce.MarketplaceReviews)/plugins/admin-shell/.
// (plugins/vendor-portal/ next to it is the vendor portal remote built from reviews-app/.)
const base = "/modules/$(VirtoCommerce.MarketplaceReviews)/plugins/admin-shell/";
process.env.APP_BASE_PATH = base;

export default getDynamicModuleConfiguration({
  appId: "admin-shell",
  moduleRoot: path.resolve(__dirname, ".."),
  entry: "./src/modules/index.ts",
  remoteName: "marketplace_reviews_admin",
  base,
});
