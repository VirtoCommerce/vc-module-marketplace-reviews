<template>
  <VcCard
    :header="$t('RATING.WIDGET.TITLE')"
    icon="material-star"
    :fill="true"
  >
    <template
      v-if="$isDesktop.value"
      #actions
    >
      <div class="vc-rating-widget__actions">
        <div class="vc-rating-widget__title">
          <Rating
            class="vc-rating-widget__rating"
            :variant="'star-and-text'"
          ></Rating>
        </div>
        <vc-button
          small
          outline
          @click="() => onItemClick()"
        >
          {{ $t("RATING.WIDGET.ALL") }}
        </vc-button>
      </div>
    </template>
    <Reviews
      :is-widget-view="true"
      @item-click="onItemClick"
      @add="addItem"
    >
      <template #widget-mobile="{ loading }">
        <div
          v-loading:100="loading"
          class="vc-rating-widget__mobile"
          @click="() => onItemClick()"
        >
          <div class="vc-rating-widget__divider"></div>
          <div class="vc-rating-widget__empty-message">
            <Rating :variant="'text'">
              {{ $t("RATING.WIDGET.EMPTY") }}
            </Rating>
          </div>
        </div>
      </template>
    </Reviews>
  </VcCard>
</template>

<script setup lang="ts">
import { useBladeNavigation } from "@vc-shell/framework";
import Rating from "./Rating.vue";

const { openBlade, resolveBladeByName } = useBladeNavigation();

async function onItemClick(args?: { param: string }) {
  await openBlade(
    {
      blade: resolveBladeByName("Reviews"),
      param: args?.param,
    },
    true,
  );

  if (args?.param) {
    await openBlade({
      blade: resolveBladeByName("ReviewDetails"),
      param: args?.param,
    });
  }
}

async function addItem() {
  await openBlade(
    {
      blade: resolveBladeByName("Reviews"),
    },
    true,
  );
  await openBlade({
    blade: resolveBladeByName("ReviewDetails"),
  });
}
</script>
<style lang="scss">
.vc-rating-widget {
  &__actions {
    @apply tw-flex tw-items-center;
  }

  &__rating {
    @apply tw-mr-5;
  }

  &__mobile {
    @apply tw-flex tw-flex-auto tw-flex-col;
  }

  &__divider {
    @apply tw-h-px tw-w-full tw-bg-[--base-border-color];
  }

  &__empty-message {
    @apply tw-text-center tw-m-4 tw-font-medium tw-text-[26px] tw-text-[color:var(--mobile-card-count-color)];
  }
}
</style>
