namespace WebApp.API.Models
{
    public class RegistryCategory
    {
        public enum RegistryCategoryEnum
        {
            Expense = 1,
            Income,
        }

        public int id { get; set; }
        public string name { get; set; }
    }
}
