namespace WebApp.API.Models
{
    public class Expense
    {
        public Guid id { get; set; }
        public string email { get; set; }
        public string name { get; set; }
        public int expenseType { get; set; }
        public decimal price { get; set; }
        public DateTime includedDate { get; set; }
        public DateTime expenseDate { get; set; }
    }
}
