using Dapper.Contrib.Extensions;

namespace REC.Model
{
    [Table("CampaignSocialMedia")]
    public class CampaignSocialMedia
    {
        public int IdCampaign { get; set; }

        public int IdSocialMedia { get; set; }

        [Computed]
        public int SocialMedia { get; set; }
    }
}
