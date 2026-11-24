import * as blades from "./pages";
import * as locales from "./locales";
import { defineAppModule, registerExternalWidget } from "@vc-shell/framework";
import { markRaw } from "vue";
import SellerRatingWidget from "./components/SellerRatingWidget.vue";

// Marketplace Vendor's seller blade: "Rating" widget (legacy seller-rating-widget registered into "sellerDetails")
registerExternalWidget({
  id: "MarketplaceReviewsSellerRating",
  title: "Rating",
  component: markRaw(SellerRatingWidget),
  targetBlades: ["MarketplaceSellerDetails"],
  // not before the seller is loaded/saved
  isVisible: (blade) => !!blade?.param,
});

export default defineAppModule({
  blades,
  locales,
});

export * from "./pages";
