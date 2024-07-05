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
    }

    //public static class Settings
    //{
    //    public static class General
    //    {
    //        public static SettingDescriptor MarketplaceReviewsModuleEnabled { get; } = new()
    //        {
    //            Name = "MarketplaceReviewsModule.MarketplaceReviewsModuleEnabled",
    //            GroupName = "MarketplaceReviewsModule|General",
    //            ValueType = SettingValueType.Boolean,
    //            DefaultValue = false,
    //        };

    //        public static IEnumerable<SettingDescriptor> AllGeneralSettings
    //        {
    //            get
    //            {
    //                yield return MarketplaceReviewsModuleEnabled;
    //            }
    //        }
    //    }

    //    public static IEnumerable<SettingDescriptor> AllSettings
    //    {
    //        get
    //        {
    //            return General.AllGeneralSettings;
    //        }
    //    }
    //}
}
