using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using VirtoCommerce.CustomerModule.Core.Model;
using VirtoCommerce.CustomerReviews.Core.Services;
using VirtoCommerce.MarketplaceReviewsModule.Core.Models;
using VirtoCommerce.MarketplaceVendorModule.Core.Common;

namespace VirtoCommerce.MarketplaceReviewsModule.Data.Queries.GetSellerRating;

public class GetSellerRatingQueryHandler : IQueryHandler<GetSellerRatingQuery, SellerRating>
{
    private readonly IRatingService _ratingService;

    public GetSellerRatingQueryHandler(IRatingService ratingService)
    {
        _ratingService = ratingService;
    }

    public virtual async Task<SellerRating> Handle(GetSellerRatingQuery request, CancellationToken cancellationToken)
    {
        var ratings = await _ratingService.GetRatingsAsync([request.SellerId], nameof(Organization));
        var rating = ratings.FirstOrDefault();
        SellerRating result = null;
        if (rating != null)
        {
            result = new SellerRating
            {
                Rating = rating.Value,
                ReviewCount = rating.ReviewCount,
            };
        }

        return result;
    }
}
