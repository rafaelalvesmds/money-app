namespace WebApp.API.Models
{
    public class Expense
    {
        public Guid id { get; set; }
        public string email { get; set; }
        public string name { get; set; }
        public int expenseType { get; set; }
        public decimal price { get; set; }
        public int mounth { get; set; }
        public int year { get; set; }
    }
}
