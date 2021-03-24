using Dapper.Contrib.Extensions;

namespace REC.Model
{
    [Table("ClipSocialMedia")]
    public class ClipSocialMedia
    {
        public int IdClip { get; set; }

        public int IdSocialMedia { get; set; }

        [Computed]
        public int SocialMedia { get; set; }

        public bool Monetize { get; set; }

        public string Link { get; set; }

        public int Status { get; set; }
    }
}
