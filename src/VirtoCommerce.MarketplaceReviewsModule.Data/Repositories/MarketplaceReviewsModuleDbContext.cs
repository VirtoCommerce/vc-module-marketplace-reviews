using Microsoft.EntityFrameworkCore;
using VirtoCommerce.Platform.Data.Infrastructure;

namespace VirtoCommerce.MarketplaceReviewsModule.Data.Repositories;

public class MarketplaceReviewsModuleDbContext : DbContextBase
{
    public MarketplaceReviewsModuleDbContext(DbContextOptions<MarketplaceReviewsModuleDbContext> options)
        : base(options)
    {
    }

    protected MarketplaceReviewsModuleDbContext(DbContextOptions options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //modelBuilder.Entity<MarketplaceReviewsModuleEntity>().ToTable("MarketplaceReviewsModule").HasKey(x => x.Id);
        //modelBuilder.Entity<MarketplaceReviewsModuleEntity>().Property(x => x.Id).HasMaxLength(128).ValueGeneratedOnAdd();
    }
}
