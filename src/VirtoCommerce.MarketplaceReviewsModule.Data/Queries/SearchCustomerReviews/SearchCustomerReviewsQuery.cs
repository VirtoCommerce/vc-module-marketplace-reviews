using VirtoCommerce.MarketplaceVendorModule.Core.Common;
using VirtoCommerce.MarketplaceVendorModule.Core.Domains;
using VirtoCommerce.Platform.Core.Common;

namespace VirtoCommerce.MarketplaceReviewsModule.Data.Queries.SearchCustomerReviews;

public class SearchCustomerReviewsQuery : SearchCriteriaBase, IQuery<SearchCustomerReviewsResult>, IHasSellerId
{
    public string SellerId { get; set; }

    public string SellerName { get; set; }
}
