import { CustomerReviewsModuleClient, CustomerReviewsModuleRatingClient } from "../api_client/virtocommerce.customerreviews";

// The generated clients are plain fetch wrappers (same-origin cookie auth), so one instance each is enough.
// The operator UI reads Customer Reviews' own endpoints, as the legacy widget did; this module's api/vcmp/* endpoints
// are vendor-portal endpoints (seller-scoped authorization).
export const api = {
  reviews: new CustomerReviewsModuleClient(),
  rating: new CustomerReviewsModuleRatingClient(),
};
