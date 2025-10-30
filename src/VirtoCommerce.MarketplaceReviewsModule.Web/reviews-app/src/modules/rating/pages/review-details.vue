<template>
  <VcBlade
    v-loading="loading"
    :title="title"
    width="30%"
    :expanded="expanded"
    :closable="closable"
    @close="$emit('close:blade')"
    @expand="$emit('expand:blade')"
    @collapse="$emit('collapse:blade')"
  >
    <template #actions>
      <Status :review-status="customerReview.reviewStatus"></Status>
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
            >
            </VcRating>
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
            >
            </VcTextarea>
          </VcCol>
        </VcRow>
      </VcForm>
    </VcContainer>
  </VcBlade>
</template>

<script lang="ts" setup>
import moment from "moment";
import { computed, onMounted } from "vue";
import { Status } from "../components";
import { useReview } from "../composables";
import { useI18n } from "vue-i18n";

// Page

export interface Props {
  expanded: boolean;
  closable: boolean;
  param?: string;
}

export interface Emits {
  (event: "close:blade"): void;
  (event: "collapse:blade"): void;
  (event: "expand:blade"): void;
}

const props = withDefaults(defineProps<Props>(), {
  expanded: true,
  closable: true,
});

defineEmits<Emits>();

defineOptions({
  name: "ReviewDetails",
});

const { t } = useI18n({ useScope: "global" });
const locale = window.navigator.language;

// Data
const { review: customerReview, loadReview, loading } = useReview();

// Blade
const title = computed(() => customerReview.value?.title ?? t("RATING.PAGES.DETAILS.FORM.TITLE.PLACEHOLDER"));

const createdDate = computed(() => {
  const date = new Date(customerReview.value?.createdDate ?? "");
  return moment(date).locale(locale).format("L LT");
});

onMounted(async () => {
  if (props.param) {
    await loadReview(props.param);
  }
});

defineExpose({
  title,
});
</script>
