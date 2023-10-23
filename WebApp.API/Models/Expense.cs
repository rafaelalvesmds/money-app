namespace WebApp.API.Models
{
    public class Expense
    {
        public string email { get; set; }
        public string name { get; set; }
        public string expenseType { get; set; }
        public decimal price { get; set; }
        public int mounth { get; set; }
        public int year { get; set; }
    }
}
