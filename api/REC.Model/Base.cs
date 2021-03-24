using Dapper.Contrib.Extensions;
using System;

namespace REC.Model
{
    public class Base
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
