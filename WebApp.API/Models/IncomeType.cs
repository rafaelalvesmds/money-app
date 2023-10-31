namespace WebApp.API.Models
{
    public class IncomeType
    {
        public enum IncomeTypeEnum
        {
            Investment = 1,
            Gift,
            Salary,
            Others,
        }

        public int id { get; set; }
        public string name { get; set; }
    }

}