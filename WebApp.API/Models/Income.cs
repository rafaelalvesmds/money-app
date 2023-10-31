namespace WebApp.API.Models
{
    public class Income
    {
        public Guid id { get; set; }
        public string email { get; set; }
        public string description { get; set; }
        public int incomeType { get; set; }
        public decimal price { get; set; }
        public DateTime includedDate { get; set; }
        public DateTime incomeDate { get; set; }
    }
}
