<template>
  <VcStatus
    v-if="reviewStatus"
    :variant="status"
    :outline="false"
  >
    {{ reviewStatus ?? "" }}
  </VcStatus>
</template>

<script lang="ts" setup>
import { VcStatus } from "@vc-shell/framework/ui";
import { computed } from "vue";
import { CustomerReviewStatus } from "@vcmp-marketplace-reviews/api/marketplacereviews";

export interface Props {
  reviewStatus: CustomerReviewStatus;
}

const props = defineProps<Props>();

const status = computed(() => {
  let status = undefined;
  switch (props.reviewStatus) {
    case CustomerReviewStatus.New:
      status = "warning" as const;
      break;
    case CustomerReviewStatus.Approved:
      status = "success" as const;
      break;
    case CustomerReviewStatus.Rejected:
      status = "danger" as const;
      break;
  }
  return status;
});
</script>
