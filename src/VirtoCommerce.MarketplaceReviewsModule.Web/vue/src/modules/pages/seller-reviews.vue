<template>
  <VcBlade
    :title="$t('MARKETPLACE_REVIEWS.REVIEWS.TITLE')"
    :subtitle="options?.sellerName"
    :toolbar-items="toolbar"
    :loading="loading"
    width="70%"
  >
    <VcDataTable
      v-model:search-value="keyword"
      v-model:sort-field="sortField"
      v-model:sort-order="sortOrder"
      searchable
      :items="items"
      :total-count="totalCount"
      :pagination="pagination"
      :state-key="'MARKETPLACE_REVIEWS_SELLER_REVIEWS'"
      :empty-state="{ icon: 'lucide-star', title: $t('MARKETPLACE_REVIEWS.REVIEWS.EMPTY') }"
      @pagination-click="pagination.goToPage"
    >
      <template #search-header-actions>
        <div class="marketplace-reviews-filters">
          <VcSelect
            v-model="status"
            :options="statusOptions"
            :placeholder="$t('MARKETPLACE_REVIEWS.REVIEWS.STATUS_PLACEHOLDER')"
            size="small"
            clearable
          />
        </div>
      </template>
      <!-- title and text in one column (legacy had two), so the list stays readable next to the seller blade -->
      <VcColumn
        id="title"
        :title="$t('MARKETPLACE_REVIEWS.REVIEWS.REVIEW')"
        sortable
        always-visible
      >
        <template #body="{ data }">
          <div class="marketplace-reviews-review">
            <span class="marketplace-reviews-review__title">{{ data.title }}</span>
            <span class="marketplace-reviews-review__text">{{ data.review }}</span>
          </div>
        </template>
      </VcColumn>
      <VcColumn
        id="rating"
        :title="$t('MARKETPLACE_REVIEWS.REVIEWS.RATING')"
        width="130px"
        sortable
      >
        <template #body="{ data }">
          <VcRating :model-value="data.rating" />
        </template>
      </VcColumn>
      <VcColumn
        id="createdDate"
        :title="$t('MARKETPLACE_REVIEWS.REVIEWS.CREATED')"
        type="date-ago"
        width="140px"
        sortable
      />
      <VcColumn
        id="reviewStatus"
        :title="$t('MARKETPLACE_REVIEWS.REVIEWS.STATUS')"
        width="130px"
        sortable
      >
        <template #body="{ data }">
          <VcStatus :variant="statusVariant(data.reviewStatus)">{{ statusName(data.reviewStatus) }}</VcStatus>
        </template>
      </VcColumn>
      <VcColumn
        id="userName"
        :title="$t('MARKETPLACE_REVIEWS.REVIEWS.CREATED_BY')"
        sortable
      />
      <!-- filled for product reviews only (Customer Reviews' list endpoint), so usually empty here -->
      <VcColumn
        id="storeName"
        :title="$t('MARKETPLACE_REVIEWS.REVIEWS.STORE')"
        :visible="false"
      />
    </VcDataTable>
  </VcBlade>
</template>

<script setup lang="ts">
import { useBlade, useDataTablePagination, useDataTableSort, useFunctions, type IBladeToolbar } from "@vc-shell/framework";
import { VcBlade, VcColumn, VcDataTable, VcRating, VcSelect, VcStatus } from "@vc-shell/framework/ui";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { api } from "../api";
import { CUSTOMER_REVIEW_READ, SELLER_ENTITY_TYPE, type SellerReviewsOptions } from "../types";
import { CustomerReviewStatus, type CustomerReviewListItem } from "../../api_client/virtocommerce.customerreviews";

// legacy Customer Reviews reviews-list, opened by the seller rating widget filtered to the seller.
// Read-only: approving/rejecting reviews (legacy review-detail) belongs to a Customer Reviews admin-shell port.
defineBlade({ url: "/marketplace-seller-reviews", name: "MarketplaceReviewsSellerReviews", permissions: [CUSTOMER_REVIEW_READ] });

const PAGE_SIZE = 20;
const { t } = useI18n({ useScope: "global" });
const { options } = useBlade<SellerReviewsOptions>();
const { debounce } = useFunctions();

const items = ref<CustomerReviewListItem[]>([]);
const totalCount = ref(0);
const loading = ref(false);
const keyword = ref("");
const status = ref<CustomerReviewStatus>();
// newest first, as the legacy grid
const { sortField, sortOrder, sortExpression } = useDataTableSort({ initialField: "createdDate", initialDirection: "DESC" });
const pagination = useDataTablePagination({ pageSize: PAGE_SIZE, totalCount });

const statusName = (value?: string) => (value ? t(`MARKETPLACE_REVIEWS.STATUSES.${value}`) : "");
const statusOptions = computed(() => Object.values(CustomerReviewStatus).map((id) => ({ id, title: statusName(id) })));
const statusVariant = (value?: string) =>
  value === CustomerReviewStatus.Approved ? "success" : value === CustomerReviewStatus.Rejected ? "danger" : "info";

async function load() {
  const sellerId = options.value?.sellerId;
  if (!sellerId) return;
  loading.value = true;
  try {
    const res = await api.reviews.getCustomerReviewsList({
      entityIds: [sellerId],
      entityType: SELLER_ENTITY_TYPE,
      reviewStatus: status.value ? [status.value] : undefined,
      // the legacy list searched by searchPhrase
      searchPhrase: keyword.value || undefined,
      sort: sortExpression.value,
      skip: pagination.skip,
      take: PAGE_SIZE,
    });
    items.value = res.results ?? [];
    totalCount.value = res.totalCount ?? 0;
  } finally {
    loading.value = false;
  }
}
load();
watch([keyword, status], () => pagination.setPage(1));
watch([sortExpression, keyword, status, () => pagination.skip], debounce(load, 300));

const toolbar = computed<IBladeToolbar[]>(() => [
  { id: "refresh", title: t("MARKETPLACE_REVIEWS.TOOLBAR.REFRESH"), icon: "lucide-refresh-cw", clickHandler: load },
]);
</script>

<style lang="scss" scoped>
.marketplace-reviews-filters {
  display: flex;
  gap: 8px;
  min-width: 180px;
}
// one line each, so long reviews keep the row height
.marketplace-reviews-review {
  display: flex;
  flex-direction: column;
  min-width: 0;
  &__title,
  &__text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__text {
    color: var(--neutrals-500);
    font-size: 12px;
  }
}
</style>
