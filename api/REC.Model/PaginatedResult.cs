namespace REC.Model
{
    public class PaginatedResult<T>
    {
        public int? next { get; set; }

        public int? prev { get; set; }

        public T Video { get; set; }

        public string Url { get; set; }
    }
}
