using Dapper.Contrib.Extensions;

namespace REC.Model
{
    [Table("SocialMedia")]
    public class SocialMedias
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        //[Computed]
        //public string Path { get; set; }
        public bool Active { get; set; }
        public string Credential { get; set; }
        public Enum.SocialMedia SocialMedia { get; set; }
        //[Computed]
        //public int? Status { get; set; }
    }
}
