<template>
  <div class="tw-w-full tw-h-full tw-box-border tw-flex tw-flex-col tw-items-center tw-justify-center">
    <VcIcon
      icon="material-star"
      class="tw-text-[color:var(--secondary-500)]"
      size="xxxl"
    />
    <div class="tw-m-4 tw-text-xl tw-font-medium">
      {{ $t("RATING.PAGES.LIST.EMPTY.NO_ITEMS") }}
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Emits {
  (event: "add"): void;
}

defineEmits<Emits>();
</script>
