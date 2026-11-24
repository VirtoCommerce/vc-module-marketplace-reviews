// Blade options; type aliases, not interfaces, so they fit openBlade's Record<string, unknown> options

/** Customer Reviews permission of the rating endpoint (CustomerReviews ModuleConstants.Security.Permissions.CustomerReviewRatingRead) */
export const CUSTOMER_REVIEW_RATING_READ = "customerReviews:ratingRead";

/** Customer Reviews permission of the review list endpoint (CustomerReviews ModuleConstants.Security.Permissions.CustomerReviewRead) */
export const CUSTOMER_REVIEW_READ = "customerReviews:read";

/** Customer Reviews stores seller reviews under the Customer module's Organization type (legacy widget's entityType) */
export const SELLER_ENTITY_TYPE = "Organization";

/** MarketplaceReviewsSellerReviews: the seller whose reviews are listed */
export type SellerReviewsOptions = {
  sellerId: string;
  sellerName?: string;
};
