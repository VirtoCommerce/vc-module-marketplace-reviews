using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using VirtoCommerce.Platform.Core.Security;
using ReviewsModule = VirtoCommerce.MarketplaceReviewsModule.Core;
using VendorModule = VirtoCommerce.MarketplaceVendorModule.Core;

namespace VirtoCommerce.MarketplaceReviewsModule.Web.Authorization
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseModuleAuthorization(this IApplicationBuilder appBuilder)
        {
            using var serviceScope = appBuilder.ApplicationServices.CreateScope();

            var permissionsProvider = appBuilder.ApplicationServices.GetRequiredService<IPermissionsRegistrar>();
            permissionsProvider.RegisterPermissions(ReviewsModule.ModuleConstants.Security.Permissions.AllPermissions.Select(x => new Permission { GroupName = "Marketplace", Name = x }).ToArray());

            var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
            SavePredefinedRolesAsync(roleManager).GetAwaiter().GetResult();

            return appBuilder;
        }

        private static async Task SavePredefinedRolesAsync(RoleManager<Role> roleManager)
        {
            foreach (var vendorModuleRole in VendorModule.ModuleConstants.Security.Roles.AllRoles)
            {
                var existingVendorModuleRole = await roleManager.FindByIdAsync(vendorModuleRole.Id);
                var reviewsModuleRole = ReviewsModule.ModuleConstants.Security.Roles.AllRoles.Where(x => x.Id == vendorModuleRole.Id).FirstOrDefault();

                if (existingVendorModuleRole != null)
                {
                    vendorModuleRole.Permissions = existingVendorModuleRole.Permissions.Concat(vendorModuleRole.Permissions).Distinct().ToList();
                    if (reviewsModuleRole != null)
                    {
                        vendorModuleRole.Permissions = vendorModuleRole.Permissions.Concat(reviewsModuleRole.Permissions).Distinct().ToList();
                    }
                    await roleManager.UpdateAsync(vendorModuleRole);
                }
                else
                {
                    if (reviewsModuleRole != null)
                    {
                        vendorModuleRole.Permissions = vendorModuleRole.Permissions.Concat(reviewsModuleRole.Permissions).Distinct().ToList();
                    }
                    await roleManager.CreateAsync(vendorModuleRole);
                }
            }
        }
    }
}
