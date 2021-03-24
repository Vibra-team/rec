using Dapper.Contrib.Extensions;

namespace REC.Model
{
    [Table("User")]
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }

        [Computed]
        public string Name { get; set; }
    }
}
