using VirtoCommerce.MarketplaceVendorModule.Core.Common;
using VirtoCommerce.MarketplaceVendorModule.Core.Domains;

namespace VirtoCommerce.MarketplaceReviewsModule.Data.Queries.GetSellerRating;

public class GetSellerRatingQuery : IQuery<SellerRating>, IHasSellerId
{
    public string SellerId { get; set; }

    public string SellerName { get; set; }
}

