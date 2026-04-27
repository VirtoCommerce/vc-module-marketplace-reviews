import { useApiClient, useAsync } from "@vc-shell/framework";
import { SearchCustomerReviewsQuery, VcmpReviewsClient } from "@vcmp-marketplace-reviews/api/marketplacereviews";
import { ref } from "vue";
import { useRoute } from "vue-router";

const { getApiClient } = useApiClient(VcmpReviewsClient);

export default () => {
  const route = useRoute();

  const review = ref();

  const { action: loadReview, loading } = useAsync<string>(async (_id) => {
    const sellerId = await GetSellerId();
    if (!_id) {
      review.value = undefined;
      return;
    }

    const command = { sellerId: sellerId, objectIds: [_id] } as SearchCustomerReviewsQuery;

    review.value = (await getApiClient())
      .searchCustomerReviews(command)
      .then((res) => res.results?.find((x) => x.id === _id));
  });

  async function GetSellerId(): Promise<string> {
    const result = route?.params?.sellerId as string;
    return result;
  }

  return {
    review,
    loading,
    loadReview,
  };
};
