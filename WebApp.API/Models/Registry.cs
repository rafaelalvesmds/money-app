namespace WebApp.API.Models
{
    public class Registry
    {
        public Guid id { get; set; }
        public Guid userId { get; set; }
        public string description { get; set; }
        public int type { get; set; }
        public int category { get; set; }
        public decimal price { get; set; }
        public DateTime includedDate { get; set; }
        public DateTime date { get; set; }
    }
}
