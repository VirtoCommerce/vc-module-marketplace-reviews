angular.module('virtoCommerce.marketplaceReviewsModule')
    .controller('virtoCommerce.marketplaceReviewsModule.sellerRatingWidgetController',
        ['$scope', 'VirtoCommerce.RatingApi', 'platformWebApp.bladeNavigationService',
            function ($scope, ratingApi, bladeNavigationService) {
                var blade = $scope.blade;
                var entityIds = [$scope.widget.blade.currentEntity.id];
                var entityType = 'Organization';

                function init() {
                    $scope.loading = false;
                    $scope.ratingRange = '0';
                    $scope.ratings = null;
                    $scope.reviewsCount = 0;
                }

                function refresh() {
                    $scope.loading = true;

                    var params = {
                        entityIds,
                        entityType
                    };

                    ratingApi.get(params, function (data) {
                        $scope.ratings = data;
                        $scope.ratingRange = getRating(data);
                        $scope.reviewsCount = getReviewsCount(data);
                        $scope.loading = false;
                    });
                }

                function getRating(ratings) {
                    let ratingValues = ratings.map(x => x.value);
                    if (ratingValues && ratingValues.length > 0) {
                        return ratingValues[0].toFixed(1);
                    }
                    return 0;
                }

                function getReviewsCount(ratings) {
                    let reviewsCounts = ratings.map(x => x.reviewCount);
                    if (reviewsCounts && reviewsCounts.length > 0) {
                        return reviewsCounts[0];
                    }
                    return 0;
                }

                $scope.openBlade = function () {
                    if ($scope.loading) return;

                    var newBlade = {
                        id: 'sellerReviewsList',
                        title: 'Customer review',
                        controller: 'VirtoCommerce.CustomerReviews.reviewsListController',
                        template: 'Modules/$(VirtoCommerce.CustomerReviews)/Scripts/blades/reviews-list.tpl.html',
                        filter: { entityIds, entityType }
                    };

                    bladeNavigationService.showBlade(newBlade, blade);

                };

                $scope.$watch("blade.currentEntity.id", function (id) {
                    if (id) refresh();
                });

                init();

            }
        ]);
