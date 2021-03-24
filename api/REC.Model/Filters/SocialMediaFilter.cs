using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REC.Model.Filters
{
    public class SocialMediaFilter
    {
        public string Name { get; set; }

        public bool? Active { get; set; }

        public Enum.SocialMedia? SocialMedia { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? Psize { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? Pindex { get; set; }
    }
}
