<template>
  <DashboardWidgetCard
    :header="$t('RATING.WIDGET.TITLE')"
    icon="material-star"
    :loading="loading"
  >
    <template
      v-if="$isDesktop.value"
      #actions
    >
      <div class="vc-rating-widget__actions">
        <Rating
          class="vc-rating-widget__rating"
          variant="star-and-text"
        ></Rating>
        <vc-button
          size="sm"
          variant="ghost"
          @click="() => onItemClick()"
        >
          {{ $t("RATING.WIDGET.ALL") }} &rarr;
        </vc-button>
      </div>
    </template>

    <template #content>
      <!-- @vue-generic {CustomerReview} -->
      <VcTable
        :items="reviews"
        :columns="tableColumns"
        :header="false"
        :footer="false"
        :reorderable-columns="false"
        :resizable-columns="false"
        state-key="reviews-dashboard-card"
        @item-click="onItemClick"
      />
    </template>
  </DashboardWidgetCard>
</template>

<script setup lang="ts">
import { ITableColumns, useBladeNavigation, DashboardWidgetCard } from "@vc-shell/framework";
import Rating from "./Rating.vue";
import { CustomerReview } from "@vcmp-marketplace-reviews/api/marketplacereviews";
import { useReviews } from "../composables";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { openBlade, resolveBladeByName } = useBladeNavigation();
const { t } = useI18n({ useScope: "global" });

const { loading, reviews, loadReviews } = useReviews({
  pageSize: 5,
});

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

async function onItemClick(args?: CustomerReview) {
  await openBlade(
    {
      blade: resolveBladeByName("Reviews"),
      param: args?.id,
    },
    true,
  );

  if (args?.id) {
    await openBlade({
      blade: resolveBladeByName("ReviewDetails"),
      param: args?.id,
    });
  }
}

onMounted(async () => {
  await loadReviews({
    take: 5,
  });
});
</script>

<style lang="scss">
.vc-rating-widget {
  &__actions {
    @apply tw-flex tw-items-center;
  }

  &__rating {
    @apply tw-mr-5 tw-text-lg tw-font-medium;
  }

  &__mobile {
    @apply tw-flex tw-flex-auto tw-flex-col;
  }

  &__empty-message {
    @apply tw-text-center tw-m-4 tw-font-medium tw-text-[26px] tw-text-[color:var(--secondary-500)];
  }
}
</style>
