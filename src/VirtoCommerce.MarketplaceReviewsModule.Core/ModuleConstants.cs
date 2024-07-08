using System.Linq;
using VirtoCommerce.Platform.Core.Security;

namespace VirtoCommerce.MarketplaceReviewsModule.Core;

public static class ModuleConstants
{
    public static class Security
    {
        public static class Permissions
        {
            public const string AccessSellerReviews = "seller:reviews:access";

            public static string[] AllPermissions { get; } =
            {
                AccessSellerReviews,
            };
        }

        public static class Roles
        {
            public static readonly Role Operator = new()
            {
                Id = "vcmp-operator-role",
                Permissions = new[]
                {
                    Permissions.AccessSellerReviews
                }
                .Select(x => new Permission { GroupName = "Marketplace", Name = x })
                .ToList()
            };

            public static readonly Role VendorOwner = new()
            {
                Id = "vcmp-owner-role",
                Permissions = new[]
                {
                    Permissions.AccessSellerReviews
                }
                .Select(x => new Permission { GroupName = "Marketplace", Name = x })
                .ToList()
            };

            public static readonly Role VendorAdmin = new()
            {
                Id = "vcmp-admin-role",
                Permissions = new[]
                {
                    Permissions.AccessSellerReviews
                }
                .Select(x => new Permission { GroupName = "Marketplace", Name = x })
                .ToList()
            };

            public static readonly Role VendorAgent = new()
            {
                Id = "vcmp-agent-role",
                Permissions = new[]
                {
                    Permissions.AccessSellerReviews
                }
                .Select(x => new Permission { GroupName = "Marketplace", Name = x })
                .ToList()
            };

            public static Role[] AllRoles = { Operator, VendorOwner, VendorAdmin, VendorAgent };

        }
    }

}
