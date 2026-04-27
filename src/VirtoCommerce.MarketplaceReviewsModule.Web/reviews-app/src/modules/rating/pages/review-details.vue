<template>
  <VcBlade :loading="loading" :title="title" width="30%"
  >
    <template #actions>
      <Status :review-status="customerReview.reviewStatus" />
    </template>
    <VcContainer>
      <VcForm>
        <VcRow>
          <VcCol :size="2">
            <div class="tw-p-3">
              <VcLabel class="tw-mb-2">
                {{ $t("RATING.PAGES.DETAILS.FORM.CREATED_BY.LABEL") }}
              </VcLabel>
              {{ customerReview.createdBy }}
            </div>
          </VcCol>
          <VcCol :size="3">
            <div class="tw-p-3">
              <VcLabel class="tw-mb-2">
                {{ $t("RATING.PAGES.DETAILS.FORM.CREATED_DATE.LABEL") }}
              </VcLabel>
              {{ createdDate }}
            </div>
          </VcCol>
        </VcRow>
        <VcRow>
          <VcCol>
            <div class="tw-p-3">
              <VcLabel class="tw-mb-2">
                {{ $t("RATING.PAGES.DETAILS.FORM.TITLE.LABEL") }}
              </VcLabel>
              <template v-if="customerReview.title">
                {{ customerReview.title }}
              </template>
              <template v-else>
                {{ $t("RATING.PAGES.DETAILS.FORM.TITLE.PLACEHOLDER") }}
              </template>
            </div>
          </VcCol>
        </VcRow>
        <VcRow>
          <VcCol :size="2">
            <VcRating
              v-if="customerReview.rating"
              class="tw-p-3"
              :label="$t('RATING.PAGES.DETAILS.FORM.RATING.LABEL')"
              :placeholder="$t('RATING.PAGES.DETAILS.FORM.RATING.PLACEHOLDER')"
              :model-value="customerReview.rating"
            />
          </VcCol>
        </VcRow>
        <VcRow>
          <VcCol>
            <VcTextarea
              v-model="customerReview.review"
              class="tw-p-3"
              :label="$t('RATING.PAGES.DETAILS.FORM.REVIEW.LABEL')"
              :placeholder="$t('RATING.PAGES.DETAILS.FORM.REVIEW.PLACEHOLDER')"
              name="name"
              disabled
            />
          </VcCol>
        </VcRow>
      </VcForm>
    </VcContainer>
  </VcBlade>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { formatDateWithPattern, useBlade } from "@vc-shell/framework";
import { Status } from "../components";
import { useReview } from "../composables";
import { useI18n } from "vue-i18n";

import { VcBlade, VcCol, VcContainer, VcForm, VcLabel, VcRating, VcRow, VcTextarea } from "@vc-shell/framework/ui";

defineBlade({
  name: "ReviewDetails",
});

const { t } = useI18n({ useScope: "global" });
const { param } = useBlade();
const locale = window.navigator.language;

const { review: customerReview, loadReview, loading } = useReview();

const title = computed(() => customerReview.value?.title ?? t("RATING.PAGES.DETAILS.FORM.TITLE.PLACEHOLDER"));

const createdDate = computed(() => {
  const date = new Date(customerReview.value?.createdDate ?? "");
  return formatDateWithPattern(date, "L LT", locale);
});

onMounted(async () => {
  if (param.value) {
    await loadReview(param.value);
  }
});
</script>
