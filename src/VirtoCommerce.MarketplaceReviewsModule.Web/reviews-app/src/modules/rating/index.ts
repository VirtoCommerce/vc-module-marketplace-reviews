import * as pages from "./pages";
import * as locales from "./locales";
import { createAppModule, registerDashboardWidget } from "@vc-shell/framework";
import { markRaw } from "vue";
import RatingDashboardCard from "./components/RatingDashboardCard.vue";

// Register the rating & reviews widget
registerDashboardWidget({
  id: "rating-reviews-widget",
  name: "Rating & Reviews",
  component: markRaw(RatingDashboardCard),
  size: { width: 6, height: 6 },
});

export default createAppModule(pages, locales);
