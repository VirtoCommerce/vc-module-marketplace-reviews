angular.module('virtoCommerce.marketplaceReviewsModule')
    .factory('virtoCommerce.marketplaceReviewsModule.webApi', ['$resource', function ($resource) {
        return $resource('api/vcmp', null, {
            // rating
            getRating: { method: 'GET', url: 'api/vcmp/rating' },
            getRatingBySellerId: { method: 'GET', url: 'api/vcmp/rating/:sellerId' },
            // reviews
            searchReviews: { method: 'POST', url: 'api/vcmp/reviews/search' },
        });
    }]);
