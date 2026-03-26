<template>
  <VcBlade
    :title="title"
    :toolbar-items="bladeToolbar"
    width="70%"
  >
    <VcDataTable
      v-model:active-item-id="selectedItemId"
      v-model:sort-field="sortField"
      v-model:sort-order="sortOrder"
      class="tw-w-full tw-h-full tw-box-border"
      :loading="loading"
      :items="reviews ?? []"
      :total-count="totalCount"
      :pagination="{ currentPage, pages }"
      :total-label="$t('RATING.REVIEW_TABLE.TOTALS')"
      :pull-to-refresh="true"
      :empty-state="{
        icon: 'lucide-star',
        title: $t('RATING.PAGES.LIST.EMPTY.NO_ITEMS'),
      }"
      :not-found-state="{
        icon: 'lucide-star',
        title: $t('RATING.PAGES.LIST.NOT_FOUND.EMPTY'),
      }"
      state-key="review_table"
      @row-click="onItemClick"
      @pagination-click="onPaginationClick"
      @pull-refresh="loadReviews"
    >
      <VcColumn
        id="title"
        :title="t('RATING.PAGES.LIST.TABLE.HEADER.TITLE')"
        :always-visible="true"
        class="tw-truncate"
      />

      <VcColumn
        id="review"
        :title="t('RATING.PAGES.LIST.TABLE.HEADER.REVIEW')"
        class="tw-truncate"
      />

      <VcColumn
        id="rating"
        :title="t('RATING.PAGES.LIST.TABLE.HEADER.RATING')"
        :always-visible="true"
        :sortable="true"
        :width="140"
      >
        <template #body="{ data }">
          <VcRating :model-value="data.rating ?? 0" />
        </template>
      </VcColumn>

      <VcColumn
        id="status"
        field="reviewStatus"
        :title="t('RATING.PAGES.LIST.TABLE.HEADER.STATUS')"
        :always-visible="true"
        :width="120"
      >
        <template #body="{ data }">
          <Status :review-status="data.reviewStatus" />
        </template>
      </VcColumn>

      <VcColumn
        id="createdDate"
        :title="t('RATING.PAGES.LIST.TABLE.HEADER.CREATEDDATE')"
        :always-visible="true"
        :sortable="true"
        type="date-ago"
        :width="120"
      />

      <VcColumn
        id="createdBy"
        :title="t('RATING.PAGES.LIST.TABLE.HEADER.CREATEDBY')"
        :always-visible="true"
        :width="140"
      />
    </VcDataTable>
  </VcBlade>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { IBladeToolbar, useBlade, useDataTableSort } from "@vc-shell/framework";
import { CustomerReview } from "@vcmp-marketplace-reviews/api/marketplacereviews";
import { useReviews } from "../composables";
import { Status } from "../components";
import { useI18n } from "vue-i18n";

defineBlade({
  url: "/reviews",
  name: "Reviews",
  isWorkspace: true,
  permissions: "seller:reviews:manage",
  menuItem: {
    title: "RATING.MENU.TITLE",
    icon: "lucide-star",
    priority: 5,
  },
});

const { t } = useI18n({ useScope: "global" });
const { param, options, openBlade } = useBlade<{ review: CustomerReview }>();

const { sortField, sortOrder, sortExpression } = useDataTableSort({
  initialField: "createdDate",
  initialDirection: "DESC",
});

const { loading, reviews, totalCount, pages, currentPage, searchQuery, loadReviews } = useReviews({
  pageSize: 20,
  sort: sortExpression.value,
});

const title = t("RATING.PAGES.LIST.TITLE");
const selectedItemId = ref<string>();

const bladeToolbar = ref<IBladeToolbar[]>([
  {
    id: "refresh",
    title: t("RATING.PAGES.LIST.TOOLBAR.REFRESH"),
    icon: "lucide-refresh-cw",
    async clickHandler() {
      await loadReviews(searchQuery.value);
    },
  },
]);

watch(
  () => param.value,
  async (newVal) => {
    if (newVal && options.value) {
      await onItemClick({ data: options.value.review });
    }
  },
  { immediate: true },
);

watch(sortExpression, async () => {
  await loadReviews(searchQuery.value);
});

async function onItemClick(event: { data: CustomerReview }) {
  const item = event.data;
  await openBlade({
    name: "ReviewDetails",
    param: item.id,
    onOpen() {
      selectedItemId.value = item.id;
    },
    onClose() {
      selectedItemId.value = undefined;
    },
  });
}

async function onPaginationClick(page: number) {
  await loadReviews({
    ...searchQuery.value,
    skip: (page - 1) * (searchQuery.value.take ?? 20),
  });
}

onMounted(async () => {
  await loadReviews();
});
</script>
