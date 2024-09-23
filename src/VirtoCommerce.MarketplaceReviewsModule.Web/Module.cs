using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using VirtoCommerce.MarketplaceReviewsModule.Data.Repositories;
using VirtoCommerce.MarketplaceReviewsModule.Web.Authorization;
using VirtoCommerce.Platform.Core.Modularity;

namespace VirtoCommerce.MarketplaceReviewsModule.Web;

public class Module : IModule, IHasConfiguration
{
    public ManifestModuleInfo ModuleInfo { get; set; }
    public IConfiguration Configuration { get; set; }

    public void Initialize(IServiceCollection serviceCollection)
    {
        // Initialize database
        var connectionString = Configuration.GetConnectionString(ModuleInfo.Id) ??
                               Configuration.GetConnectionString("VirtoCommerce");

        serviceCollection.AddDbContext<MarketplaceReviewsModuleDbContext>(options => options.UseSqlServer(connectionString));

        serviceCollection.AddMediatR(typeof(Data.Anchor));
    }

    public void PostInitialize(IApplicationBuilder appBuilder)
    {
        var serviceProvider = appBuilder.ApplicationServices;

        //Register module authorization
        appBuilder.UseModuleAuthorization();

        // Apply migrations. Not need in this module
        //using var serviceScope = serviceProvider.CreateScope();
        //using var dbContext = serviceScope.ServiceProvider.GetRequiredService<MarketplaceReviewsModuleDbContext>();
        //dbContext.Database.Migrate();
    }

    public void Uninstall()
    {
        // Nothing to do here
    }
}
