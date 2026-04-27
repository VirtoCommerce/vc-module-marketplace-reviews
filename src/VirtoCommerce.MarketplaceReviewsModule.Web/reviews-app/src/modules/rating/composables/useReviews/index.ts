import { computed, ref, Ref } from "vue";
import {
  CustomerReview,
  SearchCustomerReviewsQuery,
  SearchCustomerReviewsResult,
  VcmpReviewsClient,
} from "@vcmp-marketplace-reviews/api/marketplacereviews";
import {
  useApiClient,
  useAsync,
  useDataTablePagination,
  type UseDataTablePaginationReturn,
} from "@vc-shell/framework";
import { useRoute } from "vue-router";

interface IUseReviewsOptions {
  pageSize?: number;
  sort?: string;
}
interface IUseReviews {
  loading: Ref<boolean>;
  reviews: Ref<CustomerReview[]>;
  customerReview: Ref<CustomerReview>;
  pagination: UseDataTablePaginationReturn;
  searchQuery: Ref<SearchCustomerReviewsQuery>;
  loadReviews: (query?: SearchCustomerReviewsQuery) => Promise<void>;
}

const { getApiClient } = useApiClient(VcmpReviewsClient);

export default (options?: IUseReviewsOptions): IUseReviews => {
  const route = useRoute();

  const pageSize = options?.pageSize || 20;
  const searchQuery = ref<SearchCustomerReviewsQuery>({
    take: pageSize,
    skip: 0,
    sort: options?.sort || "createdDate:DESC",
  });

  const searchResult = ref<SearchCustomerReviewsResult>();

  const customerReview = ref({} as CustomerReview);

  const { action: loadReviews, loading } = useAsync<SearchCustomerReviewsQuery>(async (query) => {
    const sellerId = await GetSellerId();
    const command = { ...query, sellerId: sellerId } as SearchCustomerReviewsQuery;

    searchResult.value = await (await getApiClient()).searchCustomerReviews(command);
  });

  async function GetSellerId(): Promise<string> {
    const result = route?.params?.sellerId as string;
    return result;
  }

  // Computed properties
  const items = computed(() => searchResult.value?.results || []);

  const pagination = useDataTablePagination({
    pageSize,
    totalCount: computed(() => searchResult.value?.totalCount ?? 0),
    onPageChange: ({ skip }) => loadReviews({ ...searchQuery.value, skip }),
  });

  return {
    reviews: items,
    loading: computed(() => loading.value),
    customerReview: computed(() => customerReview.value),
    pagination,
    searchQuery,
    loadReviews,
  };
};
