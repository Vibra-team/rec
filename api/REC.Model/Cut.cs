using Dapper.Contrib.Extensions;

namespace REC.Model
{
    [Table("Cut")]
    public class Cut
    {
        public int IdClip { get; set; }

        public int IdVideo { get; set; }

        public float Start { get; set; }

        public float Finish { get; set; }

        public int Sequence { get; set; }
    }
}
