using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VirtoCommerce.MarketplaceReviewsModule.Data.Queries.SearchCustomerReviews;
using VirtoCommerce.MarketplaceVendorModule.Data.Authorization;

namespace VirtoCommerce.MarketplaceReviewsModule.Web.Controllers.Api;

[Route("api/vcmp/reviews")]
[ApiController]
public class VcmpReviewsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IAuthorizationService _authorizationService;

    public VcmpReviewsController(IMediator mediator, IAuthorizationService authorizationService)
    {
        _mediator = mediator;
        _authorizationService = authorizationService;
    }

    [HttpPost("search")]
    public async Task<ActionResult<SearchCustomerReviewsResult>> SearchCustomerReviews([FromBody] SearchCustomerReviewsQuery query)
    {
        var authorizationResult = await _authorizationService.AuthorizeAsync(User, query,
            new SellerAuthorizationRequirement(Core.ModuleConstants.Security.Permissions.AccessSellerReviews));
        if (!authorizationResult.Succeeded)
        {
            return Unauthorized();
        }
        var result = await _mediator.Send(query);
        return Ok(result);
    }
}
