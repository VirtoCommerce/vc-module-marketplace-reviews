using System.Threading;
using System.Threading.Tasks;
using VirtoCommerce.CustomerModule.Core.Model;
using VirtoCommerce.CustomerReviews.Core.Models;
using VirtoCommerce.CustomerReviews.Core.Services;
using VirtoCommerce.MarketplaceVendorModule.Core.Common;

namespace VirtoCommerce.MarketplaceReviewsModule.Data.Queries.SearchCustomerReviews;

public class SearchCustomerReviewsQueryHandler : IQueryHandler<SearchCustomerReviewsQuery, SearchCustomerReviewsResult>
{
    private readonly ICustomerReviewSearchService _searchService;

    public SearchCustomerReviewsQueryHandler(ICustomerReviewSearchService searchService)
    {
        _searchService = searchService;
    }

    public virtual async Task<SearchCustomerReviewsResult> Handle(SearchCustomerReviewsQuery request, CancellationToken cancellationToken)
    {
        var searchCriteria = new CustomerReviewSearchCriteria
        {
            EntityIds = new[] { request.SellerId },
            EntityType = nameof(Organization),
            Keyword = request.Keyword,
            Skip = request.Skip,
            Take = request.Take,
            Sort = request.Sort
        };
        var searchResult = await _searchService.SearchAsync(searchCriteria);
        var result = new SearchCustomerReviewsResult
        {
            TotalCount = searchResult.TotalCount,
            Results = searchResult.Results
        };
        return result;
    }
}
