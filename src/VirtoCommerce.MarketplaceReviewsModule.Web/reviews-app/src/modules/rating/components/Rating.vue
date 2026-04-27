<template>
  <div
    v-loading="loading"
    class="tw-relative"
  >
    <VcRating
      v-if="rating"
      :model-value="rating"
      :variant="variant"
    >
      <template #details>
        <span class="tw-text-sm">{{ $t("RATING.RATING.REVIEWS", { count: reviewCount }) }} </span>
      </template>
    </VcRating>
    <span
      v-else
      class="tw-text-sm"
      >{{ $t("RATING.RATING.EMPTY") }}</span
    >
  </div>
</template>

<script lang="ts" setup>
import { VcRating, vLoading } from "@vc-shell/framework/ui";
import { onMounted } from "vue";
import { useRating } from "../composables";

export interface Props {
  variant?: InstanceType<typeof VcRating>["variant"];
}

withDefaults(defineProps<Props>(), { variant: "star-and-text" });

onMounted(async () => {
  await getRating();
});

const { loading, rating, reviewCount, getRating } = useRating();
</script>
