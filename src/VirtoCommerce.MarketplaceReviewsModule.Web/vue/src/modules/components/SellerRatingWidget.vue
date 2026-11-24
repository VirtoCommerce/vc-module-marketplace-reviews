<template>
  <!-- legacy seller-rating-widget on the seller blade ("sellerDetails"): the seller's average rating and review count;
       opens the seller's reviews -->
  <VcWidget
    v-if="hasAccess(CUSTOMER_REVIEW_RATING_READ)"
    icon="lucide-star"
    :title="$t('MARKETPLACE_REVIEWS.WIDGET.TITLE', reviewCount)"
    :value="loading ? '...' : rating"
    :disabled="!seller?.id || !hasAccess(CUSTOMER_REVIEW_READ)"
    @click="open"
  />
</template>

<script setup lang="ts">
import { injectBladeContext, useBlade, usePermissions } from "@vc-shell/framework";
import { VcWidget } from "@vc-shell/framework/ui";
import { computed, ref, watch } from "vue";
import { api } from "../api";
import {
  CUSTOMER_REVIEW_RATING_READ,
  CUSTOMER_REVIEW_READ,
  SELLER_ENTITY_TYPE,
  type SellerReviewsOptions,
} from "../types";

// the seller shared by the host blade via defineBladeContext({ item })
const ctx = injectBladeContext();
const seller = computed(() => ctx.value.item as { id?: string; name?: string } | undefined);
const { openBlade } = useBlade();
const { hasAccess } = usePermissions();

const loading = ref(false);
const rating = ref<string>();
const reviewCount = ref(0);

async function load(sellerId?: string) {
  rating.value = undefined;
  reviewCount.value = 0;
  if (!sellerId || !hasAccess(CUSTOMER_REVIEW_RATING_READ)) return;
  loading.value = true;
  try {
    // one entry per store; the legacy widget showed the first one
    const [first] = await api.rating.getEntityRating({ entityIds: [sellerId], entityType: SELLER_ENTITY_TYPE });
    if (first?.reviewCount) {
      rating.value = (first.value ?? 0).toFixed(1);
      reviewCount.value = first.reviewCount;
    }
  } finally {
    loading.value = false;
  }
}
watch(() => seller.value?.id, load, { immediate: true });

function open() {
  if (!seller.value?.id) return;
  const options: SellerReviewsOptions = { sellerId: seller.value.id, sellerName: seller.value.name };
  openBlade({ name: "MarketplaceReviewsSellerReviews", options });
}
</script>
