using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VirtoCommerce.MarketplaceReviewsModule.Data.Queries.GetSellerRating;
using VirtoCommerce.MarketplaceVendorModule.Core.Common;
using VirtoCommerce.MarketplaceVendorModule.Data.Authorization;

namespace VirtoCommerce.MarketplaceReviewsModule.Web.Controllers.Api;

[Route("api/vcmp/rating")]
[ApiController]
public class VcmpRatingController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IAuthorizationService _authorizationService;

    public VcmpRatingController(IMediator mediator, IAuthorizationService authorizationService)
    {
        _mediator = mediator;
        _authorizationService = authorizationService;
    }

    [HttpGet]
    [Route("")]
    public async Task<ActionResult<SellerRating>> GetCurrentSellerRating()
    {
        var query = ExType<GetSellerRatingQuery>.New();
        var authorizationResult = await _authorizationService.AuthorizeAsync(User, query,
            new SellerAuthorizationRequirement(Core.ModuleConstants.Security.Permissions.ManageSellerReviews));
        if (!authorizationResult.Succeeded)
        {
            return Unauthorized();
        }

        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpGet]
    [Route("{sellerId}")]
    public async Task<ActionResult<SellerRating>> GetSellerRatingById(string sellerId)
    {
        var query = ExType<GetSellerRatingQuery>.New();
        query.SellerId = sellerId;

        var authorizationResult = await _authorizationService.AuthorizeAsync(User, query,
            new SellerAuthorizationRequirement(Core.ModuleConstants.Security.Permissions.ManageSellerReviews));
        if (!authorizationResult.Succeeded)
        {
            return Unauthorized();
        }

        var result = await _mediator.Send(query);
        return Ok(result);
    }
}
