<template>
  <VcRating
    :model-value="context?.item?.rating ?? 0"
    class="tw-flex"
  ></VcRating>
</template>

<script lang="ts" setup>
import { CustomerReview } from "@vcmp-marketplace-reviews/api/marketplacereviews";

export interface Props {
  context: {
    item: CustomerReview;
  };
}

defineProps<Props>();
</script>

<style lang="scss" scoped></style>
