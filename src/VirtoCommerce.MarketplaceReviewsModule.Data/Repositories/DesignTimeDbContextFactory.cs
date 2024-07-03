using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace VirtoCommerce.MarketplaceReviewsModule.Data.Repositories;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<MarketplaceReviewsModuleDbContext>
{
    public MarketplaceReviewsModuleDbContext CreateDbContext(string[] args)
    {
        var builder = new DbContextOptionsBuilder<MarketplaceReviewsModuleDbContext>();
        var connectionString = args.Length != 0 ? args[0] : "Server=(local);User=virto;Password=virto;Database=VirtoCommerce3;";

        builder.UseSqlServer(
            connectionString,
            options => options.MigrationsAssembly(GetType().Assembly.GetName().Name));

        return new MarketplaceReviewsModuleDbContext(builder.Options);
    }
}
