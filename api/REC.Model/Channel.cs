using Dapper.Contrib.Extensions;
using REC.Model.Enum;

namespace REC.Model
{
    [Table("Channel")]
    public class Channel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string Folder { get; set; }
        public bool Active { get; set; }
        public string Image { get; set; }
        public ChannelType ChannelType { get; set; }
    }
}
