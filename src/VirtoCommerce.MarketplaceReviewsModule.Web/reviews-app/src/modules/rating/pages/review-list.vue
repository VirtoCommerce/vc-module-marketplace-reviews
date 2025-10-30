<template>
  <VcBlade
    :title="title"
    :toolbar-items="bladeToolbar"
    width="70%"
    :expanded="expanded"
    :closable="closable"
    @close="$emit('close:blade')"
    @expand="$emit('expand:blade')"
    @collapse="$emit('collapse:blade')"
  >
    <!-- @vue-generic {CustomerReview}-->
    <VcTable
      class="tw-w-full tw-h-full tw-box-border"
      :loading="loading"
      :expanded="expanded"
      :columns="tableColumns"
      :header="false"
      :items="reviews ?? []"
      :selected-item-id="selectedItemId"
      :sort="sortExpression"
      :pages="pages"
      :current-page="currentPage"
      :total-label="$t('RATING.REVIEW_TABLE.TOTALS')"
      :total-count="totalCount"
      :empty="empty"
      :notfound="notfound"
      :multiselect="false"
      state-key="review_table"
      :pull-to-reload="true"
      @header-click="onHeaderClick"
      @item-click="onItemClick"
      @pagination-click="onPaginationClick"
      @scroll:ptr="loadReviews"
    >
      <!-- Override rating column template -->
      <template #item_rating="itemData">
        <VcRating :model-value="itemData.item.rating ?? 0"></VcRating>
      </template>

      <!-- Override status column template -->
      <template #item_status="itemData">
        <Status :review-status="itemData.item.reviewStatus"></Status>
      </template>
    </VcTable>
  </VcBlade>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { IBladeToolbar, ITableColumns, useBladeNavigation, useTableSort } from "@vc-shell/framework";
import { CustomerReview } from "@vcmp-marketplace-reviews/api/marketplacereviews";
import { useReviews } from "../composables";
import { useI18n } from "vue-i18n";

export interface Props {
  expanded: boolean;
  closable: boolean;
  param?: string;
  options?: {
    review: CustomerReview;
  };
}

export interface Emits {
  (event: "close:blade"): void;
  (event: "collapse:blade"): void;
  (event: "expand:blade"): void;
}

defineOptions({
  url: "/reviews",
  name: "Reviews",
  isWorkspace: true,
  permissions: "seller:reviews:manage",
  menuItem: {
    title: "RATING.MENU.TITLE",
    icon: "material-star",
    priority: 5,
  },
});

const props = withDefaults(defineProps<Props>(), {
  expanded: true,
  closable: true,
});

defineEmits<Emits>();

const { openBlade, resolveBladeByName } = useBladeNavigation();

const { t } = useI18n({ useScope: "global" });

// Data

const { sortExpression, handleSortChange: tableSortHandler } = useTableSort({
  initialDirection: "DESC",
  initialProperty: "createdDate",
});

const { loading, reviews, totalCount, pages, currentPage, searchQuery, loadReviews } = useReviews({
  pageSize: 20,
  sort: sortExpression.value,
});

// Blade
const empty = {
  icon: "material-star",
  text: computed(() => t("RATING.PAGES.LIST.EMPTY.NO_ITEMS")),
};

const notfound = {
  icon: "material-star",
  text: computed(() => t("RATING.PAGES.LIST.NOT_FOUND.EMPTY")),
};

const title = t("RATING.PAGES.LIST.TITLE");

const selectedItemId = ref();

const tableColumns = ref<ITableColumns[]>([
  {
    id: "title",
    title: computed(() => t("RATING.PAGES.LIST.TABLE.HEADER.TITLE")),
    alwaysVisible: true,
    class: "tw-truncate",
  },
  {
    id: "review",
    title: computed(() => t("RATING.PAGES.LIST.TABLE.HEADER.REVIEW")),
    alwaysVisible: false,
    class: "tw-truncate",
  },
  {
    id: "rating",
    title: computed(() => t("RATING.PAGES.LIST.TABLE.HEADER.RATING")),
    alwaysVisible: true,
    sortable: true,
    width: 140,
  },
  {
    id: "status",
    field: "reviewStatus",
    title: computed(() => t("RATING.PAGES.LIST.TABLE.HEADER.STATUS")),
    alwaysVisible: true,
    width: 120,
  },
  {
    id: "createdDate",
    title: computed(() => t("RATING.PAGES.LIST.TABLE.HEADER.CREATEDDATE")),
    alwaysVisible: true,
    sortable: true,
    type: "date-ago",
    width: 120,
  },
  {
    id: "createdBy",
    title: computed(() => t("RATING.PAGES.LIST.TABLE.HEADER.CREATEDBY")),
    alwaysVisible: true,
    width: 140,
  },
]);

watch(
  () => props.param,
  async (newVal) => {
    if (newVal && props.options) {
      await onItemClick(props.options.review);
    }
  },
  { immediate: true },
);

const bladeToolbar = ref<IBladeToolbar[]>([
  {
    id: "refresh",
    title: computed(() => t("RATING.PAGES.LIST.TOOLBAR.REFRESH")),
    icon: "material-refresh",
    async clickHandler() {
      await loadReviews(searchQuery.value);
    },
  },
]);

async function onItemClick(item: CustomerReview) {
  await openBlade({
    blade: resolveBladeByName("ReviewDetails"),
    param: item.id,
    onOpen: () => {
      selectedItemId.value = item.id;
    },
    onClose: () => {
      selectedItemId.value = undefined;
    },
  });
}

const onHeaderClick = (item: ITableColumns) => {
  tableSortHandler(item.id);
};

const onPaginationClick = async (page: number) => {
  currentPage.value = page;
  await loadReviews(searchQuery.value);
};

onMounted(async () => {
  await loadReviews();
});

watch(
  () => sortExpression.value,
  async () => {
    await loadReviews(searchQuery.value);
  },
);

defineExpose({
  title,
});
</script>
