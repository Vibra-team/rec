using System.Collections.Generic;

namespace REC.Model
{
    public class Page<T>
    {
        public IEnumerable<T> Result { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public int Total { get; set; }
    }
}
