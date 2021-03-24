using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REC.Model.Filters
{
    public class ClipFilter
    {
        public int? IdChannel { get; set; }

        public int? Status { get; set; }

        public DateTime? CreateAt { get; set; }

        public int? Psize { get; set; }

        public int? Pindex { get; set; }

    }
}
