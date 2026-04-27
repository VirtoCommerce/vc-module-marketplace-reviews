# Migration Report: 2.0.0-alpha.28 → 2.0.1

Generated: 2026-04-27

## Automated Changes (12 files)

- ✅ **use-blade-migration** — 1 file(s)
- ✅ **responsive-composable** — 1 file(s)
- ✅ **remove-global-components** — 6 file(s)
- ✅ **vc-blade-loading-prop** — 1 file(s)
- ✅ **remove-pathmatch-route** — 1 file(s)
- ✅ **blade-props-simplification** — 2 file(s)

## Manual Migration Required

### ✅ shims-to-globals

- /Users/symbot/DEV/vc-module-marketplace-reviews-1/src/VirtoCommerce.MarketplaceReviewsModule.Web/reviews-app/tsconfig.json: already has @vc-shell/framework/globals in types (no action needed — informational warning).

### ✅ Manual Migration Audit Findings

The audit found patterns that are not safely auto-rewritable (e.g., `useExternalWidgets`, `moment`, `useFunctions`, direct `closeBlade()`). These require targeted manual refactors before final type-check/build.

**Affected files:**

- `src/modules/rating/pages/review-details.vue`

```ts
// useFunctions() removed:
// OLD:
const { debounce } = useFunctions();
const debounced = debounce(search, 300);

// NEW:
import { useDebounceFn } from "@vueuse/core";
const debounced = useDebounceFn(search, 300);
```

> See: [migration/03-moment-to-datefns.md](migration/03-moment-to-datefns.md)

### ✅ use-data-table-pagination-audit

- /Users/symbot/DEV/vc-module-marketplace-reviews-1/src/VirtoCommerce.MarketplaceReviewsModule.Web/reviews-app/src/modules/rating/pages/review-list.vue: Uses manual onPaginationClick — delete it and bind @pagination-click="pagination.goToPage". See migration guide: useDataTablePagination.

## Completed by AI

- **manual-migration-audit** — replaced `moment(date).locale(locale).format("L LT")` with `formatDateWithPattern(date, "L LT", locale)` in `src/modules/rating/pages/review-details.vue`. Commit: `1c44389`.
- **use-data-table-pagination-audit** — switched `review-list.vue` to bind `@pagination-click="pagination.goToPage"` and updated `useReviews` composable to expose `pagination` from `useDataTablePagination`. Commits: `5e55cf3`.
- **post-migration type fixes** —
  - `src/main.ts`: removed `platformUrl` (no longer in `FrameworkInstallArgs`; framework reads `import.meta.env.APP_PLATFORM_URL` directly); cast `i18n.locale`/`fallbackLocale` env vars to `string`.
  - `src/modules/rating/components/Status.vue`: renamed type usage `CustomerReviewReviewStatus` → `CustomerReviewStatus` (consequence of the `nswag-class-to-interface` transform that canonicalised type names).
- **API clients** regenerated with `--APP_TYPE_STYLE=Interface` to enable clone-then-mutate DTO pattern.

## Dependencies Updated

- @vc-shell/config-generator: ^2.0.0-alpha.28 → ^2.0.1
- @vc-shell/framework: ^2.0.0-alpha.28 → ^2.0.1
- @vc-shell/mf-module: ^2.0.0-alpha.28 → ^2.0.1
- @vc-shell/api-client-generator: ^2.0.0-alpha.28 → ^2.0.1
- @vc-shell/ts-config: ^2.0.0-alpha.28 → ^2.0.1
- vue: ^3.5.13 → ^3.5.30
- vue-router: ^4.2.5 → ^5.0.3
- @commitlint/cli: ^18.4.3 → ^20.4.1
- @commitlint/config-conventional: ^18.4.3 → ^20.4.1
- @vue/eslint-config-prettier: ^9.0.0 → ^10.2.0
- @vue/eslint-config-typescript: ^13.0.0 → ^14.6.0
- eslint: ^8.57.0 → ^9.35.0
- eslint-plugin-vue: ^9.19.2 → ^10.4.0
- vite-plugin-checker: ^0.9.1 → ^0.13.0
- vue-tsc: ^2.2.10 → ^3.2.5

## Not Covered by Migrator

_These migration guides may be relevant — check manually:_

- **03-moment-to-datefns** — moment.js → date-fns migration
  Check: `grep -rn "moment" src/`

<details>
<summary>Transform Log (5 entries)</summary>

- Registry: 5 DTO classes, 5 interface→class mappings, package: @vcmp-marketplace-reviews/api
- Found 22 consumer files to scan.
- src/modules/rating/composables/useReview/index.ts: modified
- src/modules/rating/composables/useReviews/index.ts: modified
- Done. 2 file(s) modified out of 22 scanned.

</details>
