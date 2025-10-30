import { computed, ref, Ref } from "vue";
import {
  CustomerReview,
  SearchCustomerReviewsQuery,
  SearchCustomerReviewsResult,
  VcmpReviewsClient,
  ISearchCustomerReviewsQuery,
} from "@vcmp-marketplace-reviews/api/marketplacereviews";
import { useApiClient, useAsync } from "@vc-shell/framework";
import { useRoute } from "vue-router";

interface IUseReviewsOptions {
  pageSize?: number;
  sort?: string;
}
interface IUseReviews {
  loading: Ref<boolean>;
  reviews: Ref<CustomerReview[]>;
  customerReview: Ref<CustomerReview>;
  totalCount: Ref<number>;
  pages: Ref<number>;
  currentPage: Ref<number>;
  searchQuery: Ref<ISearchCustomerReviewsQuery>;
  loadReviews: (query?: ISearchCustomerReviewsQuery) => Promise<void>;
}

const { getApiClient } = useApiClient(VcmpReviewsClient);

export default (options?: IUseReviewsOptions): IUseReviews => {
  const route = useRoute();

  const pageSize = options?.pageSize || 20;
  const searchQuery = ref<ISearchCustomerReviewsQuery>({
    take: pageSize,
    skip: 0,
    sort: options?.sort || "createdDate:DESC",
  });

  const searchResult = ref<SearchCustomerReviewsResult>();

  const customerReview = ref(new CustomerReview());

  const { action: loadReviews, loading } = useAsync<ISearchCustomerReviewsQuery>(async (query) => {
    const sellerId = await GetSellerId();
    const command = new SearchCustomerReviewsQuery({ ...query, sellerId: sellerId });

    searchResult.value = await (await getApiClient()).searchCustomerReviews(command);
  });

  async function GetSellerId(): Promise<string> {
    const result = route?.params?.sellerId as string;
    return result;
  }

  // Computed properties
  const items = computed(() => searchResult.value?.results || []);
  const totalCount = computed(() => searchResult.value?.totalCount || 0);
  const pages = computed(() => Math.ceil(totalCount.value / pageSize));
  const currentPage = computed(() => Math.floor((searchQuery.value.skip || 0) / pageSize) + 1);

  return {
    reviews: items,
    loading: computed(() => loading.value),
    customerReview: computed(() => customerReview.value),
    totalCount,
    pages,
    currentPage,
    searchQuery,
    loadReviews,
  };
};
