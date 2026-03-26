<template>
  <DashboardWidgetCard
    :header="$t('RATING.WIDGET.TITLE')"
    icon="lucide-star"
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
        />
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
      <VcDataTable
        :items="reviews"
        :total-count="reviews?.length || 0"
        :resizable-columns="false"
        :reorderable-columns="false"
        state-key="reviews-dashboard-card"
        @row-click="onRowClick"
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
          :width="140"
        />

        <VcColumn
          id="status"
          field="reviewStatus"
          :title="t('RATING.PAGES.LIST.TABLE.HEADER.STATUS')"
          :always-visible="true"
          :width="120"
        />

        <VcColumn
          id="createdDate"
          :title="t('RATING.PAGES.LIST.TABLE.HEADER.CREATEDDATE')"
          :always-visible="true"
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
    </template>
  </DashboardWidgetCard>
</template>

<script setup lang="ts">
import { useBlade, DashboardWidgetCard } from "@vc-shell/framework";
import Rating from "./Rating.vue";
import { CustomerReview } from "@vcmp-marketplace-reviews/api/marketplacereviews";
import { useReviews } from "../composables";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { openBlade } = useBlade();
const { t } = useI18n({ useScope: "global" });

const { loading, reviews, loadReviews } = useReviews({
  pageSize: 5,
});

function onRowClick(event: { data: CustomerReview }) {
  onItemClick(event.data);
}

async function onItemClick(args?: CustomerReview) {
  await openBlade({ name: "Reviews", param: args?.id });

  if (args?.id) {
    await openBlade({ name: "ReviewDetails", param: args.id });
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
