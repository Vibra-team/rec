using Dapper.Contrib.Extensions;

namespace REC.Model
{
    [Table("Video")]
    public class Video : Base
    {
        public int IdChannel { get; set; }

        public string FileName { get; set; }

        public string FilePath { get; set; }
    }
}
