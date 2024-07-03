// Call this to register your module to main application
var moduleName = 'virtoCommerce.marketplaceReviewsModule';

if (AppDependencies !== undefined) {
    AppDependencies.push(moduleName);
}

angular.module(moduleName, [])
    //.config(['$stateProvider',
    //    function ($stateProvider) {
    //        $stateProvider
    //            .state('workspace.MarketplaceReviewsModuleState', {
    //                url: '/MarketplaceReviewsModule',
    //                templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
    //                controller: [
    //                    'platformWebApp.bladeNavigationService',
    //                    function (bladeNavigationService) {
    //                        var newBlade = {
    //                            id: 'blade1',
    //                            controller: 'MarketplaceReviewsModule.helloWorldController',
    //                            template: 'Modules/$(VirtoCommerce.MarketplaceReviewsModule)/Scripts/blades/hello-world.html',
    //                            isClosingDisabled: true,
    //                        };
    //                        bladeNavigationService.showBlade(newBlade);
    //                    }
    //                ]
    //            });
    //    }
    //])
    .run(['platformWebApp.mainMenuService', '$state', 'platformWebApp.widgetService',
        function (mainMenuService, $state, widgetService) {
        //    //Register module in main menu
        //    var menuItem = {
        //        path: 'browse/MarketplaceReviewsModule',
        //        icon: 'fa fa-cube',
        //        title: 'MarketplaceReviewsModule',
        //        priority: 100,
        //        action: function () { $state.go('workspace.MarketplaceReviewsModuleState'); },
        //        permission: 'MarketplaceReviewsModule:access',
        //    };
            //    mainMenuService.addMenuItem(menuItem);

            // Seller details: seller rating widget
            var sellerRatingWidget = {
                controller: 'virtoCommerce.marketplaceReviewsModule.sellerRatingWidgetController',
                template: 'Modules/$(VirtoCommerce.MarketplaceReviews)/Scripts/widgets/seller-rating-widget.tpl.html'
            };
            widgetService.registerWidget(sellerRatingWidget, 'sellerDetails');

        }
    ]);
