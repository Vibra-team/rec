using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;

namespace REC.Model
{
    [Table("Campaign")]
    public class Campaign
    {
        [Key]
        public int Id { get; set; }

        public int IdChannel { get; set; }

        public string Name { get; set; }

        public string Author { get; set; }

        public bool Active { get; set; }

        public string Logo { get; set; }

        public string Thumbnail { get; set; }

        public DateTime CreatedAt { get; set; }

        [Computed]
        public List<CampaignSocialMedia> SocialMedias { get; set; } = new List<CampaignSocialMedia>();
    }
}
